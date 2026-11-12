
/* ============================================
   CALABAR CARNIVAL 2026
   CINEMATIC HERO INTERACTIONS
============================================ */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";

  /* ----------------------------------------
     ELEMENTS
  ---------------------------------------- */

  const body = document.body;

  const loader = document.getElementById("pageLoader");

  const header = document.getElementById("siteHeader");

  const hero = document.querySelector(".carnival-hero");

  const heroVideo = document.getElementById("heroVideo");

  const soundButton = document.getElementById("soundButton");

  const soundText = document.getElementById("soundText");

  const soundIcon = document.getElementById("soundIcon");

  const menuToggle = document.getElementById("menuToggle");

  const navLinks = document.getElementById("navLinks");

  const bookingDialog = document.getElementById("bookingDialog");

  const dialogClose = document.getElementById("dialogClose");

  const dialogTitle = document.getElementById("bookingTitle");

  const dialogNote = document.getElementById("dialogNote");

  const bookingButtons = document.querySelectorAll("[data-booking]");

  const bookingOptions = document.querySelectorAll(".booking-option");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ----------------------------------------
     PRELOADER + ENTRANCE
  ---------------------------------------- */

  function startPage() {

    if (loader) {
      loader.classList.add("loaded");
    }

    if (hero) {
      hero.classList.add("hero-ready");
    }

  }

  // A short intro should never wait for the video
  // to finish downloading.

  window.setTimeout(startPage, reducedMotion ? 100 : 1300);

  /* ----------------------------------------
     VIDEO
  ---------------------------------------- */

  if (heroVideo) {

    heroVideo.muted = true;

    heroVideo.playsInline = true;

    heroVideo.loop = true;

    heroVideo.autoplay = true;

    function attemptPlay() {

      const playPromise = heroVideo.play();

      if (playPromise && typeof playPromise.catch === "function") {

        playPromise.catch(() => {
          // Autoplay may be restricted by the browser.
          // The video can resume after user interaction.
        });

      }

    }

    attemptPlay();

    // Pause the video when the browser tab is hidden,
    // resume when the visitor returns.

    document.addEventListener("visibilitychange", () => {

      if (document.hidden) {

        heroVideo.pause();

      } else {

        attemptPlay();

      }

    });

    /* ------------------------------------
       VIDEO SOUND
    ------------------------------------ */

    const mutedIcon = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11 5L6 9H3V15H6L11 19V5Z"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linejoin="round"/>
        <path d="M16 9L21 15M21 9L16 15"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"/>
      </svg>
    `;

    const soundOnIcon = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11 5L6 9H3V15H6L11 19V5Z"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linejoin="round"/>
        <path d="M15 9C16.5 10.5 16.5 13.5 15 15"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"/>
        <path d="M18 6C21.5 9.5 21.5 14.5 18 18"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"/>
      </svg>
    `;

    function updateSoundUI() {

      const soundOn = !heroVideo.muted;

      soundText.textContent = soundOn
        ? "SOUND ON"
        : "SOUND OFF";

      soundIcon.innerHTML = soundOn
        ? soundOnIcon
        : mutedIcon;

      soundButton.setAttribute(
        "aria-pressed",
        String(soundOn)
      );

      soundButton.setAttribute(
        "aria-label",
        soundOn
          ? "Mute background video"
          : "Unmute background video"
      );

    }

    if (soundButton && soundText && soundIcon) {

      soundButton.addEventListener("click", () => {

        heroVideo.muted = !heroVideo.muted;

        updateSoundUI();

        attemptPlay();

      });

      updateSoundUI();

    }

  }

  /* ----------------------------------------
     NAVIGATION SCROLL EFFECT
  ---------------------------------------- */

  function updateHeader() {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();

  /* ----------------------------------------
     MOBILE NAVIGATION
  ---------------------------------------- */

  function closeMenu() {

    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");

    header.classList.remove("menu-active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open menu"
    );

    body.classList.remove("menu-open");

  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const willOpen = !navLinks.classList.contains("open");

      navLinks.classList.toggle("open", willOpen);

      header.classList.toggle("menu-active", willOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(willOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        willOpen ? "Close menu" : "Open menu"
      );

      body.classList.toggle("menu-open", willOpen);

    });

    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", closeMenu);

    });

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

  }

  /* ----------------------------------------
     BOOKING PREVIEW
  ---------------------------------------- */

  function openBooking(type) {

    if (!bookingDialog) return;

    closeMenu();

    if (dialogTitle) {

      dialogTitle.textContent = type === "Build"
        ? "Build your Calabar experience."
        : "Choose your experience.";

    }

    bookingOptions.forEach(option => {
      option.classList.remove("selected");
    });

    if (type !== "Build") {

      const seatOption = document.querySelector(
        '[data-package="Seat"]'
      );

      if (seatOption) {
        seatOption.classList.add("selected");
      }

    }

    if (dialogNote) {

      dialogNote.textContent =
        "Package rates and availability are subject to confirmation. " +
        "Full booking and payment functionality will be connected in the next development stage.";

    }

    if (typeof bookingDialog.showModal === "function") {

      bookingDialog.showModal();

      body.classList.add("dialog-open");

    }

  }

  function closeBooking() {

    if (!bookingDialog) return;

    if (bookingDialog.open) {
      bookingDialog.close();
    }

    body.classList.remove("dialog-open");

  }

  bookingButtons.forEach(button => {

    button.addEventListener("click", () => {

      openBooking(button.dataset.booking);

    });

  });

  if (dialogClose) {

    dialogClose.addEventListener("click", closeBooking);

  }

  if (bookingDialog) {

    bookingDialog.addEventListener("click", event => {

      if (event.target === bookingDialog) {
        closeBooking();
      }

    });

    bookingDialog.addEventListener("close", () => {

      body.classList.remove("dialog-open");

    });

  }

  bookingOptions.forEach(option => {

    option.addEventListener("click", () => {

      bookingOptions.forEach(item => {
        item.classList.remove("selected");
      });

      option.classList.add("selected");

      const selectedPackage = option.dataset.package;

      if (dialogNote) {

        dialogNote.textContent =
          selectedPackage +
          " selected. We'll connect this selection to the complete " +
          "booking form and live package calculator when those sections are built.";

      }

    });

  });

  /* ----------------------------------------
     PAUSE VIDEO OUT OF VIEW
  ---------------------------------------- */

  if (
    heroVideo &&
    hero &&
    "IntersectionObserver" in window
  ) {

    const videoObserver = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            if (!document.hidden) {
              heroVideo.play().catch(() => {});
            }

          } else {

            heroVideo.pause();

          }

        });

      },

      {
        threshold: 0.05
      }

    );

    videoObserver.observe(hero);

  }

});
