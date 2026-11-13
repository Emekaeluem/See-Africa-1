
/* ==============================================
   CALABAR CARNIVAL 2026
   COMPLETE JAVASCRIPT — THREE SECTIONS
============================================== */

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

  const lightSection = document.getElementById("highlights");

  /* ======================================
     NAVIGATION
  ====================================== */

  function updateHeader() {
    if (!header) return;

    const scrolled = window.scrollY > 30;

    header.classList.toggle("scrolled", scrolled);
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  /* ======================================
     LIGHT SECTION NAVIGATION
  ====================================== */

  if (header && lightSection && "IntersectionObserver" in window) {
    const lightObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        header.classList.toggle(
          "on-light-section",
          entry.isIntersecting
        );
      });
    }, {
      rootMargin: "-65px 0px -75% 0px",
      threshold: 0
    });

    lightObserver.observe(lightSection);
  }

  /* ======================================
     MOBILE MENU
  ====================================== */

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    header?.classList.remove("menu-active");
    body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
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
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }

  /* ======================================
     ACTIVE NAVIGATION
  ====================================== */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + id
          );
        });
      });
    }, {
      rootMargin: "-35% 0px -50% 0px"
    });

    sections.forEach(section => {
      sectionObserver.observe(section);
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
        const promise = heroVideo.play();

        if (promise && typeof promise.catch === "function") {
          promise.catch(() => {
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

    /* SOUND ICONS */

    const mutedIcon = `
      <svg viewBox="0 0 24 24"
        width="18" height="18"
        fill="none" aria-hidden="true">

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

    const unmutedIcon = `
      <svg viewBox="0 0 24 24"
        width="18" height="18"
        fill="none" aria-hidden="true">

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

    function updateSound() {
      if (!soundButton || !soundIcon || !soundText) return;

      const enabled = !heroVideo.muted;

      soundIcon.innerHTML = enabled
        ? unmutedIcon
        : mutedIcon;

      soundText.textContent = enabled
        ? "Turn Off Sound"
        : "Turn On Sound";

      soundButton.setAttribute(
        "aria-pressed",
        String(enabled)
      );

      soundButton.setAttribute(
        "aria-label",
        enabled
          ? "Turn off video sound"
          : "Turn on video sound"
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

    /* VIDEO VISIBILITY */

    if (hero && "IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver(entries => {
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

      videoObserver.observe(hero);
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

    if (typeof bookingDialog.showModal === "function" &&
        !bookingDialog.open) {
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
     FINAL INITIALIZATION
  ====================================== */

  console.info("Calabar Carnival — three sections ready.");

});
