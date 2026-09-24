// QYXERA v33 — Light QYXERA Assistant chatbot.
// Replaces the old "Book a free consultation" floating CTA.
(() => {
  if (document.querySelector('.qyxera-chat')) return;

  const chat = document.createElement('aside');
  chat.className = 'qyxera-chat';
  chat.setAttribute('aria-label', 'QYXERA Assistant');
  chat.innerHTML = `
    <button class="qyxera-chat-launcher" type="button" aria-label="Open QYXERA Assistant" aria-expanded="false">
      <span class="qyxera-chat-launcher-logo" aria-hidden="true">
        <img src="assets/qyxera-logo.jpg" alt="">
      </span>
      <span class="qyxera-chat-launcher-copy">
        <small><i></i> WE'RE ONLINE</small>
        <strong>Chat with QYXERA</strong>
      </span>
      <span class="qyxera-chat-launcher-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    </button>

    <section class="qyxera-chat-panel" role="dialog" aria-modal="false" aria-label="Chat with QYXERA Assistant" aria-hidden="true">
      <header class="qyxera-chat-head">
        <div class="qyxera-chat-brand">
          <span class="qyxera-chat-avatar" aria-hidden="true"><img src="assets/qyxera-logo.jpg" alt=""></span>
          <span class="qyxera-chat-brand-copy">
            <strong>QYXERA Assistant</strong>
            <small><i></i> Online · Here to help</small>
          </span>
        </div>
        <button class="qyxera-chat-close" type="button" aria-label="Close chat">×</button>
      </header>

      <div class="qyxera-chat-body" aria-live="polite">
        <div class="qyxera-chat-message is-bot qyxera-chat-welcome">
          <span class="qyxera-chat-mini-avatar" aria-hidden="true"><img src="assets/qyxera-logo.jpg" alt=""></span>
          <div>
            <p><strong>Hi! 👋 I’m the QYXERA Assistant.</strong></p>
            <p><strong>How can I help you today?</strong></p>
            <p class="qyxera-chat-social-note">For more information or a faster response, you can also reach us on Facebook.</p>
          </div>
        </div>

        <div class="qyxera-chat-quick" aria-label="Quick questions">
          <button type="button" data-chat-topic="services"><span class="qyxera-quick-icon"><svg viewBox="0 0 24 24" fill="none"><path d="m12 3 7 4-7 4-7-4 7-4Z" stroke="currentColor" stroke-width="1.7"/><path d="m5 11 7 4 7-4M5 15l7 4 7-4" stroke="currentColor" stroke-width="1.7"/></svg></span><span>Our Services</span><b>›</b></button>
          <button type="button" data-chat-topic="pricing"><span class="qyxera-quick-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7.5 11.5 3H20v8.5L12.5 19 4 10.5v-3Z" stroke="currentColor" stroke-width="1.7"/><circle cx="16.5" cy="6.5" r="1.25" fill="currentColor"/></svg></span><span>Pricing</span><b>›</b></button>
          <button type="button" data-chat-topic="website"><span class="qyxera-quick-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="11" rx="1.8" stroke="currentColor" stroke-width="1.7"/><path d="M2.8 19h18.4M9 16v3m6-3v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span><span>Website Development</span><b>›</b></button>
          <button type="button" data-chat-topic="ai"><span class="qyxera-quick-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="12" r="3.1" stroke="currentColor" stroke-width="1.7"/></svg></span><span>AI Automation</span><b>›</b></button>
          <button type="button" data-chat-topic="consultation"><span class="qyxera-quick-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 3v5m8-5v5M4 10h16M8 14h3m2 0h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span><span>Book a Consultation</span><b>›</b></button>
          <button class="is-facebook" type="button" data-chat-topic="facebook"><span class="qyxera-quick-icon qyxera-facebook-icon">f</span><span>Visit our Facebook</span><b>›</b></button>
        </div>

        <div class="qyxera-facebook-card">
          <div class="qyxera-facebook-card-copy">
            <span class="qyxera-facebook-megaphone" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 13V9l12-5v14L4 13Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m7 13 1.5 6h3L10 14" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M18 8.5c1 .9 1.5 2.1 1.5 3.5S19 14.6 18 15.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span>
            <p>For a faster response, message QYXERA directly through our Facebook page.</p>
          </div>
          <a class="qyxera-facebook-main" href="https://www.facebook.com/qyxeramarketing" target="_blank" rel="noopener noreferrer"><span class="qyxera-facebook-round">f</span><strong>Visit our Facebook page</strong><span class="qyxera-facebook-external">↗</span></a>
        </div>
      </div>

      <form class="qyxera-chat-form">
        <span class="qyxera-chat-clip" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M9.5 12.5 15 7a3 3 0 0 1 4.2 4.2l-7.4 7.4a5 5 0 1 1-7.1-7.1L12 4.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span>
        <input type="text" autocomplete="off" placeholder="Type your message..." aria-label="Type your message" maxlength="240">
        <button type="submit" aria-label="Send message">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11.3 20 4l-7.3 16-2.1-6.4L4 11.3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m10.7 13.5 4.2-4.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </form>
      <div class="qyxera-chat-foot">Powered by QYXERA</div>
    </section>
  `;

  document.body.appendChild(chat);

  const launcher = chat.querySelector('.qyxera-chat-launcher');
  const panel = chat.querySelector('.qyxera-chat-panel');
  const close = chat.querySelector('.qyxera-chat-close');
  const body = chat.querySelector('.qyxera-chat-body');
  const form = chat.querySelector('.qyxera-chat-form');
  const input = form.querySelector('input');

  const openChat = () => {
    chat.classList.add('is-open');
    launcher.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => input.focus({ preventScroll: true }), 180);
  };

  const closeChat = () => {
    chat.classList.remove('is-open');
    launcher.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    launcher.focus({ preventScroll: true });
  };

  const addMessage = (html, type = 'bot') => {
    const row = document.createElement('div');
    row.className = `qyxera-chat-message is-${type}`;
    if (type === 'bot') {
      row.innerHTML = `<span class="qyxera-chat-mini-avatar" aria-hidden="true"><img src="assets/qyxera-logo.jpg" alt=""></span><div>${html}</div>`;
    } else {
      row.innerHTML = `<div>${html}</div>`;
    }
    body.appendChild(row);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  };

  const addTyping = () => {
    const row = document.createElement('div');
    row.className = 'qyxera-chat-message is-bot is-typing';
    row.innerHTML = `<span class="qyxera-chat-mini-avatar" aria-hidden="true"><img src="assets/qyxera-logo.jpg" alt=""></span><div><span></span><span></span><span></span></div>`;
    body.appendChild(row);
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
    return row;
  };

  const responses = {
    services: `<p>QYXERA helps businesses grow through <strong>marketing, branding, technology, and digital transformation.</strong></p><a class="qyxera-chat-action" href="services.html">Explore our services <span>↗</span></a>`,
    pricing: `<p>Our pricing depends on the scope and goals of your project. You can view our packages or tell us what you need and we’ll help point you in the right direction.</p><a class="qyxera-chat-action" href="pricing.html">View pricing <span>↗</span></a>`,
    website: `<p>We build modern, responsive websites focused on your brand, customer experience, and business goals.</p><a class="qyxera-chat-action" href="services.html">See website development <span>↗</span></a>`,
    ai: `<p>Our AI Automation service can help streamline repetitive workflows, customer interactions, and internal processes.</p><a class="qyxera-chat-action" href="services.html">Explore AI automation <span>↗</span></a>`,
    consultation: `<p>Absolutely. Tell us about your goals and the QYXERA team can discuss the best next step with you.</p><a class="qyxera-chat-action is-primary" href="contact.html">Book a free consultation <span>↗</span></a><a class="qyxera-chat-action is-facebook" href="https://www.facebook.com/qyxeramarketing" target="_blank" rel="noopener noreferrer">Message us on Facebook <span>↗</span></a>`,
    facebook: `<p>For more information or a faster response, visit the official <strong>QYXERA Marketing</strong> Facebook page and send us a message there.</p><a class="qyxera-chat-action is-facebook" href="https://www.facebook.com/qyxeramarketing" target="_blank" rel="noopener noreferrer">Visit our Facebook page <span>↗</span></a>`,
    contact: `<p>You can reach the QYXERA team through our Contact page, or message us on Facebook if that’s easier for you.</p><a class="qyxera-chat-action is-primary" href="contact.html">Contact QYXERA <span>↗</span></a><a class="qyxera-chat-action is-facebook" href="https://www.facebook.com/qyxeramarketing" target="_blank" rel="noopener noreferrer">Visit our Facebook page <span>↗</span></a>`,
    default: `<p>Thanks for your message. I can help with QYXERA services, pricing, website development, AI automation, or booking a consultation.</p><a class="qyxera-chat-action" href="contact.html">Talk to our team <span>↗</span></a><a class="qyxera-chat-action is-facebook" href="https://www.facebook.com/qyxeramarketing" target="_blank" rel="noopener noreferrer">Visit our Facebook page <span>↗</span></a>`
  };

  const respond = topic => {
    const typing = addTyping();
    window.setTimeout(() => {
      typing.remove();
      addMessage(responses[topic] || responses.default);
    }, 520);
  };

  const classify = text => {
    const t = text.toLowerCase();
    if (/price|pricing|cost|package|rate|how much/.test(t)) return 'pricing';
    if (/website|web dev|web development|site/.test(t)) return 'website';
    if (/ai|automation|automate|chatbot/.test(t)) return 'ai';
    if (/consult|book|meeting|appointment|quote/.test(t)) return 'consultation';
    if (/facebook|fb|messenger/.test(t)) return 'facebook';
    if (/contact|email|phone|talk|human|person/.test(t)) return 'contact';
    if (/service|marketing|branding|social|graphic|video|printing/.test(t)) return 'services';
    return 'default';
  };

  launcher.addEventListener('click', () => {
    if (chat.classList.contains('is-open')) closeChat();
    else openChat();
  });
  close.addEventListener('click', closeChat);

  chat.querySelectorAll('[data-chat-topic]').forEach(button => {
    button.addEventListener('click', () => {
      const topic = button.dataset.chatTopic;
      addMessage(`<p>${button.textContent.trim()}</p>`, 'user');
      respond(topic);
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addMessage(`<p>${value.replace(/[<>]/g, '')}</p>`, 'user');
    input.value = '';
    respond(classify(value));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && chat.classList.contains('is-open')) closeChat();
  });
})();
