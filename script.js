
(function(){
  const root=document.getElementById('qyxera-home-redesign'); if(!root) return;
  root.querySelectorAll('.qh-sparks').forEach((field,idx)=>{
    const count=idx%2?22:18;
    for(let i=0;i<count;i++){
      const s=document.createElement('i');
      const r=(n)=>Math.random()*n;
      s.style.setProperty('--x',r(100).toFixed(2)+'%');s.style.setProperty('--y',r(100).toFixed(2)+'%');
      s.style.setProperty('--s',(1.2+r(1.9)).toFixed(1)+'px');s.style.setProperty('--o',(0.12+r(.28)).toFixed(2));
      s.style.setProperty('--d',(14+r(22)).toFixed(1)+'s');s.style.setProperty('--delay',(-r(25)).toFixed(1)+'s');
      s.style.setProperty('--dx',(-42+r(84)).toFixed(0)+'px');s.style.setProperty('--dy',(-38+r(76)).toFixed(0)+'px');field.appendChild(s);
    }
  });
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const update=()=>{
      root.querySelectorAll('.qh-disintegrate').forEach(sec=>{const rect=sec.getBoundingClientRect();sec.classList.toggle('qh-past',rect.bottom<window.innerHeight*.22);})
    }; update(); addEventListener('scroll',update,{passive:true});
  }
})();



(() => {
  const button = document.querySelector('.site-menu-btn');
  const menu = document.querySelector('.site-mobile-menu');
  if (!button || !menu) return;

  const setMenu = (open) => {
    button.classList.toggle('active', open);
    button.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  };

  button.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
})();

// QYXERA premium interaction layer
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.querySelector('.site-progress span');
  const nav = document.querySelector('.site-nav');
  const navLinks = [...document.querySelectorAll('.site-links a[href^="#"]')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  const updatePageState = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - innerHeight);
    if (progress) progress.style.transform = `scaleX(${Math.min(1, scrollY / max)})`;
    if (nav) nav.classList.toggle('scrolled', scrollY > 24);

    let active = null;
    sections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.top <= innerHeight * .36 && r.bottom > innerHeight * .36) active = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${active}`));
  };
  updatePageState();
  addEventListener('scroll', updatePageState, { passive: true });
  addEventListener('resize', updatePageState, { passive: true });

  const reveals = document.querySelectorAll('.qh-reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Connected journey: keep the list and visual map in sync.
  const system = document.querySelector('#system');
  const rows = [...document.querySelectorAll('#system .qh-flow-row[data-stage]')];
  const nodes = [...document.querySelectorAll('#system .qh-journey-node[data-node]')];
  let stageIndex = 0, stageTimer = null;
  const setStage = (key) => {
    rows.forEach(r => r.classList.toggle('is-active', r.dataset.stage === key));
    nodes.forEach(n => n.classList.toggle('is-active', n.dataset.node === key));
  };
  rows.forEach(r => {
    r.addEventListener('mouseenter', () => setStage(r.dataset.stage));
    r.addEventListener('focusin', () => setStage(r.dataset.stage));
  });
  const startJourney = () => {
    if (reduceMotion || stageTimer || !rows.length) return;
    setStage(rows[0].dataset.stage);
    stageTimer = setInterval(() => {
      stageIndex = (stageIndex + 1) % rows.length;
      setStage(rows[stageIndex].dataset.stage);
    }, 2200);
  };
  const stopJourney = () => { if (stageTimer) { clearInterval(stageTimer); stageTimer = null; } };
  if (system && 'IntersectionObserver' in window) {
    const sIO = new IntersectionObserver(([entry]) => entry.isIntersecting ? startJourney() : stopJourney(), { threshold: .18 });
    sIO.observe(system);
  } else startJourney();

  // Process rail responds to the step closest to the viewport center.
  const process = document.querySelector('#how-we-work');
  const steps = [...document.querySelectorAll('#how-we-work .qh-step')];
  const dots = [...document.querySelectorAll('.qh-process-track i')];
  const processProgress = document.querySelector('.qh-process-progress');
  const updateProcess = () => {
    if (!process || !steps.length) return;
    const center = innerHeight * .52;
    let best = 0, dist = Infinity;
    steps.forEach((step, i) => {
      const r = step.getBoundingClientRect();
      const d = Math.abs((r.top + r.bottom) / 2 - center);
      if (d < dist) { dist = d; best = i; }
    });
    steps.forEach((s,i) => s.classList.toggle('is-active', i === best));
    dots.forEach((d,i) => d.classList.toggle('active', i <= best));
    if (processProgress) processProgress.style.width = `${best / Math.max(1, steps.length - 1) * 100}%`;
  };
  updateProcess();
  addEventListener('scroll', updateProcess, { passive: true });

  // Very subtle pointer depth on the three signature cards.
  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.qh-system-card,.qh-journey-canvas,.qh-cta-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(1100px) rotateX(${(-y*1.4).toFixed(2)}deg) rotateY(${(x*1.8).toFixed(2)}deg)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });
  }
})();


// Multi-page navigation and real contact-form submission.
(() => {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.site-links a,.site-mobile-menu a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('?')[0].toLowerCase();
    a.classList.toggle('active', href === path);
  });

  const form = document.getElementById('contact-form');
  if (!form) return;

  const params = new URLSearchParams(location.search);
  const plan = params.get('plan');
  if (plan) {
    const message = form.querySelector('[name="message"]');
    if (message) message.value = `I'm interested in the ${plan} package. `;
  }

  const submitButton = form.querySelector('.contact-submit');
  const submitLabel = form.querySelector('.contact-submit-label');
  const status = document.getElementById('form-status');
  const originalLabel = submitLabel ? submitLabel.textContent : 'Send Inquiry';

  const setStatus = (type, message) => {
    if (!status) return;
    status.className = `form-status ${type ? `is-${type}` : ''}`.trim();
    status.textContent = message || '';
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (data.get('_honey')) return;

    const payload = {
      name: data.get('name') || '',
      email: data.get('email') || '',
      service: data.get('service') || '',
      message: data.get('message') || '',
      _subject: `QYXERA Inquiry — ${data.get('service') || 'Project'}`,
      _template: 'table',
      _url: location.href
    };

    if (submitButton) submitButton.disabled = true;
    if (submitLabel) submitLabel.textContent = 'Sending...';
    form.classList.add('is-sending');
    setStatus('', '');

    try {
      const response = await fetch('https://formsubmit.co/ajax/waynekenbandong@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      let result = {};
      try { result = await response.json(); } catch (_) {}
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Unable to submit inquiry.');
      }

      form.reset();
      setStatus('success', 'Thank you! Your inquiry has been sent to QYXERA. We’ll get back to you as soon as possible.');
      if (submitLabel) submitLabel.textContent = 'Inquiry Sent';
      if (submitButton) submitButton.classList.add('is-success');

      window.setTimeout(() => {
        if (submitLabel) submitLabel.textContent = originalLabel;
        if (submitButton) submitButton.classList.remove('is-success');
      }, 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error', 'We couldn’t send your inquiry right now. Please try again, or use the email link on the left.');
      if (submitLabel) submitLabel.textContent = 'Try Again';
    } finally {
      form.classList.remove('is-sending');
      if (submitButton) submitButton.disabled = false;
    }
  });
})();


// QYXERA v12 navigation polish: lightweight same-site page transitions.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.site-mobile-menu a').forEach(a => {
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const href = (a.getAttribute('href') || '').split('?')[0].toLowerCase();
    a.classList.toggle('active', href === current);
    if (href === current) a.setAttribute('aria-current','page');
  });
  if (reduceMotion) return;
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    let url;
    try { url = new URL(href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin || url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(() => { location.href = url.href; }, 135);
  });
})();
