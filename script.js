(() => {
  const WA = '917061899614';
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  // Sticky header state
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    io.observe(el);
  });

  // Counters
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, t0 = performance.now(), d = 1400;
      const tick = t => {
        const p = Math.min((t - t0) / d, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  // Active nav link
  const links = [...nav.querySelectorAll('a')];
  const sio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => sio.observe(s));

  // Service card spotlight
  document.querySelectorAll('.svc').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  // Tech tabs
  const TECH = {
    front: [['Re', 'React', 'Interactive, lightning-fast UIs'], ['Nx', 'Next.js', 'SEO-friendly React framework'], ['Tw', 'Tailwind CSS', 'Pixel-perfect responsive design'], ['JS', 'JavaScript / TS', 'Modern, type-safe code']],
    back: [['No', 'Node.js', 'Scalable APIs & real-time apps'], ['La', 'Laravel / PHP', 'Robust business applications'], ['Py', 'Python', 'Automation & data tools'], ['DB', 'MySQL / MongoDB', 'Secure structured data']],
    cms: [['WP', 'WordPress', 'Easy-to-manage business sites'], ['Sh', 'Shopify', 'Ready-to-sell online stores'], ['Wc', 'WooCommerce', 'Flexible e-commerce on WordPress'], ['Rz', 'Razorpay / UPI', 'Seamless Indian payments']],
    mobile: [['Fl', 'Flutter', 'Beautiful Android & iOS apps'], ['RN', 'React Native', 'One codebase, two platforms'], ['An', 'Android', 'Native performance & Play Store'], ['iO', 'iOS', 'App Store-ready experiences']],
    cloud: [['AW', 'AWS / Cloud', 'Fast, reliable hosting'], ['Fb', 'Firebase', 'Auth, database & notifications'], ['GA', 'Google Ads & Analytics', 'Track and grow every lead'], ['Me', 'Meta Ads', 'Instagram & Facebook campaigns']]
  };
  const grid = document.getElementById('techgrid');
  const render = key => {
    grid.innerHTML = TECH[key].map(([b, n, d], i) =>
      `<div class="tech" style="animation-delay:${i * 60}ms"><div class="tech__badge">${b}</div><strong>${n}</strong><span>${d}</span></div>`).join('');
  };
  document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => { x.classList.remove('is-active'); x.setAttribute('aria-selected', 'false'); });
    t.classList.add('is-active'); t.setAttribute('aria-selected', 'true');
    render(t.dataset.tab);
  }));
  render('front');

  // Enquiry form -> WhatsApp
  const form = document.getElementById('enquiry');
  const err = document.getElementById('formErr');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const name = (f.get('name') || '').trim();
    const phone = (f.get('phone') || '').replace(/\D/g, '');
    if (!name) { err.textContent = 'Please enter your name.'; form.elements.name.focus(); return; }
    if (phone.length < 10) { err.textContent = 'Please enter a valid 10-digit phone number.'; form.elements.phone.focus(); return; }
    err.textContent = '';
    const msg = `Hello HR Website Creator Agency,%0A%0A*New Enquiry*%0AName: ${encodeURIComponent(name)}%0APhone: ${phone}%0ABusiness/City: ${encodeURIComponent(f.get('biz') || '-')}%0AService: ${encodeURIComponent(f.get('service'))}%0AMessage: ${encodeURIComponent(f.get('msg') || '-')}`;
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank', 'noopener');
  });

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
