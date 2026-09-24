
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
      const response = await fetch('https://formsubmit.co/ajax/markchristiandiaz3@gmail.com', {
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


// QYXERA Teams — clickable member profile modal.
(() => {
  const teamPage = document.getElementById('qyxera-team-page');
  const modal = document.getElementById('team-profile-modal');
  if (!teamPage || !modal) return;

  const dialog = modal.querySelector('.team-profile-dialog');
  const modalImage = document.getElementById('team-profile-modal-image');
  const modalRole = document.getElementById('team-profile-modal-role');
  const modalName = document.getElementById('team-profile-modal-name');
  const modalDescription = document.getElementById('team-profile-modal-description');
  const closeButton = modal.querySelector('.team-profile-close');
  const cards = [...teamPage.querySelectorAll('.role-profile-card, .role-team-card')];

  let lastFocused = null;

  const getCardData = (card) => {
    const img = card.querySelector('.role-profile-photo img, .role-team-photo img');
    const copy = card.querySelector('.role-profile-copy, .role-team-copy');
    const role = copy?.querySelector(':scope > span')?.textContent?.trim() || '';
    const name = copy?.querySelector('h3')?.textContent?.trim() || img?.alt || 'QYXERA Team Member';
    const description = copy?.querySelector('p')?.textContent?.trim() || '';

    return {
      image: img?.getAttribute('src') || '',
      alt: img?.getAttribute('alt') || name,
      role,
      name,
      description
    };
  };

  const openModal = (card) => {
    const data = getCardData(card);
    lastFocused = document.activeElement;

    modalImage.src = data.image;
    modalImage.alt = data.alt;
    modalRole.textContent = data.role;
    modalRole.hidden = !data.role;
    modalName.textContent = data.name;
    modalDescription.textContent = data.description;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('team-modal-open');

    requestAnimationFrame(() => closeButton?.focus());
  };

  const closeModal = () => {
    if (!modal.classList.contains('is-open')) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('team-modal-open');

    window.setTimeout(() => {
      modalImage.src = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }, 260);
  };

  cards.forEach(card => {
    card.classList.add('team-click-profile');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-haspopup', 'dialog');

    const name = card.querySelector('h3')?.textContent?.trim() || 'team member';
    card.setAttribute('aria-label', `View profile for ${name}`);

    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  modal.querySelectorAll('[data-team-modal-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();

    if (event.key === 'Tab' && modal.classList.contains('is-open')) {
      const focusable = [...dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .filter(el => !el.hasAttribute('disabled'));

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
// QYXERA v25 — Floating consultation CTA.
// Injected by JavaScript so it automatically appears on every page
// that uses the shared script.js. It stays hidden on the Contact page.
(() => {
  const normalizePage = value => {
    let page = (value || '')
      .split('?')[0]
      .split('#')[0]
      .split('/')
      .pop()
      .toLowerCase()
      .replace(/\.html$/, '');
    return page || 'index';
  };

  if (normalizePage(location.pathname) === 'contact') return;
  if (document.querySelector('.floating-consult-cta')) return;

  const cta = document.createElement('aside');
  cta.className = 'floating-consult-cta';
  cta.setAttribute('aria-label', 'Free consultation');
  cta.innerHTML = `
    <a class="floating-consult-main" href="contact.html">
      <span class="floating-consult-dot" aria-hidden="true"></span>
      <span class="floating-consult-copy">
        <small>Need help choosing?</small>
        <strong>Book a free consultation</strong>
      </span>
      <span class="floating-consult-arrow" aria-hidden="true">↗</span>
    </a>
    <button class="floating-consult-close" type="button" aria-label="Hide consultation button">×</button>
  `;

  document.body.appendChild(cta);

  const close = cta.querySelector('.floating-consult-close');
  const dismissedKey = 'qyxera-consult-cta-dismissed';

  try {
    if (sessionStorage.getItem(dismissedKey) === '1') {
      cta.remove();
      return;
    }
  } catch (_) {}

  let visible = false;

  const update = () => {
    if (!document.body.contains(cta)) return;

    const shouldShow =
      window.scrollY > Math.min(520, window.innerHeight * 0.55);

    if (shouldShow !== visible) {
      visible = shouldShow;
      cta.classList.toggle('is-visible', visible);
    }
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });

  close?.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    cta.classList.remove('is-visible');
    cta.classList.add('is-dismissed');

    try {
      sessionStorage.setItem(dismissedKey, '1');
    } catch (_) {}

    window.setTimeout(() => cta.remove(), 280);
  });
})();
// QYXERA v30 — Smooth Work process scroll lock.
// Uses virtual scroll progress instead of hard one-step wheel jumps.
// The page stays fixed while the progress moves continuously through
// Discover → Strategize → Create → Execute → Optimize → Grow.
(() => {
  const normalizePage = value => {
    let page = (value || '')
      .split('?')[0]
      .split('#')[0]
      .split('/')
      .pop()
      .toLowerCase()
      .replace(/\.html$/, '');

    return page || 'index';
  };

  if (normalizePage(location.pathname) !== 'work') return;

  const process = document.querySelector('#how-we-work');
  if (!process) return;

  const rail = process.querySelector('.qh-process-rail');
  const stepsHost = process.querySelector('.qh-steps');
  if (!rail || !stepsHost) return;

  process.classList.add(
    'qh-process-timeline-v26',
    'qh-process-hard-lock-v28',
    'qh-process-smooth-v30'
  );

  const stages = [
    {
      title: 'Discover',
      eyebrow: 'UNDERSTAND',
      text: 'We learn your goals, audience, offer, challenges, customer journey, and current digital presence.'
    },
    {
      title: 'Strategize',
      eyebrow: 'MAP THE PATH',
      text: 'We turn what we learn into a focused strategy, clear priorities, channel mix, and connected customer journey.'
    },
    {
      title: 'Create',
      eyebrow: 'BUILD THE ASSETS',
      text: 'We develop the content, campaigns, pages, creative assets, and systems needed to bring the strategy to life.'
    },
    {
      title: 'Execute',
      eyebrow: 'GO LIVE',
      text: 'We launch and connect the moving parts across marketing, websites, CRM, automation, and ongoing execution.'
    },
    {
      title: 'Optimize',
      eyebrow: 'LEARN + IMPROVE',
      text: 'We review real behavior and performance, identify friction, and improve the parts that can work harder.'
    },
    {
      title: 'Grow',
      eyebrow: 'SCALE WHAT WORKS',
      text: 'We strengthen the winning parts of the system, expand opportunities, and keep improving as the business grows.'
    }
  ];

  rail.innerHTML = `
    <div class="qh-process-live" aria-live="polite">
      <span>SCROLL TO ADVANCE</span>
      <strong><b class="qh-process-live-current">01</b> / 06</strong>
    </div>

    <div class="qh-process-track">
      <span class="qh-process-progress"></span>
      ${stages.map((_, i) => `<i data-step="${i}"></i>`).join('')}
    </div>

    <div class="qh-process-labels">
      ${stages.map(stage => `<span>${stage.title}</span>`).join('')}
    </div>
  `;

  stepsHost.innerHTML = stages.map((stage, i) => `
    <article class="qh-step qh-process-timeline-step" data-process-step="${i}">
      <span class="qh-process-step-number">${String(i + 1).padStart(2, '0')}</span>

      <div class="qh-process-step-title">
        <small>${stage.eyebrow}</small>
        <h3>${stage.title}</h3>
      </div>

      <p>${stage.text}</p>
      <i aria-hidden="true">↗</i>
    </article>
  `).join('');

  const steps = [...stepsHost.querySelectorAll('.qh-process-timeline-step')];
  const dots = [...rail.querySelectorAll('.qh-process-track i')];
  const progressBar = rail.querySelector('.qh-process-progress');
  const liveCurrent = rail.querySelector('.qh-process-live-current');

  const desktop = matchMedia('(min-width:981px) and (pointer:fine)');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MAX_PROGRESS = stages.length - 1;
  const LOCK_TOP = 104;

  // Lower = slower/more deliberate timeline.
  // 100px of wheel delta moves roughly 0.42 of a stage.
  const SCROLL_SENSITIVITY = 0.0042;

  // Extra scroll required after 01/06 before the page releases.
  const EXIT_THRESHOLD = 115;

  let virtualProgress = 0;
  let activeIndex = 0;
  let locked = false;
  let snapping = false;
  let exiting = false;
  let lockY = 0;
  let exitAccumulator = 0;
  let passageState = 'before';
  let renderFrame = 0;

  const easeInOutCubic = t =>
    t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const normalizeWheelDelta = event => {
    let delta = event.deltaY;

    if (event.deltaMode === 1) delta *= 16;
    if (event.deltaMode === 2) delta *= window.innerHeight;

    // Prevent huge device-specific spikes.
    return Math.max(-140, Math.min(140, delta));
  };

  const animateWindowTo = (targetY, duration = 280) => {
    const startY = window.scrollY;
    const distance = targetY - startY;

    if (Math.abs(distance) < 1 || reduceMotion) {
      window.scrollTo(0, targetY);
      return Promise.resolve();
    }

    return new Promise(resolve => {
      const start = performance.now();

      const tick = now => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / duration);
        const eased = easeInOutCubic(t);

        window.scrollTo(0, startY + distance * eased);

        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(tick);
    });
  };

  const render = () => {
    renderFrame = 0;

    const normalized = Math.max(
      0,
      Math.min(1, virtualProgress / MAX_PROGRESS)
    );

    const nextIndex = Math.max(
      0,
      Math.min(MAX_PROGRESS, Math.round(virtualProgress))
    );

    activeIndex = nextIndex;

    if (progressBar) {
      progressBar.style.transform = `scaleX(${normalized})`;
    }

    steps.forEach((step, i) => {
      step.classList.toggle('is-active', i === activeIndex);
      step.classList.toggle('is-past', i < activeIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i <= activeIndex);
      dot.classList.toggle('current', i === activeIndex);
    });

    if (liveCurrent) {
      liveCurrent.textContent =
        String(activeIndex + 1).padStart(2, '0');
    }
  };

  const requestRender = () => {
    if (renderFrame) return;
    renderFrame = requestAnimationFrame(render);
  };

  const setProgress = value => {
    virtualProgress = Math.max(
      0,
      Math.min(MAX_PROGRESS, value)
    );

    requestRender();
  };

  const updatePassageStateFromPosition = () => {
    if (locked || snapping || exiting) return;

    const rect = process.getBoundingClientRect();

    if (rect.bottom < 80) {
      passageState = 'after';
      return;
    }

    if (rect.top > window.innerHeight - 80) {
      passageState = 'before';
    }
  };

  const calculateLockY = () => {
    const railRect = rail.getBoundingClientRect();

    return Math.max(
      0,
      window.scrollY + railRect.top - LOCK_TOP
    );
  };

  const enterLock = async fromBottom => {
    if (
      locked ||
      snapping ||
      exiting ||
      !desktop.matches ||
      reduceMotion
    ) return;

    snapping = true;
    locked = true;
    passageState = 'inside';
    exitAccumulator = 0;

    setProgress(fromBottom ? MAX_PROGRESS : 0);

    process.classList.add('is-wheel-locked');
    document.body.classList.add('qh-process-wheel-locked');

    lockY = calculateLockY();

    await animateWindowTo(lockY, 300);

    snapping = false;
    lockY = window.scrollY;
  };

  const releaseLock = async direction => {
    if (!locked || exiting) return;

    locked = false;
    snapping = false;
    exiting = true;
    exitAccumulator = 0;

    passageState = direction > 0 ? 'after' : 'before';

    process.classList.remove('is-wheel-locked');
    document.body.classList.remove('qh-process-wheel-locked');

    // Give the release a small, controlled motion instead of a sudden jump.
    const nudge = Math.min(120, window.innerHeight * 0.14);
    const target = Math.max(
      0,
      window.scrollY + (direction > 0 ? nudge : -nudge)
    );

    await animateWindowTo(target, 260);

    exiting = false;
  };

  const shouldEnterFromTop = deltaY => {
    if (
      deltaY <= 0 ||
      locked ||
      snapping ||
      exiting ||
      !desktop.matches ||
      passageState !== 'before'
    ) return false;

    const railRect = rail.getBoundingClientRect();
    const processRect = process.getBoundingClientRect();

    return (
      railRect.top <= LOCK_TOP + 34 &&
      railRect.top >= -180 &&
      processRect.bottom > window.innerHeight * 0.55
    );
  };

  const shouldEnterFromBottom = deltaY => {
    if (
      deltaY >= 0 ||
      locked ||
      snapping ||
      exiting ||
      !desktop.matches ||
      passageState !== 'after'
    ) return false;

    const railRect = rail.getBoundingClientRect();
    const processRect = process.getBoundingClientRect();

    return (
      processRect.top < window.innerHeight * 0.40 &&
      processRect.bottom >= window.innerHeight - 40 &&
      railRect.top < LOCK_TOP
    );
  };

  const onWheel = event => {
    if (!desktop.matches || event.ctrlKey) return;

    const delta = normalizeWheelDelta(event);
    if (!delta) return;

    updatePassageStateFromPosition();

    if (!locked) {
      if (shouldEnterFromTop(delta)) {
        event.preventDefault();
        enterLock(false);
        return;
      }

      if (shouldEnterFromBottom(delta)) {
        event.preventDefault();
        enterLock(true);
        return;
      }

      return;
    }

    // While snapping into position, swallow wheel momentum so the page
    // doesn't fight against the snap animation.
    if (snapping) {
      event.preventDefault();
      return;
    }

    const direction = Math.sign(delta);

    // At the lower boundary, require a little more scroll before release.
    if (direction > 0 && virtualProgress >= MAX_PROGRESS) {
      event.preventDefault();
      exitAccumulator += Math.abs(delta);

      if (exitAccumulator >= EXIT_THRESHOLD) {
        releaseLock(1);
      }

      return;
    }

    // Same behavior in reverse at the upper boundary.
    if (direction < 0 && virtualProgress <= 0) {
      event.preventDefault();
      exitAccumulator += Math.abs(delta);

      if (exitAccumulator >= EXIT_THRESHOLD) {
        releaseLock(-1);
      }

      return;
    }

    event.preventDefault();
    exitAccumulator = 0;

    // Continuous virtual scrolling — no hard stage jumps.
    setProgress(
      virtualProgress + delta * SCROLL_SENSITIVITY
    );
  };

  const animateProgressTo = target => {
    const start = virtualProgress;
    const distance = target - start;
    const duration = 260;
    const begin = performance.now();

    const tick = now => {
      const t = Math.min(1, (now - begin) / duration);
      setProgress(start + distance * easeInOutCubic(t));

      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const onKeyDown = event => {
    if (!locked || snapping || exiting || !desktop.matches) return;

    const downKeys = ['ArrowDown', 'PageDown', ' ', 'Spacebar'];
    const upKeys = ['ArrowUp', 'PageUp'];

    if (downKeys.includes(event.key)) {
      event.preventDefault();

      if (activeIndex >= MAX_PROGRESS) {
        releaseLock(1);
      } else {
        animateProgressTo(
          Math.min(MAX_PROGRESS, activeIndex + 1)
        );
      }

      return;
    }

    if (upKeys.includes(event.key)) {
      event.preventDefault();

      if (activeIndex <= 0) {
        releaseLock(-1);
      } else {
        animateProgressTo(
          Math.max(0, activeIndex - 1)
        );
      }
    }
  };

  const onScroll = () => {
    updatePassageStateFromPosition();
  };

  setProgress(0);
  render();

  window.addEventListener('wheel', onWheel, {
    passive: false
  });

  document.addEventListener('keydown', onKeyDown);

  window.addEventListener('scroll', onScroll, {
    passive: true
  });

  const handleDesktopChange = () => {
    if (!desktop.matches && locked) {
      locked = false;
      snapping = false;
      exiting = false;

      process.classList.remove('is-wheel-locked');
      document.body.classList.remove('qh-process-wheel-locked');
    }
  };

  if (desktop.addEventListener) {
    desktop.addEventListener('change', handleDesktopChange);
  } else if (desktop.addListener) {
    desktop.addListener(handleDesktopChange);
  }
})();
