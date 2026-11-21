
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ========================================
  // CALABAR CARNIVAL 2026
  // SEE AFRICA × FIRSTBANK
  // ========================================

  const $ = selector =>
    document.querySelector(selector);

  const $$ = selector =>
    [...document.querySelectorAll(selector)];

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const scrollBehavior = reduceMotion
    ? "auto"
    : "smooth";

  const money = amount =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0
    }).format(amount);

  function scrollToBooking() {
    $("#booking")?.scrollIntoView({
      behavior: scrollBehavior,
      block: "start"
    });
  }

  // ========================================
  // IMAGE LOADING
  // ========================================

  // All 19 festival images appear once
  // in the main page HTML.
  //
  // Order:
  // 12 through 19, then 1 through 11.
  //
  // The lightbox only displays a selected
  // gallery photo when a visitor opens it.

  const expectedImages = [
    ...Array.from({ length: 8 }, (_, i) => i + 12),
    ...Array.from({ length: 11 }, (_, i) => i + 1)
  ];

  const carnivalImages = $$(
    'main img[src*="new-calabar"]'
  );

  const actualImages = carnivalImages.map(image => {
    const match = (
      image.getAttribute("src") || ""
    ).match(/new-calabar(\d+)\.(?:png|webp)$/);

    return match ? Number(match[1]) : null;
  });

  const imagesValid =
    actualImages.length === 19 &&
    actualImages.every(
      (number, index) =>
        number === expectedImages[index]
    );

  if (!imagesValid) {
    console.warn(
      "Check Carnival image allocation:",
      actualImages
    );
  }

  $$("img").forEach(image => {
    image.addEventListener("error", () => {
      if (image.dataset.failed) return;
      image.dataset.failed = "true";

      console.warn(
        "Image unavailable:",
        image.getAttribute("src")
      );

      image.classList.add("image-error");
    });
  });

  // ========================================
  // RESPONSIVE NAVIGATION
  // ========================================

  const menuButton = $("#menuButton");
  const mobileMenu = $("#mobileMenu");

  function setMenu(open) {
    if (!menuButton || !mobileMenu) return;

    mobileMenu.classList.toggle("open", open);
    mobileMenu.inert = !open;

    menuButton.classList.toggle("active", open);

    menuButton.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );

    document.body.classList.toggle(
      "menu-open",
      open
    );
  }

  menuButton?.addEventListener("click", () => {
    setMenu(
      !mobileMenu.classList.contains("open")
    );
  });

  $$("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
      setMenu(false);
    });
  });

  document.addEventListener("click", event => {
    if (
      mobileMenu?.classList.contains("open") &&
      !event.target.closest(".site-header")
    ) {
      setMenu(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1150) {
      setMenu(false);
    }
  });

  // ========================================
  // HERO VIDEO
  // ========================================

  const heroVideo = $("#heroVideo");
  const soundToggle = $("#soundToggle");

  if (heroVideo) {
    heroVideo.muted = true;

    const playback = heroVideo.play();

    if (playback?.catch) {
      playback.catch(() => {
        // Original image poster stays visible.
      });
    }

    heroVideo.addEventListener("error", () => {
      heroVideo.style.display = "none";
    });
  }

  soundToggle?.addEventListener("click", () => {
    if (!heroVideo) return;

    heroVideo.muted = !heroVideo.muted;

    const enabled = !heroVideo.muted;

    soundToggle.textContent = enabled
      ? "Mute Sound"
      : "Enable Sound";

    soundToggle.setAttribute(
      "aria-pressed",
      String(enabled)
    );

    if (heroVideo.paused) {
      heroVideo.play().catch(() => {});
    }
  });

  // Pause video when the whole hero
  // leaves the viewport to reduce work
  // on mobile devices.

  if (
    heroVideo &&
    "IntersectionObserver" in window
  ) {
    const videoObserver = new IntersectionObserver(
      entries => {
        const visible = entries[0]?.isIntersecting;

        if (!visible) {
          heroVideo.pause();
        } else if (document.visibilityState === "visible") {
          heroVideo.play().catch(() => {});
        }
      },
      { threshold: 0.05 }
    );

    videoObserver.observe($("#home"));
  }

  // ========================================
  // SCROLL REVEAL
  // ========================================

  const revealItems = $$(".reveal");

  if (
    "IntersectionObserver" in window &&
    !reduceMotion
  ) {
    document.body.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.07,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    revealItems.forEach(item => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(item => {
      item.classList.add("visible");
    });
  }

  // ========================================
  // INTERACTIVE FIVE-STEP JOURNEY
  // ========================================

  const journey = [
    {
      title: "Choose your seat",
      description:
        "Secure your verified hospitality access for your selected Carnival event day."
    },
    {
      title: "Add your stay",
      description:
        "Choose your hotel class, room preference and number of nights."
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
        "Your itinerary, guest support and event-day guidance are coordinated around your experience."
    }
  ];

  let journeyIndex = 0;

  function renderJourney(index) {
    journeyIndex =
      (index + journey.length) % journey.length;

    const current = journey[journeyIndex];

    const title = $("#journeyTitle");
    const description = $("#journeyDescription");
    const number = $("#journeyNumber");

    if (title) {
      title.textContent = current.title;
    }

    if (description) {
      description.textContent = current.description;
    }

    if (number) {
      number.textContent =
        `STEP ${String(journeyIndex + 1).padStart(2, "0")} OF 05`;
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
      renderJourney(
        Number(button.dataset.step)
      );
    });
  });

  $("#nextJourney")?.addEventListener("click", () => {
    renderJourney(journeyIndex + 1);
  });

  // ========================================
  // GALLERY SCROLLING
  // ========================================

  const galleryTrack = $("#galleryTrack");
  const galleryCards = $$(".gallery-card");

  function scrollGallery(direction) {
    if (!galleryTrack) return;

    const card = galleryCards[0];

    const width = card
      ? card.getBoundingClientRect().width + 15
      : galleryTrack.clientWidth;

    galleryTrack.scrollBy({
      left: direction * width,
      behavior: scrollBehavior
    });
  }

  $("#galleryPrev")?.addEventListener("click", () => {
    scrollGallery(-1);
  });

  $("#galleryNext")?.addEventListener("click", () => {
    scrollGallery(1);
  });

  // ========================================
  // GALLERY LIGHTBOX
  // ========================================

  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCounter = $("#lightboxCounter");

  const galleryItems = galleryCards.map(card => {
    const image = card.querySelector("img");

    return {
      src: image?.getAttribute("src") || "",
      alt: image?.alt || "Carnival photograph"
    };
  });

  let currentImage = 0;
  let previousFocus = null;

  function showLightboxImage() {
    const item = galleryItems[currentImage];

    if (!item || !lightboxImage) return;

    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;

    if (lightboxCounter) {
      lightboxCounter.textContent =
        `${currentImage + 1} OF ${galleryItems.length}`;
    }
  }

  function openLightbox(index, button) {
    if (!lightbox || !galleryItems.length) return;

    currentImage = index;
    previousFocus = button;

    showLightboxImage();

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");

    $("#lightboxClose")?.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");

    if (lightboxImage) {
      lightboxImage.removeAttribute("src");
    }

    previousFocus?.focus();
  }

  function changeLightbox(direction) {
    if (!galleryItems.length) return;

    currentImage =
      (
        currentImage +
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

  $("#lightboxPrev")?.addEventListener("click", () => {
    changeLightbox(-1);
  });

  $("#lightboxNext")?.addEventListener("click", () => {
    changeLightbox(1);
  });

  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // ========================================
  // KEYBOARD ACCESSIBILITY
  // ========================================

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (lightbox && !lightbox.hidden) {
        closeLightbox();
      } else {
        setMenu(false);
      }
      return;
    }

    if (!lightbox || lightbox.hidden) return;

    if (event.key === "ArrowLeft") {
      changeLightbox(-1);
    }

    if (event.key === "ArrowRight") {
      changeLightbox(1);
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

      const step = event.shiftKey ? -1 : 1;

      const next =
        (index + step + controls.length)
        % controls.length;

      event.preventDefault();
      controls[next]?.focus();
    }
  });

  // ========================================
  // PACKAGE CHOOSER
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
        regionSelect.value = button.dataset.origin;
      }

      choosePackage("fly");
    });
  });

  // ========================================
  // BOOKING PRICING
  // ========================================

  const prices = {
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
      "Verified hospitality seat",
      "Event-day meal and refreshments",
      "Guided check-in",
      "Event-day support"
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
      "Scheduled local transport and host allowance"
    ],
    fly: [
      "Hospitality and selected hotel",
      "Tinapa and Kwa Falls",
      "Specified airport and local transfers",
      "Return flight subject to supplier confirmation"
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

    const base = prices[type] || prices.seat;

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
      base * guests + extraTransport;

    const includesHotel = type !== "seat";

    const needsQuotation =
      type === "fly" ||
      region !== "nigeria" ||
      (
        includesHotel &&
        hotel !== "3star"
      ) ||
      (
        includesHotel &&
        room !== "sharing"
      ) ||
      (
        includesHotel &&
        nights !== 2
      ) ||
      transfer === "road";

    const amountElement = $("#summaryAmount");
    const typeElement = $("#summaryType");
    const details = $("#summaryDetails");

    if (amountElement) {
      amountElement.textContent = money(total);
    }

    if (typeElement) {
      typeElement.textContent =
        `${packageNames[type]} · ${guests} guest${guests > 1 ? "s" : ""}`;
    }

    if (details) {
      details.replaceChildren();

      function addDetail(label, content) {
        const paragraph =
          document.createElement("p");

        const strong =
          document.createElement("strong");

        strong.textContent = `${label}: `;

        paragraph.append(
          strong,
          document.createTextNode(content)
        );

        details.append(paragraph);
      }

      addDetail(
        "Starting package",
        `${money(base)} × ${guests}`
      );

      addDetail(
        "Optional transport",
        money(extraTransport)
      );

      addDetail(
        "Hotel nights",
        includesHotel ? String(nights) : "Not included"
      );

      const heading =
        document.createElement("p");

      heading.textContent = "Package inclusions:";

      details.append(heading);

      const list =
        document.createElement("ul");

      inclusions[type].forEach(item => {
        const li =
          document.createElement("li");

        li.textContent = item;
        list.append(li);
      });

      details.append(list);

      const message =
        document.createElement("p");

      message.textContent = needsQuotation
        ? "Additional supplier quotation required. This is not a confirmed final price."
        : "Indicative starting total, subject to confirmation.";

      details.append(message);
    }

    enquiryText = [
      "SEE AFRICA — CALABAR ENQUIRY",
      "",
      `Full name: ${value("fullName")}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email")}`,
      `Travelling from: ${region}`,
      `Package: ${packageNames[type]}`,
      `Carnival date: ${value("carnivalDate")}`,
      `Departure airport/city: ${value("departureAirport") || "Not supplied"}`,
      `Guests: ${guests}`,
      `Hotel preference: ${includesHotel ? hotel : "Not included"}`,
      `Room: ${includesHotel ? room : "Not included"}`,
      `Nights: ${includesHotel ? nights : "Not included"}`,
      `Arrival: ${value("arrivalDate") || "Not supplied"}`,
      `Departure: ${value("departureDate") || "Not supplied"}`,
      `Dietary requirements: ${value("dietary") || "None supplied"}`,
      `Transport: ${transfer}`,
      "",
      `Indicative starting total: ${money(total)}`,
      needsQuotation
        ? "Further supplier quotation required."
        : "Subject to final availability and confirmation.",
      "",
      "This enquiry is not a confirmed reservation."
    ].join("\n");

    if (copyButton) {
      copyButton.disabled = true;
    }

    const status = $("#copyStatus");

    if (status) {
      status.textContent = "";
    }

    return total;
  }

  // ========================================
  // LIVE FORM UPDATES
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
  // BOOKING FORM VALIDATION
  // ========================================

  bookingForm?.addEventListener("submit", async event => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) {
      return;
    }

    const arrival = value("arrivalDate");
    const departure = value("departureDate");
    const carnival = value("carnivalDate");

    if (
      arrival &&
      departure &&
      departure <= arrival
    ) {
      alert(
        "Departure date must be after arrival date."
      );
      return;
    }

    if (
      arrival &&
      carnival &&
      carnival < arrival
    ) {
      alert(
        "Your Carnival date cannot be before arrival."
      );
      return;
    }

    if (
      departure &&
      carnival &&
      carnival >= departure
    ) {
      alert(
        "Your departure must be after the selected Carnival date."
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
        "Please enter your departure city or airport."
      );

      $("#departureAirport")?.focus();
      return;
    }

    updateSummary();
    const status = $("#copyStatus");
    const submit = bookingForm.querySelector('[type="submit"]');
    if (submit) submit.disabled = true;
    if (status) status.textContent = "Saving your booking enquiry securely...";

    try {
      const fields = {
        full_name: value("fullName"), email: value("email"), phone: value("phone"),
        origin_region: value("originRegion"), package_type: value("packageType"),
        carnival_date: value("carnivalDate"), departure_airport: value("departureAirport"),
        number_of_guests: Number(value("guestCount")),
        hotel_class: value("hotelClass"), room_preference: value("roomPreference"),
        hotel_nights: Number(value("hotelNights")), arrival_date: value("arrivalDate"),
        departure_date: value("departureDate"), transfer: value("transfer"),
        dietary: value("dietary")
      };
      const response = await fetch("/api/bookings", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Booking could not be saved.");
      if (status) {
        status.textContent = "Enquiry saved! Your reference: " +
          data.booking_reference +
          ". Our team must confirm availability and payment terms. No payment has been taken.";
      }
      enquiryText += "\\nBooking reference: " + data.booking_reference;
      if (copyButton) copyButton.disabled = false;
      $("#bookingSummary")?.scrollIntoView({ behavior: scrollBehavior, block: "center" });
    } catch (error) {
      if (status) status.textContent = error.message ||
        "Unable to save your enquiry. Please try again.";
    } finally {
      if (submit) submit.disabled = false;
    }
  });

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
          copied = document.execCommand("copy");
        } catch {
          copied = false;
        }

        textarea.remove();

        if (status) {
          status.textContent = copied
            ? "Booking enquiry copied."
            : "Copying failed. Please try in a secure browser.";
        }
      }
    }
  );

  // ========================================
  // INITIALISE
  // ========================================

  renderJourney(0);
  updateSummary();

  console.info(
    "See Africa Calabar: mobile-first experience initialised."
  );
});
