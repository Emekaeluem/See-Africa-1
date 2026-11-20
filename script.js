
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader ---------- */
  // Gate this on a short fixed timer, not window.load — window.load would wait for
  // every video on the page (hero + explore + up to 10 country-carousel videos),
  // which is slow on mobile networks and made the loading screen drag on.
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('done'), 650);
  }

  /* ---------- Lenis smooth scroll ---------- */
  let lenis;
  if (window.Lenis && !reduceMotion) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', () => window.ScrollTrigger && ScrollTrigger.update());
  }

  /* ---------- Lucide icons ---------- */
  if (window.lucide) lucide.createIcons();

  /* ---------- Country Cards carousel ---------- */
  const COUNTRY_VIDEO_BASE = 'https://raw.githubusercontent.com/Emekaeluem/See-Africa-1/main/images/';
  const COUNTRIES = [
    { flag:'🇷🇼', name:`Rwanda`, tagline:`Land of a Thousand Hills`, highlight:`Volcanoes National Park`, quote:`Where the mist never fully lifts — and neither does the memory.`, desc:`Trek through cloud forest to meet mountain gorillas face to face. Rwanda doesn't just show you nature — it stays with you.`, cta:`Explore Rwanda`, video:`rwanda.mp4` },
    { flag:'🇰🇪', name:`Kenya`, tagline:`Where the Earth Still Breathes`, highlight:`Maasai Mara National Reserve`, quote:`Two million wildebeest cannot be wrong.`, desc:`The Great Migration thundering across golden grass. A Maasai warrior still against the wind. This is the Africa you always imagined — only louder.`, cta:`Explore Kenya`, video:`kenya.mp4` },
    { flag:'🇹🇿', name:`Tanzania`, tagline:`Where Giants Roam and Islands Dream`, highlight:`Serengeti National Park & Zanzibar Archipelago`, quote:`From the roof of Africa to the edge of the Indian Ocean — all in one breath.`, desc:`Stand on the Ngorongoro crater rim. Watch elephants move like slow thunder across the Serengeti. Then lose yourself in Stone Town's spice-scented streets on Zanzibar. Africa, complete.`, cta:`Explore Tanzania`, video:`zanzibar.mp4` },
    { flag:'🇳🇬', name:`Nigeria`, tagline:`The Heartbeat of Africa`, highlight:`Calabar Carnival & Lagos Waterfront`, quote:`The loudest silence in Africa is the moment before Lagos speaks.`, desc:`Two hundred million stories, one irresistible energy. From the thunder of Calabar Carnival — Africa's largest street party — to Lagos on New Year's Eve, Nigeria doesn't just celebrate. It erupts.`, cta:`Explore Nigeria`, video:`nigeria.mp4` },
    { flag:'🇬🇭', name:`Ghana`, tagline:`The Gateway of the Ancestors`, highlight:`Cape Coast Castle & Kakum National Park`, quote:`Some journeys are not about where you're going. They're about where you came from.`, desc:`Walk the shores where history turned, inside Cape Coast Castle. Then climb 30 metres above the forest floor on Kakum's canopy walk — and remember: you're still here. That's extraordinary.`, cta:`Explore Ghana`, video:`ghana.mp4` },
    { flag:'🇿🇦', name:`South Africa`, tagline:`The Rainbow at the Edge of the World`, highlight:`Cape Town & Kruger National Park`, quote:`Two oceans meet here. So do two worlds.`, desc:`Table Mountain rising through cloud. Penguins on Boulders Beach. The Big Five at dusk in Kruger. Golden, unhurried winelands in Stellenbosch. South Africa isn't one thing — it's everything, compressed.`, cta:`Explore South Africa`, video:null },
    { flag:'🇿🇲', name:`Zambia`, tagline:`The Real Africa, Unfiltered`, highlight:`Victoria Falls (Mosi-oa-Tunya)`, quote:`The smoke that thunders. You will hear it before you see it.`, desc:`One of the seven natural wonders of the world — and on the Zambia side, you feel every bit of it. Walk the knife-edge bridge. Swim in Devil's Pool. Let the spray drench you.`, cta:`Explore Zambia`, video:`zambia.mp4` },
    { flag:'🇬🇲', name:`The Gambia`, tagline:`Africa in Miniature`, highlight:`Kachikally Crocodile Pool & River Gambia National Park`, quote:`Small country. Infinite soul.`, desc:`The Gambia River cuts through lush forest like a silver thread. Chimpanzees, sacred crocodile pools, birdlife to rival any continent — and a warmth that'll make you question everything you thought you were chasing.`, cta:`Explore The Gambia`, video:`gambia.mp4` },
    { flag:'🇨🇲', name:`Cameroon`, tagline:`Africa in One Country`, highlight:`Mount Cameroon & Waza National Park`, quote:`They say Cameroon is Africa in miniature. They are not wrong.`, desc:`An active volcano you can climb. Rainforest gorillas. Sahel in the north, Atlantic coast in the south. Desert, forest, mountain, ocean — all inside one border.`, cta:`Explore Cameroon`, video:`cameroon.mp4` },
    { flag:'🇧🇼', name:`Botswana`, tagline:`Silence Is a Luxury Here`, highlight:`Okavango Delta & Chobe National Park`, quote:`The world's largest inland delta. And almost no one there.`, desc:`The Okavango Delta floods every year — an ancient miracle that turns desert into waterway, waterway into paradise. Mokoro canoes. Elephant crossings. Lions at dusk. True, uninterrupted wilderness.`, cta:`Explore Botswana`, video:`botswana.mp4` }
  ];

  const renderCountrySlide = (c, i) => `
    <div class="country-slide" data-index="${i}">
      <div class="country-slide-media">
        ${c.video ? `<video autoplay muted loop playsinline preload="metadata" aria-hidden="true"><source src="${COUNTRY_VIDEO_BASE}${c.video}" type="video/mp4" /></video>` : ''}
        <div class="country-slide-media-overlay"></div>
      </div>
      <div class="country-slide-content">
        <span class="country-slide-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h2 class="country-slide-name"><span class="country-slide-flag">${c.flag}</span>${c.name}</h2>
        <p class="country-slide-tagline">${c.tagline}</p>
        <p class="country-slide-highlight">Location Highlight: ${c.highlight}</p>
        <p class="country-slide-quote">"${c.quote}"</p>
        <p class="country-slide-desc">${c.desc}</p>
        <a href="#" class="country-slide-cta"><span>${c.cta}</span><i data-lucide="arrow-right"></i></a>
      </div>
    </div>
  `;

  const carousel = document.getElementById('countryCarousel');
  if (carousel) {
    const AUTOPLAY_MS = 6500;
    carousel.style.setProperty('--autoplay-ms', AUTOPLAY_MS + 'ms');

    carousel.insertAdjacentHTML('afterbegin', COUNTRIES.map(renderCountrySlide).join(''));

    const progressEl = document.getElementById('countryProgress');
    progressEl.innerHTML = COUNTRIES.map(() => `<div class="country-progress-seg"><div class="fill"></div></div>`).join('');

    if (window.lucide) lucide.createIcons();

    const slides = Array.from(carousel.querySelectorAll('.country-slide'));
    const segs = Array.from(progressEl.querySelectorAll('.country-progress-seg'));
    const prevBtn = carousel.querySelector('.country-arrow.prev');
    const nextBtn = carousel.querySelector('.country-arrow.next');
    const controlsBar = carousel.querySelector('.country-controls-bar');
    const total = slides.length;
    let current = 0;
    let timer = null;

    // On mobile the arrows/progress bar move into the active slide's content flow,
    // right after the CTA button, so they sit close to it instead of pinned far below.
    const isMobileControls = () => window.matchMedia('(max-width: 860px)').matches;
    const placeControlsBar = () => {
      const content = slides[current].querySelector('.country-slide-content');
      if (isMobileControls()) {
        if (controlsBar.parentElement !== content) content.appendChild(controlsBar);
      } else if (controlsBar.parentElement !== carousel) {
        carousel.appendChild(controlsBar);
      }
    };

    const animateSlideText = (slide) => {
      if (!window.gsap) return;
      const els = slide.querySelectorAll('.country-slide-flag, .country-slide-name, .country-slide-tagline, .country-slide-highlight, .country-slide-quote, .country-slide-desc, .country-slide-cta');
      gsap.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07, delay: 0.2 });
    };

    const goTo = (index) => {
      current = (index + total) % total;
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      segs.forEach((seg, i) => {
        seg.classList.toggle('done', i < current);
        seg.classList.toggle('active', i === current);
        // Restart the CSS fill animation cleanly on the newly active segment
        if (i === current) {
          const fill = seg.querySelector('.fill');
          fill.style.animation = 'none';
          void fill.offsetWidth;
          fill.style.animation = '';
        }
      });
      placeControlsBar();
      animateSlideText(slides[current]);
    };

    const startAutoplay = () => {
      if (reduceMotion) return;
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
    };
    const restartAutoplay = () => { startAutoplay(); };

    prevBtn.addEventListener('click', () => { goTo(current - 1); restartAutoplay(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); restartAutoplay(); });
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', () => startAutoplay());
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(placeControlsBar, 150);
    });

    goTo(0);
    startAutoplay();
  }

  /* ---------- Experiences panels ---------- */
  const EXPERIENCE_IMG_BASE = 'https://raw.githubusercontent.com/Emekaeluem/See-Africa-1/main/images/';
  const EXPERIENCES = [
    { icon:'binoculars', name:`Safari`, image:`safari.jpeg`, quote:`Before you see the lion, you feel it.`, desc:`Private game drives. Fly-in camps. Luxury lodges where the bush begins at your bedroom door. Our safari experiences are not packaged — they are curated for people who have seen enough of ordinary.` },
    { icon:'landmark', name:`Culture`, image:`culture.jpeg`, quote:`A continent that has never stopped dancing.`, desc:`Traditional ceremonies. Living museums. Markets that have been running for centuries. We take you behind the postcard — into the homes, the kitchens, the festivals, the stories that never make the brochure.` },
    { icon:'briefcase', name:`Business`, image:`business.jpeg`, quote:`The next great economy is not rising. It is already here.`, desc:`Africa is not the future. Africa is the present — for those with the vision to see it. Our business experiences connect you with founders, investors, innovators, and institutions across the continent's fastest-growing economies.` },
    { icon:'utensils', name:`Cuisine`, image:`cusine.jpeg`, quote:`Every dish is a geography lesson.`, desc:`Injera in Addis. Jollof in Lagos. Nyama choma in Nairobi. Bobotie in Cape Town. African cuisine is a continent-wide conversation about soil, history, memory, and love. We set the table. You bring the appetite.` },
    { icon:'mountain', name:`Adventure`, image:`adventure.jpeg`, quote:`The summit of Kilimanjaro is 5,895 metres above sea level. The view is worth every step.`, desc:`Gorilla trekking. White-water rafting on the Zambezi. Camel trails through the Sahara. Skydiving over the Namib. African adventure is not thrill-seeking — it is the deliberate choice to feel fully, utterly alive.` }
  ];

  const panelsWrap = document.getElementById('experiencePanels');
  let expandFirstExperiencePanel = () => {};
  let experiencePanelsReady = false;
  if (panelsWrap) {
    panelsWrap.innerHTML = EXPERIENCES.map((e) => `
      <div class="experience-panel" tabindex="0" role="button" aria-expanded="false" aria-label="${e.name}">
        <div class="experience-panel-media">
          <img src="${EXPERIENCE_IMG_BASE}${e.image}" alt="${e.name}" loading="lazy" />
        </div>
        <div class="experience-panel-overlay"></div>
        <div class="experience-collapsed-label">
          <i class="experience-icon" data-lucide="${e.icon}"></i>
          <span class="experience-name-vertical">${e.name}</span>
        </div>
        <div class="experience-expanded-content">
          <i class="experience-icon" data-lucide="${e.icon}"></i>
          <h3 class="experience-name">${e.name}</h3>
          <p class="experience-quote">"${e.quote}"</p>
          <p class="experience-desc">${e.desc}</p>
        </div>
      </div>
    `).join('');
    if (window.lucide) lucide.createIcons();

    const panels = Array.from(panelsWrap.querySelectorAll('.experience-panel'));
    const expandPanel = (panel) => {
      panels.forEach((p) => {
        const isActive = p === panel;
        p.classList.toggle('expanded', isActive);
        p.setAttribute('aria-expanded', String(isActive));
      });
    };
    panels.forEach((panel) => {
      panel.addEventListener('click', () => expandPanel(panel));
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); expandPanel(panel); }
      });
    });
    // Only bind hover-expand on devices that actually have a mouse — avoids fighting tap on touchscreens
    if (window.matchMedia('(hover: hover)').matches) {
      panels.forEach((panel) => panel.addEventListener('mouseenter', () => expandPanel(panel)));
    }
    // Panels start closed (all equal). The first one opens later, once the section is
    // scrolled into view, so the open itself animates and shows people how it works.
    expandFirstExperiencePanel = () => expandPanel(panels[0]);
    experiencePanelsReady = true;
  }

  /* ---------- Voices From the Journey ---------- */
  const VOICE_IMG_BASE = 'https://raw.githubusercontent.com/Emekaeluem/See-Africa-1/main/images/';
  const VOICES = [
    { image:`david.jpeg`, quote:`I came to invest. I stayed because I felt something I had not felt in years.`, attribution:`David O., CEO, London`, text:`David arrived in Kigali for three days of meetings. He extended his stay to three weeks. He is now building a boutique hotel on the shores of Lake Kivu.` },
    { image:`amara.jpeg`, quote:`The gorilla looked at me. Just looked. And something in me was never the same.`, attribution:`Amara J., Creative Director, New York`, text:`Amara booked the December Expedition on impulse. She returned six months later — this time with her daughter.` },
    { image:`kofi.jpeg`, quote:`I thought I was going to see Africa. I did not expect Africa to see me.`, attribution:`Dr. Kofi A., Physician, Toronto`, text:`Three countries. Twelve days. One decision: to bring his entire family the following year.` }
  ];

  const voiceStoriesWrap = document.getElementById('voiceStories');
  if (voiceStoriesWrap) {
    voiceStoriesWrap.innerHTML = VOICES.map((v, i) => `
      <div class="voice-story${i % 2 === 1 ? ' reverse' : ''}">
        <div class="voice-portrait">
          <img src="${VOICE_IMG_BASE}${v.image}" alt="${v.attribution}" loading="lazy" />
        </div>
        <div class="voice-content">
          <span class="voice-quote-mark" aria-hidden="true">&ldquo;</span>
          <p class="voice-label">Featured Story #${i + 1}</p>
          <p class="voice-quote">"${v.quote}"</p>
          <p class="voice-attribution">— ${v.attribution}</p>
          <p class="voice-text">${v.text}</p>
        </div>
      </div>
    `).join('');
  }

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    const setOpen = (open) => {
      navLinks.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    };
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => setOpen(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  }

  /* ---------- GSAP hero entrance ---------- */
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ delay: reduceMotion ? 0 : 1.5, defaults: { ease: 'power3.out' } });

    tl.fromTo('.headline .line-inner', { y: '110%' }, { y: '0%', duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0)
      .to('.hero-actions', { opacity: 1, duration: 0.8 }, 0.6)
      .from('.hero-actions', { y: 16, duration: 0.8 }, 0.6)
      .to('.scroll-cue', { opacity: 1, duration: 0.8 }, 0.9);

    /* Subtle parallax + fade on scroll out of hero */
    gsap.to('.hero-video', {
      scale: 1.16,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.hero-content, .scroll-cue', {
      yPercent: -12,
      opacity: 0.2,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    /* About section — glass card reveal */
    gsap.set('.about-content .about-eyebrow, .about-content .about-heading, .about-content .about-quote, .about-content .about-body p, .about-content .about-punch', { opacity: 0, y: 22 });

    gsap.timeline({
      scrollTrigger: { trigger: '.about-section', start: 'top 75%', toggleActions: 'play none none none' }
    })
    .to('.about-card', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0)
    .fromTo('.about-card', { y: 50 }, { y: 0, duration: 1, ease: 'power3.out' }, 0)
    .to('.about-media img', { scale: 1, duration: 1.5, ease: 'power3.out' }, 0)
    .to('.about-eyebrow', { opacity: 1, y: 0, duration: 0.7 }, 0.15)
    .to('.about-heading', { opacity: 1, y: 0, duration: 0.8 }, 0.28)
    .to('.about-quote', { opacity: 1, y: 0, duration: 0.8 }, 0.42)
    .to('.about-body p', { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 }, 0.55)
    .to('.about-punch', { opacity: 1, y: 0, duration: 0.8 }, 0.8);

    /* Subtle ambient parallax on the image as the section scrolls by */
    gsap.to('.about-media img', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    /* Belief & Promise section reveal */
    gsap.set('.belief-eyebrow, .belief-heading, .belief-paragraph, .belief-actions', { opacity: 0, y: 24 });
    gsap.set('.belief-card', { opacity: 0, y: 40 });
    gsap.set('.belief-chip', { opacity: 0, y: 10 });

    gsap.timeline({
      scrollTrigger: { trigger: '.belief-section', start: 'top 70%', toggleActions: 'play none none none' }
    })
    .to('.belief-eyebrow, .belief-heading, .belief-paragraph, .belief-actions', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.14 }, 0)
    .to('.belief-card', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.2)
    .to('.belief-chip', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 0.7);

    /* Explore Africa section reveal */
    gsap.set('.explore-eyebrow, .explore-heading, .explore-quote, .explore-caption, .explore-section .cta-btn', { opacity: 0, y: 22 });
    gsap.set('.explore-visual', { opacity: 0, scale: 0.9 });
    gsap.set('.explore-ring', { opacity: 0 });

    gsap.timeline({
      scrollTrigger: { trigger: '.explore-section', start: 'top 70%', toggleActions: 'play none none none' }
    })
    .to('.explore-eyebrow, .explore-heading, .explore-quote', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 }, 0)
    .to('.explore-visual', { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, 0.3)
    .to('.explore-ring', { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.45)
    .to('.explore-caption', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.9)
    .to('.explore-section .cta-btn', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.05);

    /* Country Cards — controls bar reveal (slide text animates itself via goTo()) */
    gsap.set('.country-controls-bar', { opacity: 0, y: 16 });
    gsap.to('.country-controls-bar', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.country-section', start: 'top 70%', toggleActions: 'play none none none' }
    });

    /* Experiences reveal */
    gsap.set('.experiences-heading, .experiences-quote', { opacity: 0, y: 20 });
    gsap.set('.experience-panel', { opacity: 0, y: 30 });
    gsap.timeline({
      scrollTrigger: {
        trigger: '.experiences-section', start: 'top 75%', toggleActions: 'play none none none',
        onEnter: () => setTimeout(() => { if (experiencePanelsReady) expandFirstExperiencePanel(); }, 900)
      }
    })
    .to('.experiences-heading, .experiences-quote', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, 0)
    .to('.experience-panel', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, 0.2);

    /* Voices From the Journey reveal */
    gsap.set('.voices-heading, .voices-quote, .voices-subtext', { opacity: 0, y: 20 });
    gsap.to('.voices-heading, .voices-quote, .voices-subtext', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.voices-section', start: 'top 75%', toggleActions: 'play none none none' }
    });

    document.querySelectorAll('.voice-story').forEach((story) => {
      const img = story.querySelector('.voice-portrait img');
      const mark = story.querySelector('.voice-quote-mark');
      const texts = story.querySelectorAll('.voice-label, .voice-quote, .voice-attribution, .voice-text');
      gsap.set(img, { scale: 1.18 });
      gsap.set(mark, { opacity: 0 });
      gsap.set(texts, { opacity: 0, y: 22 });

      gsap.timeline({
        scrollTrigger: { trigger: story, start: 'top 78%', toggleActions: 'play none none none' }
      })
      .to(img, { scale: 1.1, duration: 1.3, ease: 'power3.out' }, 0)
      .to(mark, { opacity: 1, duration: 1, ease: 'power2.out' }, 0.1)
      .to(texts, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 0.15);

      gsap.to(img, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: story, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    gsap.set('.voices-cta p, .voices-cta-actions', { opacity: 0, y: 20 });
    gsap.to('.voices-cta p, .voices-cta-actions', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.voices-cta', start: 'top 85%', toggleActions: 'play none none none' }
    });

    /* Footer reveal */
    gsap.set('.footer-invite, .footer-col, .footer-bottom', { opacity: 0, y: 16 });
    gsap.to('.footer-invite, .footer-col, .footer-bottom', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: '.site-footer', start: 'top 90%', toggleActions: 'play none none none' }
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (window.gsap && !reduceMotion) {
    document.querySelectorAll('.cta-btn').forEach((ctaBtn) => {
      ctaBtn.addEventListener('mousemove', (e) => {
        const r = ctaBtn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(ctaBtn, { x: x * 0.3, y: y * 0.5, duration: 0.4, ease: 'power3.out' });
      });
      ctaBtn.addEventListener('mouseleave', () => {
        gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

});
