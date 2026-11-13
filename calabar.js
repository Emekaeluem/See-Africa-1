
/* ==========================================
   CALABAR CARNIVAL 2026
   COMPLETE JAVASCRIPT — FIVE SECTIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ======================================
     CONFIGURATION
  ====================================== */

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

  /* ======================================
     NAVIGATION SCROLL STATES
  ====================================== */

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

    const currentY = window.scrollY + 100;

    function withinSection(id) {
      const section = document.getElementById(id);
      if (!section) return false;

      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      return currentY >= top && currentY < bottom;
    }

    header.classList.toggle(
      "on-green-section",
      withinSection("highlights")
    );

    header.classList.toggle(
      "on-red-section",
      withinSection("tickets")
    );

    header.classList.toggle(
      "on-gold-section",
      withinSection("featured")
    );
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  /* ======================================
     MOBILE NAVIGATION
  ====================================== */

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    header?.classList.remove("menu-active");
    body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
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

  /* ======================================
     ACTIVE NAVIGATION
  ====================================== */

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

  /* ======================================
     HERO VIDEO AND SOUND
  ====================================== */

  if (heroVideo) {
    let videoVisible = true;

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    heroVideo.loop = true;

    function playVideo() {
      if (!videoVisible || document.hidden) return;

      try {
        const promise = heroVideo.play();

        if (promise && typeof promise.catch === "function") {
          promise.catch(() => {});
        }
      } catch (error) {
        console.warn("Video playback unavailable:", error);
      }
    }

    const mutedIcon = `
      <svg viewBox="0 0 24 24" width="18" height="18"
        fill="none" aria-hidden="true">
        <path d="M11 5L6 9H3V15H6L11 19V5Z"
          stroke="currentColor" stroke-width="1.6"
          stroke-linejoin="round"/>
        <path d="M16 9L21 15M21 9L16 15"
          stroke="currentColor" stroke-width="1.6"
          stroke-linecap="round"/>
      </svg>
    `;

    const unmutedIcon = `
      <svg viewBox="0 0 24 24" width="18" height="18"
        fill="none" aria-hidden="true">
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
      if (!soundButton || !soundIcon || !soundText) return;

      const enabled = !heroVideo.muted;

      soundIcon.innerHTML = enabled ? unmutedIcon : mutedIcon;

      soundText.textContent = enabled
        ? "Turn Off Sound"
        : "Turn On Sound";

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
          videoVisible = entry.isIntersecting;

          if (videoVisible && !document.hidden) {
            playVideo();
          } else {
            heroVideo.pause();
          }
        });
      }, { threshold: .05 });

      videoObserver.observe(hero);
    }
  }

  /* ======================================
     HERO BUILD PACKAGE SHORTCUT
  ====================================== */

  document.querySelectorAll("[data-focus-package]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const id = link.dataset.focusPackage;
      const target = document.getElementById("ticket-" + id);

      target?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  /* ======================================
     TICKET QUANTITY CONTROLS
  ====================================== */

  document.querySelectorAll(".ticket-row").forEach(row => {
    const minus = row.querySelector(".qty-minus");
    const plus = row.querySelector(".qty-plus");
    const output = row.querySelector(".qty-value");

    if (!minus || !plus || !output) return;

    let quantity = 1;

    function updateQuantity() {
      quantity = Math.max(1, Math.min(20, quantity));

      output.textContent = String(quantity);
      minus.disabled = quantity <= 1;
      plus.disabled = quantity >= 20;
    }

    minus.addEventListener("click", () => {
      quantity--;
      updateQuantity();
    });

    plus.addEventListener("click", () => {
      quantity++;
      updateQuantity();
    });

    updateQuantity();
  });

  /* ======================================
     DATE AND FLIGHT VALIDATION
  ====================================== */

  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    const [year, month, day] = value.split("-").map(Number);

    const date = new Date(Date.UTC(year, month - 1, day));

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }

  function validCarnivalDate(value) {
    return (
      validDate(value) &&
      value >= "2026-12-01" &&
      value <= "2026-12-31"
    );
  }

  function formatDate(value) {
    if (!validDate(value)) return "Not selected";

    const [year, month, day] = value.split("-").map(Number);

    return new Date(
      Date.UTC(year, month - 1, day)
    ).toLocaleDateString("en-NG", {
      timeZone: "UTC",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function validateFlight(row, carnivalDate) {
    const originInput = row.querySelector(".ticket-origin");
    const departureInput = row.querySelector(".ticket-departure");
    const returnInput = row.querySelector(".ticket-return");

    const origin = originInput?.value.trim() || "";
    const departure = departureInput?.value || "";
    const returnDate = returnInput?.value || "";

    if (!origin) {
      alert("Please enter your departure airport.");
      originInput?.focus();
      return null;
    }

    if (!validDate(departure) || !validDate(returnDate)) {
      alert("Please select valid outbound and return flight dates.");
      return null;
    }

    if (departure > returnDate) {
      alert("Your return date must be on or after your outbound date.");
      return null;
    }

    if (
      departure > carnivalDate ||
      returnDate < carnivalDate
    ) {
      alert("Your travel dates must include your preferred Carnival date.");
      return null;
    }

    return { origin, departure, returnDate };
  }

  /* ======================================
     TICKET CART
  ====================================== */

  function makeElement(tag, className, textValue) {
    const element = document.createElement(tag);

    if (className) element.className = className;

    if (textValue !== undefined) {
      element.textContent = textValue;
    }

    return element;
  }

  function calculateTotal() {
    return cart.reduce((sum, entry) => {
      return sum + entry.price * entry.quantity;
    }, 0);
  }

  document.querySelectorAll(".ticket-add").forEach(button => {
    button.addEventListener("click", () => {
      const row = button.closest(".ticket-row");
      if (!row) return;

      const packageId = row.dataset.ticket;
      const selected = packages[packageId];

      if (!selected) return;

      const quantity = Number(
        row.querySelector(".qty-value")?.textContent || 1
      );

      const dateInput = row.querySelector(".ticket-date");
      const date = dateInput?.value || "";

      if (!validCarnivalDate(date)) {
        alert(
          "Select a valid preferred date in December 2026. " +
          "Availability is subject to confirmation."
        );
        dateInput?.focus();
        return;
      }

      let flight = null;

      if (packageId === "fly") {
        flight = validateFlight(row, date);
        if (!flight) return;
      }

      cart.push({
        id: nextItemId++,
        packageId,
        name: selected.name,
        price: selected.price,
        quantity,
        date,
        flight
      });

      renderSummary();

      const originalText = button.textContent;
      button.textContent = "Added to Booking";

      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1300);
    });
  });

  /* ======================================
     BOOKING SUMMARY
  ====================================== */

  function renderSummary() {
    if (!summaryItems) return;

    summaryItems.replaceChildren();

    if (cart.length === 0) {
      const empty = makeElement("div", "summary-empty");

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
              "From " + entry.flight.origin
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

        const remove = makeElement(
          "button",
          "summary-remove",
          "Remove"
        );

        remove.type = "button";

        remove.setAttribute(
          "aria-label",
          "Remove " + entry.name + " from booking"
        );

        remove.addEventListener("click", () => {
          cart = cart.filter(item => item.id !== entry.id);
          renderSummary();
        });

        item.appendChild(remove);
        summaryItems.appendChild(item);
      });
    }

    if (bookingTotal) {
      bookingTotal.textContent = money.format(calculateTotal());
    }

    if (summaryCheckout) {
      summaryCheckout.disabled = cart.length === 0;
    }

    if (summaryClear) {
      summaryClear.disabled = cart.length === 0;
    }
  }

  summaryClear?.addEventListener("click", () => {
    cart = [];
    renderSummary();
  });

  /* ======================================
     REVIEW DIALOG
  ====================================== */

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

  function closeReview() {
    if (reviewDialog?.open) {
      reviewDialog.close();
    }
  }

  summaryCheckout?.addEventListener("click", () => {
    if (!cart.length || !reviewDialog) return;

    buildReview();

    if (!reviewDialog.open) {
      reviewDialog.showModal();
    }
  });

  reviewClose?.addEventListener("click", closeReview);
  reviewDone?.addEventListener("click", closeReview);

  reviewDialog?.addEventListener("click", event => {
    if (event.target === reviewDialog) {
      closeReview();
    }
  });

  /* ==========================================
     SECTION 5 — FEATURED PACKAGE JOURNEY

     INTERACTIVE FIVE-STEP NAVIGATION
  ========================================== */

  const journeyData = [
    {
      title: "Choose your seat",
      description:
        "Secure your verified hospitality access."
    },
    {
      title: "Add your stay",
      description:
        "Choose your hotel class and number of nights."
    },
    {
      title: "Add your discovery",
      description:
        "Explore Tinapa and Kwa Falls with scheduled transport and a host or guide allowance."
    },
    {
      title: "Add your flight",
      description:
        "Select your origin airport and receive a flight-inclusive total."
    },
    {
      title: "Arrive and answer the beat",
      description:
        "Your itinerary, guest support and event-day guidance are arranged around you."
    }
  ];

  const journeyButtons = document.querySelectorAll(".journey-step");
  const journeyTitle = document.getElementById("journeyDetailTitle");
  const journeyText = document.getElementById("journeyDetailText");
  const journeyLabel = document.getElementById("journeyDetailLabel");
  const journeyHeadingCount = document.querySelector(".journey-heading strong");

  const journeyPrev = document.getElementById("journeyPrev");
  const journeyNext = document.getElementById("journeyNext");

  let currentJourney = 0;

  function updateJourney(index) {
    const safeIndex = Math.max(
      0,
      Math.min(journeyData.length - 1, index)
    );

    currentJourney = safeIndex;

    const current = journeyData[currentJourney];

    if (journeyTitle) {
      journeyTitle.textContent = current.title;
    }

    if (journeyText) {
      journeyText.textContent = current.description;
    }

    const stepNumber = String(currentJourney + 1).padStart(2, "0");

    if (journeyLabel) {
      journeyLabel.textContent = `STEP ${stepNumber} / 05`;
    }

    if (journeyHeadingCount) {
      journeyHeadingCount.textContent = `${stepNumber} / 05`;
    }

    journeyButtons.forEach((button, index) => {
      const active = index === currentJourney;

      button.classList.toggle("active", active);

      button.setAttribute(
        "aria-pressed",
        String(active)
      );
    });

    if (journeyPrev) {
      journeyPrev.disabled = currentJourney === 0;
    }

    if (journeyNext) {
      journeyNext.disabled =
        currentJourney === journeyData.length - 1;
    }
  }

  journeyButtons.forEach(button => {
    button.addEventListener("click", () => {
      updateJourney(Number(button.dataset.journey));
    });
  });

  journeyPrev?.addEventListener("click", () => {
    updateJourney(currentJourney - 1);
  });

  journeyNext?.addEventListener("click", () => {
    updateJourney(currentJourney + 1);
  });

  updateJourney(0);

  /* ======================================
     INITIALIZE
  ====================================== */

  renderSummary();

  console.info(
    "Calabar Carnival — all five sections initialized."
  );
});
