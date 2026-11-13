
/* ==========================================
   CALABAR CARNIVAL 2026
   COMPLETE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const body = document.body;

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  const hero = document.querySelector(".carnival-hero");
  const heroVideo = document.getElementById("heroVideo");

  const soundButton = document.getElementById("soundButton");
  const soundIcon = document.getElementById("soundIcon");
  const soundText = document.getElementById("soundText");

  const bookingDialog = document.getElementById("bookingDialog");
  const dialogClose = document.getElementById("dialogClose");
  const bookingTitle = document.getElementById("bookingTitle");
  const dialogNote = document.getElementById("dialogNote");

  const bookingButtons = document.querySelectorAll("[data-booking]");
  const bookingOptions = document.querySelectorAll("[data-package]");

  const hospitalitySection = document.querySelector(".hospitality-section");
  const hospitalityGirl = document.getElementById("hospitalityGirl");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ======================================
     GLASS NAVIGATION
  ====================================== */

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  /* ======================================
     MOBILE MENU
  ====================================== */

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open menu"
    );

    header?.classList.remove("menu-active");
    body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = !navLinks.classList.contains("open");

      navLinks.classList.toggle("open", open);
      header?.classList.toggle("menu-active", open);
      body.classList.toggle("menu-open", open);

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      menuToggle.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu"
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        closeMenu();
      }
    });
  }

  /* ======================================
     VIDEO PLAYBACK
  ====================================== */

  let videoVisible = true;

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    heroVideo.loop = true;

    function playVideo() {
      if (document.hidden || !videoVisible) return;

      try {
        const playPromise = heroVideo.play();

        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            // Browser may restrict autoplay.
          });
        }
      } catch (error) {
        console.warn("Video playback unavailable:", error);
      }
    }

    playVideo();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        heroVideo.pause();
      } else {
        playVideo();
      }
    });

    /* SOUND CONTROL */

    const mutedIcon = `
      <svg viewBox="0 0 24 24"
        width="18" height="18"
        fill="none"
        aria-hidden="true">

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

    const unmutedIcon = `
      <svg viewBox="0 0 24 24"
        width="18" height="18"
        fill="none"
        aria-hidden="true">

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

    function updateSound() {
      if (!soundButton || !soundIcon || !soundText) return;

      const on = !heroVideo.muted;

      soundIcon.innerHTML = on ? unmutedIcon : mutedIcon;
      soundText.textContent = on ? "Turn Off Sound" : "Turn On Sound";

      soundButton.setAttribute(
        "aria-pressed",
        String(on)
      );

      soundButton.setAttribute(
        "aria-label",
        on ? "Turn off video sound" : "Turn on video sound"
      );
    }

    if (soundButton) {
      soundButton.addEventListener("click", () => {
        heroVideo.muted = !heroVideo.muted;
        updateSound();
        playVideo();
      });
    }

    updateSound();

    /* PAUSE VIDEO OUTSIDE HERO */

    if (hero && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          videoVisible = entry.isIntersecting;

          if (videoVisible && !document.hidden) {
            playVideo();
          } else {
            heroVideo.pause();
          }
        });
      }, {
        threshold: 0.05
      });

      observer.observe(hero);
    }
  }

  /* ======================================
     BOOKING PREVIEW
  ====================================== */

  function openBooking(type) {
    if (!bookingDialog) return;

    closeMenu();

    if (bookingTitle) {
      bookingTitle.textContent =
        type === "Build"
          ? "Build Your Calabar Experience"
          : "Choose Your Experience";
    }

    bookingOptions.forEach(option => {
      option.classList.remove("selected");
    });

    if (type !== "Build") {
      const seat = document.querySelector(
        '[data-package="Seat"]'
      );

      if (seat) {
        seat.classList.add("selected");
      }
    }

    if (dialogNote) {
      dialogNote.textContent =
        "Package prices and availability are subject to confirmation. " +
        "Full checkout and payment functionality will be connected separately.";
    }

    if (!bookingDialog.open) {
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

  bookingOptions.forEach(option => {
    option.addEventListener("click", () => {
      bookingOptions.forEach(item => {
        item.classList.remove("selected");
      });

      option.classList.add("selected");

      if (dialogNote) {
        dialogNote.textContent =
          option.dataset.package +
          " selected. Booking and checkout will be connected when the booking system is ready.";
      }
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

  /* ======================================
     SUBTLE GIRL IMAGE PARALLAX
  ====================================== */

  if (
    hospitalityGirl &&
    hospitalitySection &&
    !reducedMotion &&
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
  ) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrame = null;

    function animateGirl() {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      hospitalityGirl.style.translate =
        `${currentX}px ${currentY}px`;

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        animationFrame = requestAnimationFrame(animateGirl);
      } else {
        animationFrame = null;
      }
    }

    function requestGirlAnimation() {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animateGirl);
      }
    }

    hospitalitySection.addEventListener("pointermove", event => {
      const rect = hospitalitySection.getBoundingClientRect();

      targetX =
        ((event.clientX - rect.left) / rect.width - 0.5) * 12;

      targetY =
        ((event.clientY - rect.top) / rect.height - 0.5) * 9;

      requestGirlAnimation();
    });

    hospitalitySection.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      requestGirlAnimation();
    });
  }

  /* ======================================
     ESCAPE KEY
  ====================================== */

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  console.info("Calabar Carnival landing page loaded.");
});
