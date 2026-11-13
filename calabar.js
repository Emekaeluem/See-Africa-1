
/* CALABAR CARNIVAL 2026 — COMPLETE JAVASCRIPT */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

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
  const hospitalitySection = document.querySelector(".hospitality-section");
  const hospitalityParticles = document.getElementById("hospitalityParticles");
  const hospitalityMask = document.getElementById("hospitalityMask");
  const hospitalityReveal = document.querySelectorAll(".hospitality-reveal");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* PRELOADER — DOES NOT WAIT FOR VIDEO */

  let pageStarted = false;

  function startPage() {
    if (pageStarted) return;
    pageStarted = true;

    if (loader) {
      loader.classList.add("loaded");
      loader.style.pointerEvents = "none";
    }

    body.classList.add("page-ready");

    if (hero) {
      hero.classList.add("hero-ready");
    }
  }

  window.setTimeout(startPage, reducedMotion ? 0 : 850);
  window.setTimeout(startPage, 2200);

  /* VIDEO PLAYBACK */

  let videoInView = true;

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    heroVideo.loop = true;
    heroVideo.autoplay = true;

    function attemptVideoPlayback() {
      if (document.hidden || !videoInView) return;

      try {
        const playPromise = heroVideo.play();

        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(error => {
            console.warn("Video playback unavailable:", error.message);
          });
        }
      } catch (error) {
        console.warn("Video playback error:", error.message);
      }
    }

    attemptVideoPlayback();

    heroVideo.addEventListener("error", () => {
      console.warn(
        "Check the video path: images/calabar-carnival.mp4"
      );
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        heroVideo.pause();
      } else {
        attemptVideoPlayback();
      }
    });

    /* SOUND CONTROL */

    const mutedIcon = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M11 5L6 9H3V15H6L11 19V5Z"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <path
          d="M16 9L21 15M21 9L16 15"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
    `;

    const soundOnIcon = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M11 5L6 9H3V15H6L11 19V5Z"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <path
          d="M15 9C16.5 10.5 16.5 13.5 15 15"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        />
        <path
          d="M18 6C21.5 9.5 21.5 14.5 18 18"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        />
      </svg>
    `;

    function updateSoundUI() {
      if (!soundText || !soundIcon || !soundButton) return;

      const enabled = !heroVideo.muted;

      soundText.textContent = enabled
        ? "SOUND ON"
        : "SOUND OFF";

      soundIcon.innerHTML = enabled
        ? soundOnIcon
        : mutedIcon;

      soundButton.setAttribute(
        "aria-pressed",
        String(enabled)
      );

      soundButton.setAttribute(
        "aria-label",
        enabled ? "Mute background video" : "Unmute background video"
      );
    }

    if (soundButton) {
      soundButton.addEventListener("click", () => {
        heroVideo.muted = !heroVideo.muted;
        updateSoundUI();
        attemptVideoPlayback();
      });
    }

    updateSoundUI();

    /* PAUSE VIDEO OUTSIDE THE HERO */

    if (hero && "IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          videoInView = entry.isIntersecting;

          if (videoInView && !document.hidden) {
            attemptVideoPlayback();
          } else {
            heroVideo.pause();
          }
        });
      }, { threshold: 0.05 });

      videoObserver.observe(hero);
    }
  }

  /* GLASS HEADER SCROLL STATE */

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* MOBILE NAVIGATION */

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");

    if (header) {
      header.classList.remove("menu-active");
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const shouldOpen = !navLinks.classList.contains("open");

      navLinks.classList.toggle("open", shouldOpen);

      if (header) {
        header.classList.toggle("menu-active", shouldOpen);
      }

      menuToggle.setAttribute(
        "aria-expanded",
        String(shouldOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        shouldOpen ? "Close menu" : "Open menu"
      );

      body.classList.toggle("menu-open", shouldOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* BOOKING PREVIEW */

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
        "Full booking and payment functionality will be connected to the booking section.";
    }

    if (
      typeof bookingDialog.showModal === "function" &&
      !bookingDialog.open
    ) {
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
          " selected. This selection will connect to the complete booking form when the package calculator is added.";
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

  /* HOSPITALITY SCROLL REVEAL */

  function revealHospitality() {
    hospitalityReveal.forEach(element => {
      element.classList.add("is-visible");
    });
  }

  if (hospitalitySection) {
    if ("IntersectionObserver" in window && !reducedMotion) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealHospitality();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      observer.observe(hospitalitySection);
    } else {
      revealHospitality();
    }
  }

  /* SUBTLE FESTIVAL PARTICLES */

  function createHospitalityParticles() {
    if (!hospitalityParticles || reducedMotion) return;

    const colors = [
      "#FFD247",
      "#56EF83",
      "#E3ACFF",
      "#FFFFFF"
    ];

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 18; i++) {
      const particle = document.createElement("span");
      particle.className = "hospitality-particle";

      const size = 2 + Math.random() * 4;
      const left = Math.random() * 100;
      const duration = 10 + Math.random() * 12;
      const delay = -Math.random() * 20;
      const drift = -70 + Math.random() * 140;

      const color = colors[
        Math.floor(Math.random() * colors.length)
      ];

      particle.style.setProperty("--size", size + "px");
      particle.style.setProperty("--left", left + "%");
      particle.style.setProperty("--duration", duration + "s");
      particle.style.setProperty("--delay", delay + "s");
      particle.style.setProperty("--drift", drift + "px");
      particle.style.setProperty("--color", color);

      fragment.appendChild(particle);
    }

    hospitalityParticles.appendChild(fragment);
  }

  createHospitalityParticles();

  /* FLOATING MASK MOUSE PARALLAX */

  if (
    hospitalitySection &&
    hospitalityMask &&
    !reducedMotion &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrame = null;

    function animateMask() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      hospitalityMask.style.translate =
        `${currentX}px ${currentY}px`;

      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        animationFrame = requestAnimationFrame(animateMask);
      } else {
        animationFrame = null;
      }
    }

    function requestMaskAnimation() {
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animateMask);
      }
    }

    hospitalitySection.addEventListener("pointermove", event => {
      const rect = hospitalitySection.getBoundingClientRect();

      targetX =
        ((event.clientX - rect.left) / rect.width - 0.5) * 18;

      targetY =
        ((event.clientY - rect.top) / rect.height - 0.5) * 14;

      requestMaskAnimation();
    });

    hospitalitySection.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      requestMaskAnimation();
    });
  }

  /* ESCAPE KEY */

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeBooking();
      closeMenu();
    }
  });

  console.info("Calabar Carnival website initialized.");
});
