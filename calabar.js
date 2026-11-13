
/* ============================================
   CALABAR CARNIVAL 2026
   COMPLETE JAVASCRIPT — FOUR SECTIONS
============================================ */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";

  /* ========================================
     CONFIGURATION
  ======================================== */

  const packages = {
    seat: {
      name: "SEAT",
      price: 150000
    },

    stay: {
      name: "STAY",
      price: 500000
    },

    explore: {
      name: "EXPLORE",
      price: 620000
    },

    fly: {
      name: "FLY & EXPLORE",
      price: 920000
    }
  };

  const money = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  });

  const body = document.body;

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  const hero = document.querySelector(".carnival-hero");
  const heroVideo = document.getElementById("heroVideo");

  const soundButton = document.getElementById("soundButton");
  const soundIcon = document.getElementById("soundIcon");
  const soundText = document.getElementById("soundText");

  const ticketsSection = document.getElementById("tickets");

  const summaryItems = document.getElementById("summaryItems");
  const bookingTotal = document.getElementById("bookingTotal");
  const summaryCheckout = document.getElementById("summaryCheckout");
  const summaryClear = document.getElementById("summaryClear");

  const reviewDialog = document.getElementById("reviewDialog");
  const reviewContent = document.getElementById("reviewContent");
  const reviewClose = document.getElementById("reviewClose");
  const reviewDone = document.getElementById("reviewDone");

  let cart = [];
  let nextItemId = 1;

  /* ========================================
     NAVIGATION
  ======================================== */

  function updateHeader() {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

    const currentY = window.scrollY + 100;

    const green = document.getElementById("highlights");
    const red = document.getElementById("tickets");

    const inSection = section => {
      if (!section) return false;

      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      return currentY >= top && currentY < bottom;
    };

    header.classList.toggle(
      "on-green-section",
      inSection(green)
    );

    header.classList.toggle(
      "on-red-section",
      inSection(red)
    );

  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  /* ========================================
     MOBILE MENU
  ======================================== */

  function closeMenu() {

    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation"
    );

    header?.classList.remove("menu-active");
    body.classList.remove("menu-open");

  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const open = !navLinks.classList.contains("open");

      navLinks.classList.toggle("open", open);

      header?.classList.toggle(
        "menu-active",
        open
      );

      body.classList.toggle("menu-open", open);

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
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

  /* ========================================
     ACTIVE NAVIGATION
  ======================================== */

  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {

    const navObserver = new IntersectionObserver(entries => {

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
      rootMargin: "-30% 0px -55% 0px"
    });

    sections.forEach(section => {
      navObserver.observe(section);
    });

  }

  /* ========================================
     HERO VIDEO
  ======================================== */

  if (heroVideo) {

    let visible = true;

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    heroVideo.loop = true;

    function playVideo() {

      if (!visible || document.hidden) return;

      const promise = heroVideo.play();

      if (promise && typeof promise.catch === "function") {
        promise.catch(() => {});
      }

    }

    const mutedIcon = `
      <svg viewBox="0 0 24 24"
        width="18" height="18" fill="none"
        aria-hidden="true">
        <path d="M11 5L6 9H3V15H6L11 19V5Z"
          stroke="currentColor" stroke-width="1.6"
          stroke-linejoin="round"/>
        <path d="M16 9L21 15M21 9L16 15"
          stroke="currentColor" stroke-width="1.6"
          stroke-linecap="round"/>
      </svg>
    `;

    const unmutedIcon = `
      <svg viewBox="0 0 24 24"
        width="18" height="18" fill="none"
        aria-hidden="true">
        <path d="M11 5L6 9H3V15H6L11 19V5Z"
          stroke="currentColor" stroke-width="1.6"
          stroke-linejoin="round"/>
        <path d="M15 9C16.5 10.5 16.5 13.5 15 15"
          stroke="currentColor" stroke-width="1.6"
          stroke-linecap="round"/>
        <path d="M18 6C21.5 9.5 21.5 14.5 18 18"
          stroke="currentColor" stroke-width="1.6"
          stroke-linecap="round"/>
      </svg>
    `;

    function updateSound() {

      if (!soundButton || !soundText || !soundIcon) return;

      const enabled = !heroVideo.muted;

      soundText.textContent = enabled
        ? "Turn Off Sound"
        : "Turn On Sound";

      soundIcon.innerHTML = enabled
        ? unmutedIcon
        : mutedIcon;

      soundButton.setAttribute(
        "aria-pressed",
        String(enabled)
      );

      soundButton.setAttribute(
        "aria-label",
        enabled ? "Turn off video sound" : "Turn on video sound"
      );

    }

    soundButton?.addEventListener("click", () => {

      heroVideo.muted = !heroVideo.muted;

      updateSound();
      playVideo();

    });

    playVideo();
    updateSound();

    document.addEventListener("visibilitychange", () => {

      if (document.hidden) {
        heroVideo.pause();
      } else {
        playVideo();
      }

    });

    if (hero && "IntersectionObserver" in window) {

      const videoObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

          visible = entry.isIntersecting;

          if (visible) {
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

  /* ========================================
     HERO BUILD PACKAGE SHORTCUT
  ======================================== */

  document.querySelectorAll("[data-focus-package]").forEach(link => {

    link.addEventListener("click", () => {

      const packageId = link.dataset.focusPackage;

      if (!packages[packageId]) return;

      window.setTimeout(() => {

        const target = document.getElementById(
          "ticket-" + packageId
        );

        target?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 350);

    });

  });

  /* ========================================
     QUANTITY CONTROLS
  ======================================== */

  document.querySelectorAll(".ticket-row").forEach(row => {

    const minus = row.querySelector(".qty-minus");
    const plus = row.querySelector(".qty-plus");
    const output = row.querySelector(".qty-value");

    let quantity = 1;

    function updateQuantity() {

      quantity = Math.max(1, Math.min(20, quantity));

      output.textContent = String(quantity);

      minus.disabled = quantity <= 1;
      plus.disabled = quantity >= 20;

    }

    minus.addEventListener("click", () => {

      quantity -= 1;
      updateQuantity();

    });

    plus.addEventListener("click", () => {

      quantity += 1;
      updateQuantity();

    });

    updateQuantity();

  });

  /* ========================================
     VALIDATION HELPERS
  ======================================== */

  function isPreferredDateValid(value) {

    return (
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      value >= "2026-12-01" &&
      value <= "2026-12-31"
    );

  }

  function formatDate(value) {

    if (!value) return "Not selected";

    const parts = value.split("-").map(Number);

    if (parts.length !== 3) return value;

    const date = new Date(Date.UTC(
      parts[0],
      parts[1] - 1,
      parts[2]
    ));

    return date.toLocaleDateString("en-NG", {
      timeZone: "UTC",
      day: "numeric",
      month: "short",
      year: "numeric"
    });

  }

  function validateFlightFields(row, carnivalDate) {

    const origin = row.querySelector(".ticket-origin")
      .value.trim();

    const departure = row.querySelector(".ticket-departure").value;

    const returnDate = row.querySelector(".ticket-return").value;

    if (!origin) {
      alert("Please enter your departure airport.");
      row.querySelector(".ticket-origin").focus();
      return null;
    }

    if (!departure || !returnDate) {
      alert("Please select your outbound and return flight dates.");
      return null;
    }

    if (departure > returnDate) {
      alert("Your return flight must be on or after your outbound date.");
      return null;
    }

    if (departure > carnivalDate || returnDate < carnivalDate) {
      alert("Your flight dates must include the preferred Carnival date.");
      return null;
    }

    return {
      origin,
      departure,
      returnDate
    };

  }

  /* ========================================
     ADD PACKAGE TO BOOKING
  ======================================== */

  document.querySelectorAll(".ticket-add").forEach(button => {

    button.addEventListener("click", () => {

      const row = button.closest(".ticket-row");

      const packageId = row.dataset.ticket;
      const selectedPackage = packages[packageId];

      if (!selectedPackage) return;

      const quantity = Number(
        row.querySelector(".qty-value").textContent
      );

      const date = row.querySelector(".ticket-date").value;

      if (!isPreferredDateValid(date)) {

        alert(
          "Please select a preferred date in December 2026. " +
          "Dates are subject to official confirmation."
        );

        row.querySelector(".ticket-date").focus();

        return;

      }

      let flight = null;

      if (packageId === "fly") {

        flight = validateFlightFields(row, date);

        if (!flight) return;

      }

      const entry = {
        id: nextItemId++,
        packageId,
        name: selectedPackage.name,
        price: selectedPackage.price,
        quantity,
        date,
        flight
      };

      cart.push(entry);

      renderSummary();

      const originalText = button.textContent;

      button.textContent = "Added to Booking";

      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1500);

    });

  });

  /* ========================================
     BOOKING TOTAL
  ======================================== */

  function calculateTotal() {

    return cart.reduce((total, entry) => {

      return total + entry.price * entry.quantity;

    }, 0);

  }

  /* ========================================
     CREATE SUMMARY ELEMENTS SAFELY
  ======================================== */

  function makeElement(tag, className, textValue) {

    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (textValue !== undefined) {
      element.textContent = textValue;
    }

    return element;

  }

  function renderSummary() {

    if (!summaryItems) return;

    summaryItems.replaceChildren();

    if (cart.length === 0) {

      const empty = makeElement(
        "div",
        "summary-empty"
      );

      empty.appendChild(
        makeElement("span", "summary-empty-icon", "✳")
      );

      empty.appendChild(
        makeElement("p", "", "No packages selected yet.")
      );

      empty.appendChild(
        makeElement("small", "", "Choose an experience to begin.")
      );

      summaryItems.appendChild(empty);

    } else {

      cart.forEach(entry => {

        const item = makeElement("div", "summary-entry");

        item.appendChild(
          makeElement("strong", "", entry.name)
        );

        item.appendChild(
          makeElement(
            "span",
            "",
            entry.quantity + " guest(s) · " + formatDate(entry.date)
          )
        );

        if (entry.flight) {

          item.appendChild(
            makeElement(
              "span",
              "",
              "Departure: " + entry.flight.origin
            )
          );

          item.appendChild(
            makeElement(
              "span",
              "",
              formatDate(entry.flight.departure) +
              " – " +
              formatDate(entry.flight.returnDate)
            )
          );

        }

        item.appendChild(
          makeElement(
            "b",
            "",
            money.format(entry.price * entry.quantity)
          )
        );

        const removeButton = makeElement(
          "button",
          "summary-remove",
          "Remove"
        );

        removeButton.type = "button";

        removeButton.setAttribute(
          "aria-label",
          "Remove " + entry.name + " from booking"
        );

        removeButton.addEventListener("click", () => {

          cart = cart.filter(item => {
            return item.id !== entry.id;
          });

          renderSummary();

        });

        item.appendChild(removeButton);

        summaryItems.appendChild(item);

      });

    }

    bookingTotal.textContent = money.format(calculateTotal());

    summaryCheckout.disabled = cart.length === 0;
    summaryClear.disabled = cart.length === 0;

  }

  /* ========================================
     CLEAR BOOKING
  ======================================== */

  summaryClear?.addEventListener("click", () => {

    cart = [];

    renderSummary();

  });

  /* ========================================
     REVIEW SELECTED PACKAGES
  ======================================== */

  function buildReview() {

    if (!reviewContent) return;

    reviewContent.replaceChildren();

    cart.forEach(entry => {

      const line = makeElement("div", "review-line");

      line.appendChild(
        makeElement(
          "strong",
          "",
          entry.name + " — " + entry.quantity + " guest(s)"
        )
      );

      line.appendChild(
        makeElement(
          "p",
          "",
          "Preferred Carnival date: " + formatDate(entry.date)
        )
      );

      if (entry.flight) {

        line.appendChild(
          makeElement(
            "p",
            "",
            "Departure airport: " + entry.flight.origin
          )
        );

        line.appendChild(
          makeElement(
            "p",
            "",
            "Travel: " +
            formatDate(entry.flight.departure) +
            " to " +
            formatDate(entry.flight.returnDate)
          )
        );

      }

      line.appendChild(
        makeElement(
          "b",
          "",
          money.format(entry.price * entry.quantity)
        )
      );

      reviewContent.appendChild(line);

    });

    reviewContent.appendChild(
      makeElement(
        "div",
        "review-total",
        "Indicative starting total: " +
        money.format(calculateTotal())
      )
    );

  }

  summaryCheckout?.addEventListener("click", () => {

    if (cart.length === 0 || !reviewDialog) return;

    buildReview();

    if (!reviewDialog.open) {
      reviewDialog.showModal();
    }

  });

  function closeReview() {

    if (reviewDialog?.open) {
      reviewDialog.close();
    }

  }

  reviewClose?.addEventListener("click", closeReview);
  reviewDone?.addEventListener("click", closeReview);

  reviewDialog?.addEventListener("click", event => {

    if (event.target === reviewDialog) {
      closeReview();
    }

  });

  /* ========================================
     INITIALIZE
  ======================================== */

  renderSummary();

  console.info("Calabar Carnival ticketing initialized.");

});
