
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ========================================
  // SEE AFRICA × FIRSTBANK
  // CALABAR CARNIVAL 2026
  // 19 UNIQUE FESTIVAL IMAGES
  // ========================================

  const $ = selector =>
    document.querySelector(selector);

  const $$ = selector =>
    [...document.querySelectorAll(selector)];

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

  const smooth = reduceMotion ? "auto" : "smooth";

  function scrollToBooking() {
    $("#booking")?.scrollIntoView({
      behavior: smooth,
      block: "start"
    });
  }

  // ========================================
  // UNIQUE IMAGE REGISTRY
  // ========================================

  // All 19 photos are assigned exactly once.
  // The gallery uses only photos 15–19.
  // The hero retains its original media.

  const imageAssignments = [
    {
      selector: ".theme-section .photo-frame img",
      number: 1,
      alt: "Calabar Carnival cultural celebration"
    },
    {
      selector: ".story-row:nth-of-type(1) .story-images img:nth-child(1)",
      number: 2,
      alt: "The culture of Carnival Calabar"
    },
    {
      selector: ".story-row:nth-of-type(1) .story-images img:nth-child(2)",
      number: 3,
      alt: "Calabar Carnival performers"
    },
    {
      selector: ".story-row:nth-of-type(2) .story-images img:nth-child(1)",
      number: 4,
      alt: "Carnival street celebration"
    },
    {
      selector: ".story-row:nth-of-type(2) .story-images img:nth-child(2)",
      number: 5,
      alt: "The energy of Carnival Calabar"
    },
    {
      selector: ".story-row:nth-of-type(3) .story-images img:nth-child(1)",
      number: 6,
      alt: "Carnival performers and celebration"
    },
    {
      selector: ".story-row:nth-of-type(3) .story-images img:nth-child(2)",
      number: 7,
      alt: "The people of Calabar Carnival"
    },
    {
      selector: ".sponsor-section .sponsor-photo img",
      number: 8,
      alt: "FirstBank sponsored Carnival experience"
    },
    {
      selector: ".hospitality-section .photo-frame img",
      number: 9,
      alt: "Calabar hospitality atmosphere"
    },
    {
      selector: ".package-card:nth-child(1) .package-image img",
      number: 10,
      alt: "Seat Only Carnival experience"
    },
    {
      selector: ".package-card:nth-child(2) .package-image img",
      number: 11,
      alt: "Calabar Carnival Stay package"
    },
    {
      selector: ".package-card:nth-child(3) .package-image img",
      number: 12,
      alt: "Calabar Explore package"
    },
    {
      selector: ".package-card:nth-child(4) .package-image img",
      number: 13,
      alt: "Fly and Explore Calabar package"
    },
    {
      selector: ".urgency-section .photo-frame img",
      number: 14,
      alt: "Calabar Carnival unforgettable experience"
    }
  ];

  // ========================================
  // IMAGE ERROR HANDLING
  // ========================================

  function installImageHandler(image) {
    if (!image || image.dataset.handlerInstalled) {
      return;
    }

    image.dataset.handlerInstalled = "true";

    image.addEventListener("error", () => {
      if (image.dataset.failed === "true") return;

      image.dataset.failed = "true";

      console.warn(
        "Image failed to load:",
        image.src
      );

      if (
        image.closest(".brand-logos") ||
        image.closest(".footer-logos")
      ) {
        const replacement = document.createElement(
          "strong"
        );

        replacement.textContent =
          image.alt || "Brand Logo";

        replacement.style.color = "#ffffff";
        replacement.style.fontSize = "11px";

        image.replaceWith(replacement);
        return;
      }

      image.style.opacity = "0.25";
      image.title = `Image unavailable: ${image.src}`;
    });
  }

  $$("img").forEach(installImageHandler);

  // ========================================
  // APPLY ALL UNIQUE STATIC IMAGES
  // ========================================

  // Locate storyline images by actual row order.
  // This avoids relying on complex nth-of-type
  // selectors when sections contain other tags.

  const storyRows = $$(".story-row");

  const storyNumbers = [
    [2, 3],
    [4, 5],
    [6, 7]
  ];

  storyRows.forEach((row, rowIndex) => {
    if (rowIndex >= storyNumbers.length) return;

    const images = $$(".story-row")[rowIndex]
      .querySelectorAll(".story-images img");

    images.forEach((image, imageIndex) => {
      const number =
        storyNumbers[rowIndex][imageIndex];

      if (!number) return;

      image.src = imagePath(number);
      image.alt =
        `Calabar Carnival moment ${number}`;
      image.loading = "lazy";
      image.decoding = "async";
      image.dataset.failed = "false";
      image.style.opacity = "";
    });
  });

  // Apply every image outside the story rows.

  imageAssignments
    .filter(item => !item.selector.includes(".story-row"))
    .forEach(item => {
      const image = $(item.selector);

      if (!image) {
        console.warn(
          "Section image not found:",
          item.selector
        );
        return;
      }

      image.src = imagePath(item.number);
      image.alt = item.alt;
      image.loading = "lazy";
      image.decoding = "async";
      image.dataset.failed = "false";
      image.style.opacity = "";
    });

  // ========================================
  // INTERACTIVE JOURNEY — NO REPEATED IMAGE
  // ========================================

  const journeyFeature = $(".journey-feature");
  const journeyImage = $("#journeyImage");

  // A visual gradient replaces the old changing
  // journey picture. This prevents photo reuse.

  if (journeyImage) {
    journeyImage.remove();
  }

  if (journeyFeature) {
    journeyFeature.style.background = `
      radial-gradient(
        circle at 80% 20%,
        rgba(241,197,65,0.23),
        transparent 42%
      ),
      linear-gradient(
        135deg,
        #0c407b,
        #041a33 75%
      )
    `;
  }

  const journey = [
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
        "Select your origin airport and request a flight-inclusive total."
    },
    {
      title: "Arrive and answer the beat",
      description:
        "Your itinerary, guest support and event-day guidance are arranged around you."
    }
  ];

  let journeyIndex = 0;

  function renderJourney(index) {
    journeyIndex =
      (index + journey.length) % journey.length;

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

    $$(".journey-step").forEach((button, i) => {
      const active = i === journeyIndex;

      button.classList.toggle("active", active);
      button.setAttribute(
        "aria-pressed",
        String(active)
      );
    });
  }

  $$(".journey-step").forEach((button, index) => {
    button.addEventListener("click", () => {
      renderJourney(index);
    });
  });

  $("#nextJourney")?.addEventListener("click", () => {
    renderJourney(journeyIndex + 1);
  });

  // ========================================
  // MOBILE MENU
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
    menuButton.textContent = "☰";
  }

  menuButton?.addEventListener("click", () => {
    if (!navLinks) return;

    const open = navLinks.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuButton.textContent = open ? "×" : "☰";
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
  // HERO VIDEO — REMAINS UNCHANGED
  // ========================================

  const heroVideo = $("#heroVideo");
  const soundToggle = $("#soundToggle");

  if (heroVideo) {
    heroVideo.muted = true;

    heroVideo.play().catch(() => {
      // Existing hero poster stays visible.
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
  // GALLERY — ONLY IMAGES 15 TO 19
  // ========================================

  const galleryTrack = $("#galleryTrack");

  const galleryImages = [
    {
      number: 15,
      title: "THE CELEBRATION"
    },
    {
      number: 16,
      title: "THE COLOUR"
    },
    {
      number: 17,
      title: "THE ENERGY"
    },
    {
      number: 18,
      title: "THE PEOPLE"
    },
    {
      number: 19,
      title: "THE MEMORIES"
    }
  ];

  if (galleryTrack) {
    galleryTrack.innerHTML = "";

    galleryImages.forEach((item, index) => {
      const button = document.createElement(
        "button"
      );

      button.type = "button";
      button.className = "gallery-card";

      button.setAttribute(
        "aria-label",
        `View Carnival photograph ${item.number}`
      );

      const image = document.createElement("img");

      image.src = imagePath(item.number);
      image.alt =
        `Calabar Carnival photograph ${item.number}`;
      image.loading = "lazy";
      image.decoding = "async";

      installImageHandler(image);

      const caption = document.createElement("span");

      caption.textContent =
        `${String(index + 1).padStart(2, "0")} / ${item.title}`;

      button.append(image, caption);

      button.addEventListener("click", () => {
        openLightbox(index, button);
      });

      galleryTrack.append(button);
    });
  }

  // ========================================
  // GALLERY NAVIGATION
  // ========================================

  function scrollGallery(direction) {
    if (!galleryTrack) return;

    galleryTrack.scrollBy({
      left:
        direction * galleryTrack.clientWidth * 0.8,
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
  // FULLSCREEN GALLERY VIEWER
  // ========================================

  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCounter = $("#lightboxCounter");

  let selectedImage = 0;
  let previousFocus = null;

  function showLightboxImage() {
    const item = galleryImages[selectedImage];

    if (!item || !lightboxImage) return;

    lightboxImage.src = imagePath(item.number);
    lightboxImage.alt =
      `Calabar Carnival photograph ${item.number}`;

    lightboxImage.dataset.failed = "false";
    lightboxImage.style.opacity = "";

    if (lightboxCounter) {
      lightboxCounter.textContent =
        `${selectedImage + 1} / ${galleryImages.length}`;
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

    document.body.style.overflow = "hidden";

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
    selectedImage =
      (
        selectedImage +
        direction +
        galleryImages.length
      ) % galleryImages.length;

    showLightboxImage();
  }

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

  document.addEventListener("keydown", event => {
    if (
      !lightbox ||
      lightbox.getAttribute("aria-hidden") === "true"
    ) {
      return;
    }

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

      const direction = event.shiftKey ? -1 : 1;

      const next =
        (index + direction + controls.length)
        % controls.length;

      event.preventDefault();
      controls[next]?.focus();
    }
  });

  // ========================================
  // PACKAGE SELECTION
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

    const nights =
      Number(value("hotelNights")) || 2;

    const transfer = value("transfer");

    const startingRate =
      basePrices[type] || 150000;

    let extraTransport = 0;

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

    if ($("#summaryAmount")) {
      $("#summaryAmount").textContent =
        money(total);
    }

    if ($("#summaryType")) {
      $("#summaryType").textContent =
        `${packageNames[type]} · ${guests} guest${guests > 1 ? "s" : ""}`;
    }

    const details = $("#summaryDetails");

    if (details) {
      details.replaceChildren();

      const addParagraph = (label, answer) => {
        const paragraph = document.createElement("p");
        const strong = document.createElement("strong");

        strong.textContent = `${label}: `;
        paragraph.append(strong, answer);
        details.append(paragraph);
      };

      addParagraph(
        "Starting package",
        `${money(startingRate)} × ${guests}`
      );

      addParagraph(
        "Optional transport",
        money(extraTransport)
      );

      addParagraph(
        "Hotel nights",
        hotelIncluded ? String(nights) : "Not included"
      );

      const heading = document.createElement("p");
      heading.textContent = "Package inclusions:";
      details.append(heading);

      const list = document.createElement("ul");

      inclusions[type].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.append(li);
      });

      details.append(list);

      const message = document.createElement("p");

      message.textContent = needsQuotation
        ? "Additional supplier quotation is required. This is not a confirmed final price."
        : "Indicative starting total, subject to availability and confirmation.";

      details.append(message);
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
        ? "Additional supplier quotation required."
        : "Subject to final availability and confirmation.",
      "",
      "This is an enquiry, not a confirmed reservation."
    ].join("\n");

    // Recalculate before allowing a new copy.
    if (copyButton) {
      copyButton.disabled = true;
    }

    return total;
  }

  // ========================================
  // LIVE CALCULATIONS
  // ========================================

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

      const flightNeeded =
        value("packageType") === "fly" ||
        value("originRegion") !== "nigeria";

      if (
        flightNeeded &&
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
          "Your estimate is ready. Copy your enquiry to share with the booking team.";
      }

      $("#bookingSummary")?.scrollIntoView({
        behavior: smooth,
        block: "center"
      });
    }
  );

  // ========================================
  // COPY ENQUIRY
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
          copied = document.execCommand("copy");
        } catch {
          copied = false;
        }

        textarea.remove();

        if (status) {
          status.textContent = copied
            ? "Booking enquiry copied."
            : "Copying failed. Please use HTTPS.";
        }
      }
    }
  );

  // ========================================
  // INITIALIZE
  // ========================================

  renderJourney(0);
  updateSummary();

  console.info(
    "See Africa Calabar: 19 unique festival photos configured."
  );
});
