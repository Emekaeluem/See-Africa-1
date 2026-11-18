
/*
  SEE AFRICA × FIRSTBANK
  Calabar Carnival Website Upgrade

  Keeps existing:
  - Video hero
  - Hospitality section
  - Carnival section
  - Tickets and pricing
  - Booking functionality
  - Featured experience
  - Original pictures
*/

(() => {
  'use strict';

  const img = (name) => `images/${name}`;

  // Keep these filenames identical to the
  // optimized images uploaded to GitHub.
  const photoFiles = [
    'Calabar_Still161_optimized.webp',
    'Calabar_Still145_optimized.webp',
    'Calabar_Still135_optimized.webp',
    'Calabar_Still131_optimized.webp',
    'Calabar_Still129_optimized.webp',
    'Calabar_Still128_optimized.webp',
    'Calabar_Still125_optimized.webp',
    'Calabar_Still124_optimized.webp',
    'Calabar_Still123_optimized.webp',
    'Calabar_Still122_optimized.webp',
    'Calabar_Still121_optimized.webp',
    'Calabar_Still120_optimized.webp',
    'Calabar_Still118_optimized.webp'
  ];

  const photos = photoFiles.map(img);

  const header = document.querySelector('#siteHeader');
  const nav = header?.querySelector('.nav-container');
  const originalBrand = nav?.querySelector('.brand-logo');

  if (
    !nav ||
    !originalBrand ||
    document.querySelector('#carnival-story')
  ) return;

  // THREE OFFICIAL LOGOS

  const logos = document.createElement('div');
  logos.className = 'sponsor-logos';

  logos.setAttribute(
    'aria-label',
    'FirstBank sponsor, See Africa and Calabar Carnival logos'
  );

  logos.innerHTML = `
    <div class="sponsor-logo-unit">
      <img src="${img('firstbank.png')}" alt="FirstBank">
      <small>Official sponsor</small>
    </div>

    <span class="sponsor-logo-divider"
      aria-hidden="true"></span>

    <div class="sponsor-logo-unit">
      <img
        src="${img('seeafricalogo.png')}"
        alt="See Africa">
    </div>

    <span class="sponsor-logo-divider"
      aria-hidden="true"></span>

    <div class="sponsor-logo-unit">
      <img
        src="${img('calabarlogo.png')}"
        alt="Calabar Carnival">
    </div>
  `;

  originalBrand.insertAdjacentElement('afterend', logos);

  // FIRSTBANK SPONSOR RIBBON

  const ribbon = document.createElement('div');
  ribbon.className = 'cu-sponsor-ribbon';

  ribbon.innerHTML = `
    FIRSTBANK
    <span>
      — Official Sponsor of the Calabar Festival Experience
    </span>
  `;

  header.insertAdjacentElement('afterend', ribbon);

  // ADD STORY AND GALLERY NAVIGATION

  const navLinks = document.querySelector('#navLinks');

  if (navLinks) {
    const ticketLink = navLinks.querySelector(
      'a[href="#tickets"]'
    );

    const storyLink = document.createElement('a');

    storyLink.className = 'nav-link';
    storyLink.href = '#carnival-story';
    storyLink.textContent = 'Our Story';

    navLinks.insertBefore(storyLink, ticketLink);

    const galleryLink = document.createElement('a');

    galleryLink.className = 'nav-link';
    galleryLink.href = '#carnival-gallery';
    galleryLink.textContent = 'Gallery';

    navLinks.insertBefore(galleryLink, ticketLink);
  }

  // CREATE THE STORYTELLING EXPERIENCE

  const section = document.createElement('div');

  section.innerHTML = `

    <!-- INTRODUCTION -->

    <section
      class="cu-intro"
      id="carnival-story"
      aria-labelledby="cuStoryTitle">

      <div class="cu-wrap cu-intro-grid">

        <div>
          <div class="cu-eyebrow">
            A STORY WORTH EXPERIENCING
          </div>

          <h2 id="cuStoryTitle">
            The city becomes
            <em>the celebration.</em>
          </h2>

          <p class="cu-intro-lead">
            A burst of colour. A rhythm you can feel.
            A city coming together in a spectacular
            celebration of culture, creativity and
            connection.

            Discover Calabar through the moments
            that make its carnival unforgettable.
          </p>

          <a
            class="cu-link"
            href="#carnival-chapters">
            Step into the story →
          </a>
        </div>

        <figure class="cu-intro-photo">
          <img
            src="${photos[0]}"
            alt="Carnival performer in blue feathered costume"
            loading="lazy">

          <figcaption>
            THE SPIRIT OF CALABAR
          </figcaption>
        </figure>

      </div>
    </section>


    <!-- VISUAL STORY CHAPTERS -->

    <section
      class="cu-story"
      id="carnival-chapters"
      aria-label="Carnival visual story">

      <div class="cu-wrap">

        <div class="cu-story-heading">
          <div class="cu-eyebrow">
            THROUGH THE LENS
          </div>

          <h2>
            More than a festival.
            <br>
            A thousand stories.
          </h2>

          <p>
            Follow the parade from its first burst
            of colour to the roar of the crowd.
            Every image is a moment worth remembering.
          </p>
        </div>


        <!-- CHAPTER ONE -->

        <article class="cu-chapter">

          <div class="cu-photo-pair">
            <img
              src="${photos[4]}"
              alt="Carnival dancers in gold costumes"
              loading="lazy">

            <img
              src="${photos[5]}"
              alt="Performers in festive costumes"
              loading="lazy">
          </div>

          <div class="cu-chapter-copy">
            <span class="cu-chapter-index">
              CHAPTER 01 / THE CULTURE
            </span>

            <h3>
              Every costume tells a story.
            </h3>

            <p>
              Bold colours, intricate craftsmanship,
              expressive movement and traditions
              brought to life on the streets of Calabar.
            </p>

            <a
              class="cu-link"
              href="#carnival-gallery">
              Explore the moments →
            </a>
          </div>

        </article>


        <!-- CHAPTER TWO -->

        <article class="cu-chapter">

          <div class="cu-photo-pair">
            <img
              src="${photos[2]}"
              alt="Aerial view of the night parade"
              loading="lazy">

            <img
              src="${photos[3]}"
              alt="Festival crowd at night"
              loading="lazy">
          </div>

          <div class="cu-chapter-copy">

            <span class="cu-chapter-index">
              CHAPTER 02 / THE ENERGY
            </span>

            <h3>
              When the streets come alive.
            </h3>

            <p>
              From above the rooftops to the centre
              of the action, experience the movement,
              excitement and atmosphere of carnival night.
            </p>

            <a
              class="cu-link"
              href="#carnival-gallery">
              See the celebration →
            </a>

          </div>

        </article>


        <!-- CHAPTER THREE -->

        <article class="cu-chapter">

          <div class="cu-photo-pair">

            <img
              src="${photos[8]}"
              alt="Festival dancers performing"
              loading="lazy">

            <img
              src="${photos[10]}"
              alt="Dancers performing at the parade"
              loading="lazy">

          </div>

          <div class="cu-chapter-copy">

            <span class="cu-chapter-index">
              CHAPTER 03 / THE PEOPLE
            </span>

            <h3>
              The heartbeat is the people.
            </h3>

            <p>
              Smiles, dance, togetherness and
              the joyful exchange between performers
              and spectators are what make the
              experience memorable.
            </p>

            <a
              class="cu-link"
              href="#tickets">
              Be part of it →
            </a>

          </div>

        </article>

      </div>
    </section>


    <!-- FIRSTBANK OFFICIAL SPONSOR -->

    <section
      class="cu-sponsor"
      id="official-sponsor"
      aria-labelledby="cuSponsorTitle">

      <div class="cu-wrap cu-sponsor-grid">

        <div>

          <div class="cu-eyebrow">
            OUR OFFICIAL SPONSOR
          </div>

          <h2 id="cuSponsorTitle">
            FirstBank.
            <br>
            Part of the experience.
          </h2>

          <p>
            Celebrating the energy of Calabar
            and the culture that brings people together.

            FirstBank's presence is part of the
            carnival story, captured in the real
            moments of the celebration.
          </p>

          <a
            class="cu-solid-link"
            href="#carnival-gallery">
            View Festival Moments
          </a>

        </div>

        <figure class="cu-sponsor-image">

          <img
            src="${photos[1]}"
            alt="FirstBank sponsorship banner at the carnival"
            loading="lazy">

          <figcaption class="cu-sponsor-caption">
            FirstBank at the festival
          </figcaption>

        </figure>

      </div>

    </section>


    <!-- INTERACTIVE GALLERY -->

    <section
      class="cu-gallery"
      id="carnival-gallery"
      aria-labelledby="cuGalleryTitle">

      <div class="cu-wrap">

        <div class="cu-eyebrow">
          REAL MOMENTS · REAL MEMORIES
        </div>

        <div class="cu-gallery-head">

          <h2 id="cuGalleryTitle">
            The carnival, in pictures.
          </h2>

          <div class="cu-gallery-tools">

            <button
              type="button"
              data-gallery-move="-1"
              aria-label="Scroll gallery left">
              ←
            </button>

            <button
              type="button"
              data-gallery-move="1"
              aria-label="Scroll gallery right">
              →
            </button>

          </div>

        </div>

        <div
          class="cu-gallery-track"
          id="cuGalleryTrack"
          aria-label="Carnival photograph gallery">
        </div>

      </div>

    </section>


    <!-- FINAL CALL TO ACTION -->

    <section class="cu-cta">

      <h2>
        Your Calabar story starts here.
      </h2>

      <a href="#tickets">
        Explore Packages & Tickets →
      </a>

    </section>

  `;

  // ADD SECTIONS AFTER EXISTING VIDEO HERO

  const hero = document.querySelector('#home');

  if (hero) {
    hero.insertAdjacentElement('afterend', section);
  } else {
    document.querySelector('main')?.prepend(section);
  }

  // GALLERY PHOTO DESCRIPTIONS

  const titles = [
    'Blue carnival costumes',
    'FirstBank sponsorship',
    'A city in celebration',
    'Carnival from above',
    'Colourful performances',
    'Gold and culture',
    'Aerial performance',
    'Festival guests',
    'Festival parade',
    'Carnival crowd',
    'The parade at night',
    'FirstBank at the carnival',
    'Live carnival energy'
  ];

  const track = document.querySelector('#cuGalleryTrack');

  if (!track) return;

  // GENERATE THE 13 IMAGE CARDS

  photos.forEach((src, index) => {

    const button = document.createElement('button');
    button.className = 'cu-gallery-card';
    button.type = 'button';

    button.setAttribute(
      'aria-label',
      `View photograph ${index + 1}: ${titles[index]}`
    );

    const image = document.createElement('img');
    image.src = src;
    image.alt = titles[index];
    image.loading = 'lazy';

    const caption = document.createElement('span');

    caption.textContent =
      `${String(index + 1).padStart(2, '0')} / ${titles[index]}`;

    button.append(image, caption);

    button.addEventListener('click', () => {
      openLightbox(index);
    });

    track.append(button);

  });

  // GALLERY NAVIGATION BUTTONS

  document.querySelectorAll('[data-gallery-move]')
    .forEach(button => {

      button.addEventListener('click', () => {

        const direction = Number(
          button.dataset.galleryMove
        );

        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        track.scrollBy({
          left: direction * (track.clientWidth * .8),
          behavior: reduceMotion ? 'instant' : 'smooth'
        });

      });

    });


  // IMAGE LIGHTBOX

  const lightbox = document.createElement('div');

  lightbox.className = 'cu-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');

  lightbox.setAttribute(
    'aria-label',
    'Carnival gallery viewer'
  );

  lightbox.innerHTML = `
    <button
      class="cu-lightbox-close"
      type="button"
      aria-label="Close image">×</button>

    <button
      class="cu-lightbox-prev"
      type="button"
      aria-label="Previous image">‹</button>

    <img src="" alt="">

    <button
      class="cu-lightbox-next"
      type="button"
      aria-label="Next image">›</button>

    <div
      class="cu-lightbox-caption"
      aria-live="polite"></div>
  `;

  document.body.append(lightbox);

  const modalImg = lightbox.querySelector('img');

  const modalCaption = lightbox.querySelector(
    '.cu-lightbox-caption'
  );

  const close = lightbox.querySelector(
    '.cu-lightbox-close'
  );

  let selected = 0;
  let opener = null;

  function displayImage() {

    modalImg.src = photos[selected];
    modalImg.alt = titles[selected];

    modalCaption.textContent =
      `${selected + 1} / ${photos.length} — ${titles[selected]}`;

  }

  function openLightbox(index) {

    selected = index;
    opener = document.activeElement;

    displayImage();

    lightbox.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    close.focus();

  }

  function closeLightbox() {

    lightbox.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';

    opener?.focus();

  }

  function changeImage(step) {

    selected =
      (selected + step + photos.length) % photos.length;

    displayImage();

  }

  close.addEventListener(
    'click',
    closeLightbox
  );

  lightbox.querySelector('.cu-lightbox-prev')
    .addEventListener('click', () => {
      changeImage(-1);
    });

  lightbox.querySelector('.cu-lightbox-next')
    .addEventListener('click', () => {
      changeImage(1);
    });

  lightbox.addEventListener('click', (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });

  // KEYBOARD ACCESSIBILITY

  document.addEventListener('keydown', (event) => {

    if (
      lightbox.getAttribute('aria-hidden') === 'true'
    ) return;

    if (event.key === 'Escape') {

      closeLightbox();

    } else if (event.key === 'ArrowLeft') {

      changeImage(-1);

    } else if (event.key === 'ArrowRight') {

      changeImage(1);

    } else if (event.key === 'Tab') {

      event.preventDefault();

      const buttons = [
        close,
        lightbox.querySelector('.cu-lightbox-prev'),
        lightbox.querySelector('.cu-lightbox-next')
      ];

      const i = buttons.indexOf(
        document.activeElement
      );

      const next =
        (i + (event.shiftKey ? -1 : 1) + buttons.length)
        % buttons.length;

      buttons[next].focus();

    }

  });

})();
