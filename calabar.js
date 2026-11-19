
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ======================================
  // GLOBAL HELPERS
  // ======================================

  const $ = selector =>
    document.querySelector(selector);

  const $$ = selector =>
    [...document.querySelectorAll(selector)];

  // Only the eight NEW images are used
  // outside the hero.
  const imagePath = number =>
    `images/new-calabar${number}.png`;

  const money = amount =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0
    }).format(amount);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const scrollToBooking = () => {
    $("#booking")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth"
    });
  };

  // ======================================
  // IMAGE ERROR HANDLING
  // ======================================

  function installImageErrorHandler(image) {
    image.addEventListener("error", () => {
      if (image.dataset.failed === "true") return;

      image.dataset.failed = "true";

      if (
        image.closest(".brand-logos") ||
        image.closest(".footer-logos")
      ) {
        const label = document.createElement("strong");
        label.textContent = image.alt || "Logo";
        label.style.color = "white";
        label.style.fontSize = "11px";

        image.replaceWith(label);
        return;
      }

      // Keep layout in place when an image fails.
      image.style.opacity = "0.2";
      image.title = `Image unavailable: ${image.src}`;

      console.warn(
        "Calabar image could not load:",
        image.src
      );
    });
  }

  $$("img").forEach(installImageErrorHandler);

  // ======================================
  // MOBILE NAVIGATION
  // ======================================

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

    const isOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuButton.textContent = isOpen ? "×" : "☰";
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

  // ======================================
  // ORIGINAL HERO VIDEO
  // ======================================

  const heroVideo = $("#heroVideo");
  const soundToggle = $("#soundToggle");

  if (heroVideo) {
    heroVideo.muted = true;

    heroVideo.play().catch(() => {
      // The original hero poster remains visible
      // when automatic video playback is blocked.
    });

    heroVideo.addEventListener("error", () => {
      heroVideo.style.display = "none";
    });
  }

  soundToggle?.addEventListener("click", () => {
    if (!heroVideo) return;

    heroVideo.muted = !heroVideo.muted;

    const soundEnabled = !heroVideo.muted;

    soundToggle.textContent = soundEnabled
      ? "♫ Mute Sound"
      : "♫ Enable Sound";

    soundToggle.setAttribute(
      "aria-pressed",
      String(soundEnabled)
    );

    if (heroVideo.paused) {
      heroVideo.play().catch(() => {});
    }
  });

  // ======================================
  // INTERACTIVE PACKAGE JOURNEY
  // ======================================

  const journey = [
    {
      title: "Choose your seat",
      description:
        "Secure your verified hospitality access.",
      image: 1
    },
    {
      title: "Add your stay",
      description:
        "Choose your hotel class and number of nights.",
      image: 2
    },
    {
      title: "Add your discovery",
      description:
        "Explore Tinapa and Kwa Falls with scheduled transport and a host or guide allowance.",
      image: 3
    },
    {
      title: "Add your flight",
      description:
        "Select your origin airport and request a flight-inclusive total.",
      image: 4
    },
    {
      title: "Arrive and answer the beat",
      description:
        "Your itinerary, guest support and event-day guidance are arranged around you.",
      image: 5
    }
  ];

  let journeyIndex = 0;

  const journeyImage = $("#journeyImage");
  const journeyTitle = $("#journeyTitle");
  const journeyDescription = $("#journeyDescription");
  const journeyNumber = $("#journeyNumber");

  function renderJourney(index) {
    journeyIndex =
      (index + journey.length) % journey.length;

    const current = journey[journeyIndex];

    if (journeyImage) {
      journeyImage.src = imagePath(current.image);

      journeyImage.alt =
        `Calabar journey: ${current.title}`;

      journeyImage.dataset.failed = "false";
      journeyImage.style.opacity = "";
    }

    if (journeyTitle) {
      journeyTitle.textContent = current.title;
    }

    if (journeyDescription) {
      journeyDescription.textContent =
        current.description;
    }

    if (journeyNumber) {
      journeyNumber.textContent =
        `STEP ${String(journeyIndex + 1).padStart(2, "0")} / 05`;
    }

    $$(".journey-step").forEach((button, i) => {
      const active = i === journeyIndex;

      button.classList.toggle("active", active);

      button.setAttribute(
        "aria-pressed",
        String(active)
      );
    });
  }

  $$(".journey-step").forEach(button => {
    button.addEventListener("click", () => {
      renderJourney(Number(button.dataset.step));
    });
  });

  $("#nextJourney")?.addEventListener("click", () => {
    renderJourney(journeyIndex + 1);
  });

  // ======================================
  // ALL EIGHT CARNIVAL PHOTOS
  // ======================================

  const galleryTrack = $("#galleryTrack");

  const galleryTitles = [
    "Carnival Moment 01",
    "Carnival Moment 02",
    "Carnival Moment 03",
    "Carnival Moment 04",
    "Carnival Moment 05",
    "Carnival Moment 06",
    "Carnival Moment 07",
    "Carnival Moment 08"
  ];

  for (let i = 1; i <= 8; i++) {
    if (!galleryTrack) break;

    const button = document.createElement("button");

    button.type = "button";
    button.className = "gallery-card";

    button.setAttribute(
      "aria-label",
      `View photograph ${i}`
    );

    const image = document.createElement("img");

    image.src = imagePath(i);
    image.alt = `Calabar Carnival photograph ${i}`;
    image.loading = "lazy";
    image.decoding = "async";

    installImageErrorHandler(image);

    const caption = document.createElement("span");

    caption.textContent =
      `${String(i).padStart(2, "0")} / ${galleryTitles[i - 1]}`;

    button.append(image, caption);

    button.addEventListener("click", () => {
      openLightbox(i - 1, button);
    });

    galleryTrack.append(button);
  }

  // ======================================
  // GALLERY SCROLL BUTTONS
  // ======================================

  function scrollGallery(direction) {
    if (!galleryTrack) return;

    galleryTrack.scrollBy({
      left: direction * galleryTrack.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }

  $("#galleryPrev")?.addEventListener("click", () => {
    scrollGallery(-1);
  });

  $("#galleryNext")?.addEventListener("click", () => {
    scrollGallery(1);
  });

  // ======================================
  // FULLSCREEN IMAGE VIEWER
  // ======================================

  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCounter = $("#lightboxCounter");

  let selectedImage = 0;
  let previousFocus = null;

  function showLightboxImage() {
    if (!lightboxImage) return;

    lightboxImage.src = imagePath(selectedImage + 1);

    lightboxImage.alt =
      `Calabar Carnival photograph ${selectedImage + 1}`;

    lightboxImage.dataset.failed = "false";
    lightboxImage.style.opacity = "";

    if (lightboxCounter) {
      lightboxCounter.textContent =
        `${selectedImage + 1} / 8`;
    }
  }

  function openLightbox(index, button) {
    if (!lightbox) return;

    selectedImage = index;
    previousFocus = button;

    showLightboxImage();

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    $("#lightboxClose")?.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    previousFocus?.focus();
  }

  function changeLightboxImage(direction) {
    selectedImage =
      (selectedImage + direction + 8) % 8;

    showLightboxImage();
  }

  $("#lightboxClose")?.addEventListener(
    "click",
    closeLightbox
  );

  $("#lightboxPrev")?.addEventListener("click", () => {
    changeLightboxImage(-1);
  });

  $("#lightboxNext")?.addEventListener("click", () => {
    changeLightboxImage(1);
  });

  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (
      !lightbox ||
      lightbox.getAttribute("aria-hidden") === "true"
    ) return;

    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      changeLightboxImage(-1);
      return;
    }

    if (event.key === "ArrowRight") {
      changeLightboxImage(1);
      return;
    }

    // Keep keyboard navigation inside the dialog.
    if (event.key === "Tab") {
      const controls = [
        $("#lightboxClose"),
        $("#lightboxPrev"),
        $("#lightboxNext")
      ].filter(Boolean);

      const index = controls.indexOf(
        document.activeElement
      );

      const direction = event.shiftKey ? -1 : 1;

      const next =
        (index + direction + controls.length)
        % controls.length;

      event.preventDefault();
      controls[next]?.focus();
    }
  });

  // ======================================
  // PACKAGE SELECTION
  // ======================================

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
      choosePackage(button.dataset.package || "seat");
    });
  });

  $$(".regional-booking").forEach(button => {
    button.addEventListener("click", () => {
      if (regionSelect) {
        regionSelect.value = button.dataset.origin;
      }

      choosePackage("fly");
    });
  });

  // ======================================
  // BOOKING CALCULATOR
  // ======================================

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
      "Verified hospitality access",
      "Event-day meal and refreshments",
      "Guest check-in and seat guidance",
      "Event-day support"
    ],
    stay: [
      "Hospitality access",
      "Selected hotel with breakfast",
      "Two hotel nights",
      "Carnival-day return transfer"
    ],
    explore: [
      "Hospitality access and selected hotel",
      "Tinapa Free Zone & Resort",
      "Kwa Falls",
      "Scheduled transport and guide allowance"
    ],
    fly: [
      "Hospitality and selected hotel",
      "Tinapa and Kwa Falls",
      "Specified airport and local transfers",
      "Return flight subject to supplier quotation"
    ]
  };

  const bookingForm = $("#bookingForm");
  const copyButton = $("#copyEnquiry");

  let enquiryText = "";

  function value(id) {
    return $(`#${id}`)?.value?.trim() || "";
  }

  function updateSummary() {
    const type = value("packageType") || "seat";
    const region = value("originRegion") || "nigeria";

    const guests = Math.max(
      1,
      Math.min(
        50,
        Number(value("guestCount")) || 1
      )
    );

    const hotel = value("hotelClass");
    const room = value("roomPreference");
    const nights = Number(value("hotelNights")) || 2;
    const transfer = value("transfer");

    const startingRate = basePrices[type] || 150000;

    let extraTransport = 0;

    // Calculate only published transport prices.

    if (transfer === "shared") {
      extraTransport = 50000 * guests;
    }

    if (transfer === "private") {
      extraTransport =
        120000 * Math.ceil(guests / 3);
    }

    if (transfer === "tour") {
      extraTransport = 180000;
    }

    const total =
      startingRate * guests + extraTransport;

    const hotelIncluded = type !== "seat";

    const needsQuotation =
      type === "fly" ||
      region !== "nigeria" ||
      (hotelIncluded && hotel !== "3star") ||
      (hotelIncluded && room !== "sharing") ||
      (hotelIncluded && nights !== 2) ||
      transfer === "road";

    const amountElement = $("#summaryAmount");
    const typeElement = $("#summaryType");
    const detailsElement = $("#summaryDetails");

    if (amountElement) {
      amountElement.textContent = money(total);
    }

    if (typeElement) {
      typeElement.textContent =
        `${packageNames[type]} · ${guests} guest${guests > 1 ? "s" : ""}`;
    }

    const items = inclusions[type]
      .map(item => `<li>${item}</li>`)
      .join("");

    if (detailsElement) {
      detailsElement.innerHTML = `
        <p>
          <strong>Starting package:</strong>
          ${money(startingRate)} × ${guests}
        </p>

        <p>
          <strong>Optional transport:</strong>
          ${money(extraTransport)}
        </p>

        <p>
          <strong>Hotel nights:</strong>
          ${hotelIncluded ? nights : "Not included"}
        </p>

        <p><strong>Package inclusions:</strong></p>

        <ul>${items}</ul>

        <p>
          ${
            needsQuotation
              ? "Additional supplier quotation required. This amount is not a confirmed final price."
              : "Indicative starting total, subject to inventory and confirmation."
          }
        </p>
      `;
    }

    enquiryText = [
      "SEE AFRICA — CALABAR BOOKING ENQUIRY",
      "",
      `Name: ${value("fullName")}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email")}`,
      `Travelling from: ${region}`,
      `Package: ${packageNames[type]}`,
      `Preferred Carnival date: ${value("carnivalDate")}`,
      `Departure airport/city: ${value("departureAirport") || "Not supplied"}`,
      `Number of guests: ${guests}`,
      `Hotel preference: ${hotelIncluded ? hotel : "Not included"}`,
      `Room preference: ${hotelIncluded ? room : "Not included"}`,
      `Hotel nights: ${hotelIncluded ? nights : "Not included"}`,
      `Arrival date: ${value("arrivalDate") || "Not supplied"}`,
      `Departure date: ${value("departureDate") || "Not supplied"}`,
      `Dietary requirements: ${value("dietary") || "None supplied"}`,
      `Optional transport: ${transfer}`,
      "",
      `Indicative starting total: ${money(total)}`,
      needsQuotation
        ? "Further supplier quotation required."
        : "Subject to final availability and confirmation.",
      "",
      "This is an enquiry, not a confirmed reservation."
    ].join("\n");

    return total;
  }

  // ======================================
  // LIVE FORM CALCULATION
  // ======================================

  bookingForm
    ?.querySelectorAll("input,select")
    .forEach(field => {
      field.addEventListener(
        "change",
        updateSummary
      );

      field.addEventListener(
        "input",
        updateSummary
      );
    });

  // ======================================
  // FORM VALIDATION AND RESULTS
  // ======================================

  bookingForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) {
      return;
    }

    const arrival = value("arrivalDate");
    const departure = value("departureDate");

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

    // Validate flight origin when a flight is needed.

    if (
      (
        value("packageType") === "fly" ||
        value("originRegion") !== "nigeria"
      ) &&
      !value("departureAirport")
    ) {
      alert(
        "Please enter your departure city or airport."
      );

      $("#departureAirport")?.focus();
      return;
    }

    updateSummary();

    if (copyButton) {
      copyButton.disabled = false;
    }

    const status = $("#copyStatus");

    if (status) {
      status.textContent =
        "Your estimate is ready. Copy your booking enquiry to share with the booking team.";
    }

    $("#bookingSummary")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center"
    });
  });

  // ======================================
  // COPY BOOKING ENQUIRY
  // ======================================

  copyButton?.addEventListener("click", async () => {
    if (!enquiryText) return;

    const status = $("#copyStatus");

    try {
      await navigator.clipboard.writeText(enquiryText);

      if (status) {
        status.textContent =
          "Booking enquiry copied successfully.";
      }
    } catch (error) {
      // Fallback for browsers without clipboard API.

      const textarea = document.createElement("textarea");

      textarea.value = enquiryText;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.append(textarea);
      textarea.select();

      let copied = false;

      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }

      textarea.remove();

      if (status) {
        status.textContent = copied
          ? "Booking enquiry copied."
          : "Copying was unsuccessful. Please try using HTTPS.";
      }
    }
  });

  // ======================================
  // INITIALIZE
  // ======================================

  renderJourney(0);
  updateSummary();

});
