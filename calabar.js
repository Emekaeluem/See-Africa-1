
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ========================================
  // SEE AFRICA × FIRSTBANK
  // CALABAR CARNIVAL 2026
  // ========================================

  const $ = selector =>
    document.querySelector(selector);

  const $$ = selector =>
    [...document.querySelectorAll(selector)];

  const money = amount =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0
    }).format(amount);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const smooth = reduceMotion ? "auto" : "smooth";

  function scrollToBooking() {
    $("#booking")?.scrollIntoView({
      behavior: smooth,
      block: "start"
    });
  }

  // ========================================
  // IMAGE VALIDATION
  // ========================================

  // Carnival photographs are assigned once
  // each in HTML.
  //
  // 12–19, then 1–11.
  //
  // The hero uses the original video/poster.
  // Logos are intentionally repeated for
  // branding, not treated as gallery images.

  const expectedOrder = [
    12, 13, 14, 15, 16, 17, 18, 19,
    1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 8
  ];

  const festivalImages = $$(
    'img[src*="new-calabar"]'
  );

  const actualNumbers = festivalImages.map(image => {
    const match = image.getAttribute("src")
      .match(/new-calabar(\d+)\.png$/);

    return match ? Number(match[1]) : null;
  });

  const allUnique =
    actualNumbers.length === 19 &&
    new Set(actualNumbers).size === 19 &&
    expectedOrder.every(number =>
      actualNumbers.includes(number)
    );

  if (!allUnique) {
    console.warn(
      "Carnival photo check: verify all 19 unique images are present.",
      actualNumbers
    );
  } else {
    console.info(
      "Calabar Carnival: all 19 unique images configured."
    );
  }

  // Error handler for all website images.

  $$("img").forEach(image => {
    image.addEventListener("error", () => {
      if (image.dataset.failed === "true") {
        return;
      }

      image.dataset.failed = "true";

      console.warn(
        "Image could not load:",
        image.src
      );

      if (
        image.closest(".brand-logos") ||
        image.closest(".footer-logos")
      ) {
        const replacement =
          document.createElement("strong");

        replacement.textContent =
          image.alt || "Brand Logo";

        replacement.style.color = "white";
        replacement.style.fontSize = "11px";

        image.replaceWith(replacement);
        return;
      }

      image.style.opacity = ".3";
      image.title =
        `Image unavailable: ${image.src}`;
    });
  });

  // ========================================
  // MOBILE NAVIGATION
  // ========================================

  const menuButton = $("#menuButton");
  const navLinks = $("#navLinks");

  function closeMenu() {
    if (!menuButton || !navLinks) return;

    navLinks.classList.remove("open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );

    menuButton.textContent = "☰";
  }

  menuButton?.addEventListener("click", () => {
    if (!navLinks) return;

    const isOpen =
      navLinks.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation"
        : "Open navigation"
    );

    menuButton.textContent =
      isOpen ? "×" : "☰";
  });

  $$("#navLinks a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", event => {
    if (
      navLinks &&
      menuButton &&
      !event.target.closest(".nav") &&
      navLinks.classList.contains("open")
    ) {
      closeMenu();
    }
  });

  // ========================================
  // HERO VIDEO
  // ========================================

  const heroVideo = $("#heroVideo");
  const soundToggle = $("#soundToggle");

  if (heroVideo) {
    heroVideo.muted = true;

    heroVideo.play().catch(() => {
      // Original poster stays behind video.
    });

    heroVideo.addEventListener("error", () => {
      heroVideo.style.display = "none";
    });
  }

  soundToggle?.addEventListener("click", () => {
    if (!heroVideo) return;

    heroVideo.muted = !heroVideo.muted;

    const soundOn = !heroVideo.muted;

    soundToggle.textContent = soundOn
      ? "♫ Mute Sound"
      : "♫ Enable Sound";

    soundToggle.setAttribute(
      "aria-pressed",
      String(soundOn)
    );

    if (heroVideo.paused) {
      heroVideo.play().catch(() => {});
    }
  });

  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================

  const revealItems = $$(".reveal");

  if (
    "IntersectionObserver" in window &&
    !reduceMotion
  ) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealItems.forEach(item => {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => {
      item.classList.add("visible");
    });
  }

  // ========================================
  // FIVE STEP PACKAGE JOURNEY
  // ========================================

  // Journey deliberately uses no photographs.
  // This avoids repeating festival images.

  const journey = [
    {
      title: "Choose your seat",
      description:
        "Secure your verified hospitality access for the selected Carnival event day."
    },
    {
      title: "Add your stay",
      description:
        "Choose your selected hotel class, room preference and the number of nights that suit your itinerary."
    },
    {
      title: "Add your discovery",
      description:
        "Explore Tinapa and Kwa Falls with scheduled transport and a host or guide allowance."
    },
    {
      title: "Add your flight",
      description:
        "Choose your departure city or airport and request a current flight-inclusive total."
    },
    {
      title: "Arrive and answer the beat",
      description:
        "Your itinerary, guest support, transport details and event-day guidance are arranged around your experience."
    }
  ];

  let journeyIndex = 0;

  function renderJourney(index) {
    journeyIndex =
      (index + journey.length) %
      journey.length;

    const current = journey[journeyIndex];

    if ($("#journeyTitle")) {
      $("#journeyTitle").textContent =
        current.title;
    }

    if ($("#journeyDescription")) {
      $("#journeyDescription").textContent =
        current.description;
    }

    if ($("#journeyNumber")) {
      $("#journeyNumber").textContent =
        `STEP ${String(journeyIndex + 1).padStart(2, "0")} / 05`;
    }

    $$(".journey-step").forEach(
      (button, index) => {
        const active =
          index === journeyIndex;

        button.classList.toggle(
          "active",
          active
        );

        button.setAttribute(
          "aria-pressed",
          String(active)
        );
      }
    );
  }

  $$(".journey-step").forEach(button => {
    button.addEventListener("click", () => {
      renderJourney(
        Number(button.dataset.step)
      );
    });
  });

  $("#nextJourney")?.addEventListener(
    "click",
    () => {
      renderJourney(journeyIndex + 1);
    }
  );

  // ========================================
  // GALLERY
  // ========================================

  // Use the 3 images already displayed
  // in the HTML: 9, 10 and 11.
  // Do not generate any duplicate cards.

  const galleryTrack = $("#galleryTrack");

  const galleryCards = $$(".gallery-card");

  const galleryItems = galleryCards.map(card => {
    const image = card.querySelector("img");

    return {
      src: image?.getAttribute("src") || "",
      alt: image?.alt || "Carnival photograph"
    };
  });

  function scrollGallery(direction) {
    if (!galleryTrack) return;

    galleryTrack.scrollBy({
      left:
        direction *
        galleryTrack.clientWidth * .8,
      behavior: smooth
    });
  }

  $("#galleryPrev")?.addEventListener(
    "click",
    () => scrollGallery(-1)
  );

  $("#galleryNext")?.addEventListener(
    "click",
    () => scrollGallery(1)
  );

  // ========================================
  // FULLSCREEN PHOTO VIEWER
  // ========================================

  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCounter = $("#lightboxCounter");

  let selectedImage = 0;
  let previousFocus = null;

  function showLightboxImage() {
    const item =
      galleryItems[selectedImage];

    if (!item || !lightboxImage) return;

    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;

    if (lightboxCounter) {
      lightboxCounter.textContent =
        `${selectedImage + 1} / ${galleryItems.length}`;
    }
  }

  function openLightbox(index, button) {
    if (!lightbox) return;

    selectedImage = index;
    previousFocus = button;

    showLightboxImage();

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

    $("#lightboxClose")?.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";

    previousFocus?.focus();
  }

  function changeLightbox(direction) {
    if (!galleryItems.length) return;

    selectedImage =
      (
        selectedImage +
        direction +
        galleryItems.length
      ) % galleryItems.length;

    showLightboxImage();
  }

  galleryCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      openLightbox(index, card);
    });
  });

  $("#lightboxClose")?.addEventListener(
    "click",
    closeLightbox
  );

  $("#lightboxPrev")?.addEventListener(
    "click",
    () => changeLightbox(-1)
  );

  $("#lightboxNext")?.addEventListener(
    "click",
    () => changeLightbox(1)
  );

  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener(
    "keydown",
    event => {
      if (
        !lightbox ||
        lightbox.getAttribute("aria-hidden") ===
          "true"
      ) return;

      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        changeLightbox(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        changeLightbox(1);
        return;
      }

      if (event.key === "Tab") {
        const controls = [
          $("#lightboxClose"),
          $("#lightboxPrev"),
          $("#lightboxNext")
        ].filter(Boolean);

        const index = controls.indexOf(
          document.activeElement
        );

        if (index === -1) {
          event.preventDefault();
          controls[0]?.focus();
          return;
        }

        const direction =
          event.shiftKey ? -1 : 1;

        const next =
          (
            index +
            direction +
            controls.length
          ) % controls.length;

        event.preventDefault();
        controls[next]?.focus();
      }
    }
  );

  // ========================================
  // PACKAGE SELECTOR
  // ========================================

  const packageSelect = $("#packageType");
  const regionSelect = $("#originRegion");

  function choosePackage(type) {
    if (packageSelect) {
      packageSelect.value = type;
    }

    updateSummary();
    scrollToBooking();
  }

  $$(".choose-package").forEach(button => {
    button.addEventListener("click", () => {
      choosePackage(
        button.dataset.package || "seat"
      );
    });
  });

  $$(".regional-booking").forEach(button => {
    button.addEventListener("click", () => {
      if (regionSelect) {
        regionSelect.value =
          button.dataset.origin;
      }

      choosePackage("fly");
    });
  });

  // ========================================
  // BOOKING CALCULATOR
  // ========================================

  // These are indicative starting prices.
  // No invented hotel/flight supplements.

  const basePrices = {
    seat: 150000,
    stay: 500000,
    explore: 620000,
    fly: 920000
  };

  const packageNames = {
    seat: "Seat Only",
    stay: "Stay",
    explore: "Explore",
    fly: "Fly & Explore"
  };

  const inclusions = {
    seat: [
      "Hospitality access",
      "Event-day meal and refreshments",
      "Guest check-in and seat guidance",
      "Event-day guest support"
    ],
    stay: [
      "Hospitality access",
      "Selected hotel and breakfast",
      "Two hotel nights",
      "Carnival-day return transfer"
    ],
    explore: [
      "Hospitality and selected hotel",
      "Tinapa Free Zone & Resort",
      "Kwa Falls",
      "Scheduled local vehicle and guide allowance"
    ],
    fly: [
      "Hospitality and selected hotel",
      "Tinapa and Kwa Falls",
      "Specified airport and local transfers",
      "Flight-inclusive package subject to live fare confirmation"
    ]
  };

  const bookingForm = $("#bookingForm");
  const copyButton = $("#copyEnquiry");

  let enquiryText = "";

  function value(id) {
    return $(`#${id}`)?.value?.trim() || "";
  }

  function updateSummary() {
    const type =
      value("packageType") || "seat";

    const region =
      value("originRegion") || "nigeria";

    const guests = Math.max(
      1,
      Math.min(
        50,
        Number(value("guestCount")) || 1
      )
    );

    const hotel = value("hotelClass");
    const room = value("roomPreference");
    const nights =
      Number(value("hotelNights")) || 2;
    const transfer = value("transfer");

    const startingRate =
      basePrices[type] || 150000;

    let extraTransport = 0;

    if (transfer === "shared") {
      extraTransport = 50000 * guests;
    } else if (transfer === "private") {
      extraTransport =
        120000 * Math.ceil(guests / 3);
    } else if (transfer === "tour") {
      extraTransport = 180000;
    }

    const total =
      startingRate * guests + extraTransport;

    const hotelIncluded = type !== "seat";

    const needsQuotation =
      type === "fly" ||
      region !== "nigeria" ||
      (
        hotelIncluded &&
        hotel !== "3star"
      ) ||
      (
        hotelIncluded &&
        room !== "sharing"
      ) ||
      (
        hotelIncluded &&
        nights !== 2
      ) ||
      transfer === "road";

    const amountElement =
      $("#summaryAmount");

    const typeElement =
      $("#summaryType");

    const detailsElement =
      $("#summaryDetails");

    if (amountElement) {
      amountElement.textContent =
        money(total);
    }

    if (typeElement) {
      typeElement.textContent =
        `${packageNames[type]} · ${guests} guest${guests > 1 ? "s" : ""}`;
    }

    // Use safe DOM creation.
    // Do not inject untrusted user input
    // through innerHTML.

    if (detailsElement) {
      detailsElement.replaceChildren();

      function addDetail(label, content) {
        const paragraph =
          document.createElement("p");

        const strong =
          document.createElement("strong");

        strong.textContent =
          `${label}: `;

        paragraph.append(
          strong,
          document.createTextNode(content)
        );

        detailsElement.append(paragraph);
      }

      addDetail(
        "Starting package",
        `${money(startingRate)} × ${guests}`
      );

      addDetail(
        "Optional transport",
        money(extraTransport)
      );

      addDetail(
        "Hotel nights",
        hotelIncluded
          ? String(nights)
          : "Not included"
      );

      const heading =
        document.createElement("p");

      heading.textContent =
        "Package inclusions:";

      detailsElement.append(heading);

      const list =
        document.createElement("ul");

      inclusions[type].forEach(item => {
        const li =
          document.createElement("li");

        li.textContent = item;
        list.append(li);
      });

      detailsElement.append(list);

      const message =
        document.createElement("p");

      message.textContent = needsQuotation
        ? "Additional supplier quotation is required. This amount is not a confirmed final price."
        : "Indicative starting total, subject to availability and confirmation.";

      detailsElement.append(message);
    }

    enquiryText = [
      "SEE AFRICA — CALABAR BOOKING ENQUIRY",
      "",
      `Name: ${value("fullName")}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email")}`,
      `Travelling from: ${region}`,
      `Package: ${packageNames[type]}`,
      `Carnival date: ${value("carnivalDate")}`,
      `Departure city/airport: ${value("departureAirport") || "Not supplied"}`,
      `Number of guests: ${guests}`,
      `Hotel: ${hotelIncluded ? hotel : "Not included"}`,
      `Room: ${hotelIncluded ? room : "Not included"}`,
      `Hotel nights: ${hotelIncluded ? nights : "Not included"}`,
      `Arrival date: ${value("arrivalDate") || "Not supplied"}`,
      `Departure date: ${value("departureDate") || "Not supplied"}`,
      `Dietary needs: ${value("dietary") || "None supplied"}`,
      `Optional transport: ${transfer}`,
      "",
      `Indicative starting total: ${money(total)}`,
      needsQuotation
        ? "Additional supplier quotation required."
        : "Subject to final availability and confirmation.",
      "",
      "This is an enquiry, not a confirmed booking."
    ].join("\n");

    if (copyButton) {
      copyButton.disabled = true;
    }

    const copyStatus = $("#copyStatus");
    if (copyStatus) {
      copyStatus.textContent = "";
    }

    return total;
  }

  // ========================================
  // LIVE CALCULATION
  // ========================================

  bookingForm
    ?.querySelectorAll("input,select")
    .forEach(field => {
      field.addEventListener(
        "input",
        updateSummary
      );

      field.addEventListener(
        "change",
        updateSummary
      );
    });

  // ========================================
  // FORM VALIDATION
  // ========================================

  bookingForm?.addEventListener(
    "submit",
    event => {
      event.preventDefault();

      if (!bookingForm.reportValidity()) {
        return;
      }

      const arrival = value("arrivalDate");
      const departure = value("departureDate");
      const carnivalDate = value("carnivalDate");

      if (
        arrival &&
        departure &&
        departure <= arrival
      ) {
        alert(
          "Your departure date must be after your arrival date."
        );

        return;
      }

      if (
        arrival &&
        carnivalDate &&
        carnivalDate < arrival
      ) {
        alert(
          "Your selected Carnival date must not be before your arrival date."
        );

        return;
      }

      if (
        departure &&
        carnivalDate &&
        carnivalDate >= departure
      ) {
        alert(
          "Your selected Carnival date must be before your departure date."
        );

        return;
      }

      const flightRequired =
        value("packageType") === "fly" ||
        value("originRegion") !== "nigeria";

      if (
        flightRequired &&
        !value("departureAirport")
      ) {
        alert(
          "Please enter your departure airport or city."
        );

        $("#departureAirport")?.focus();
        return;
      }

      updateSummary();

      if (copyButton) {
        copyButton.disabled = false;
      }

      if ($("#copyStatus")) {
        $("#copyStatus").textContent =
          "Your indicative estimate is ready. Copy your enquiry to share with the booking team.";
      }

      $("#bookingSummary")?.scrollIntoView({
        behavior: smooth,
        block: "center"
      });
    }
  );

  // ========================================
  // COPY BOOKING ENQUIRY
  // ========================================

  copyButton?.addEventListener(
    "click",
    async () => {
      if (!enquiryText) return;

      const status = $("#copyStatus");

      try {
        await navigator.clipboard.writeText(
          enquiryText
        );

        if (status) {
          status.textContent =
            "Booking enquiry copied successfully.";
        }
      } catch {
        const textarea =
          document.createElement("textarea");

        textarea.value = enquiryText;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.append(textarea);
        textarea.select();

        let copied = false;

        try {
          copied =
            document.execCommand("copy");
        } catch {
          copied = false;
        }

        textarea.remove();

        if (status) {
          status.textContent = copied
            ? "Booking enquiry copied."
            : "Copying was unsuccessful. Please use HTTPS.";
        }
      }
    }
  );

  // ========================================
  // INITIALIZE
  // ========================================

  renderJourney(0);
  updateSummary();

});
