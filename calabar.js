
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  const imagePath = number =>
    `images/calabar-media-${number}.webp`;

  const money = amount =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0
    }).format(amount);

  const reduceMotion = matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const scrollToBooking = () => {
    $("#booking")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth"
    });
  };

  // IMAGE ERROR HANDLING

  $$("img").forEach(image => {
    image.addEventListener("error", () => {
      if (image.dataset.failed) return;
      image.dataset.failed = "true";

      // Keep original scene untouched.
      // Show a clear placeholder when a file is missing.
      const label = image.alt || "Image unavailable";

      if (image.closest(".logos, .footer-logos")) {
        const text = document.createElement("strong");
        text.textContent = label;
        text.style.color = "#fff";
        text.style.fontSize = "11px";
        image.replaceWith(text);
      } else {
        image.style.opacity = "0.25";
        image.title = `Image not found: ${image.src}`;
      }
    });
  });

  // MOBILE MENU

  const menuButton = $("#menuButton");
  const navLinks = $("#navLinks");

  menuButton?.addEventListener("click", () => {
    const opened = navLinks.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(opened)
    );

    menuButton.textContent = opened ? "×" : "☰";
  });

  $$("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });

  // HERO VIDEO

  const heroVideo = $("#heroVideo");
  const soundToggle = $("#soundToggle");

  if (heroVideo) {
    heroVideo.muted = true;

    heroVideo.play().catch(() => {
      // Hero background photograph remains visible.
    });

    heroVideo.addEventListener("error", () => {
      heroVideo.style.display = "none";
    });
  }

  soundToggle?.addEventListener("click", () => {
    if (!heroVideo) return;

    heroVideo.muted = !heroVideo.muted;

    soundToggle.textContent = heroVideo.muted
      ? "♫ Enable Sound"
      : "♫ Mute Sound";

    if (heroVideo.paused) {
      heroVideo.play().catch(() => {});
    }
  });

  // PACKAGE JOURNEY

  const journey = [
    {
      title: "Choose your seat",
      description: "Secure your verified hospitality access.",
      image: 3
    },
    {
      title: "Add your stay",
      description: "Choose your hotel class and number of nights.",
      image: 4
    },
    {
      title: "Add your discovery",
      description: "Explore Tinapa and Kwa Falls with scheduled transport and a host or guide allowance.",
      image: 5
    },
    {
      title: "Add your flight",
      description: "Select your origin airport and receive a flight-inclusive quotation.",
      image: 6
    },
    {
      title: "Arrive and answer the beat",
      description: "Your itinerary, guest support and event-day guidance are arranged around you.",
      image: 7
    }
  ];

  let journeyIndex = 0;

  function renderJourney(index) {
    journeyIndex =
      (index + journey.length) % journey.length;

    const current = journey[journeyIndex];

    $("#journeyImage").src = imagePath(current.image);

    $("#journeyTitle").textContent = current.title;

    $("#journeyDescription").textContent =
      current.description;

    $("#journeyNumber").textContent =
      `STEP ${String(journeyIndex + 1).padStart(2, "0")} / 05`;

    $$(".journey-step").forEach((button, i) => {
      const active = i === journeyIndex;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
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

  // COMPLETE 13-IMAGE GALLERY

  const gallery = $("#galleryTrack");

  for (let i = 1; i <= 13; i++) {
    if (!gallery) break;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-card";

    button.setAttribute(
      "aria-label",
      `View Calabar Carnival photograph ${i}`
    );

    const image = document.createElement("img");
    image.src = imagePath(i);
    image.alt = `Calabar Carnival photograph ${i}`;
    image.loading = "lazy";

    const caption = document.createElement("span");

    caption.textContent =
      `${String(i).padStart(2, "0")} / CALABAR MOMENTS`;

    button.append(image, caption);

    button.addEventListener("click", () => {
      openLightbox(i - 1, button);
    });

    gallery.appendChild(button);
  }

  $("#galleryPrev")?.addEventListener("click", () => {
    gallery.scrollBy({
      left: -gallery.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });

  $("#galleryNext")?.addEventListener("click", () => {
    gallery.scrollBy({
      left: gallery.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  });

  // FULLSCREEN PHOTO VIEWER

  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCounter = $("#lightboxCounter");

  let selected = 0;
  let previousFocus = null;

  function showImage() {
    lightboxImage.src = imagePath(selected + 1);

    lightboxImage.alt =
      `Calabar Carnival photograph ${selected + 1}`;

    lightboxCounter.textContent =
      `${selected + 1} / 13`;
  }

  function openLightbox(index, button) {
    selected = index;
    previousFocus = button;

    showImage();

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    $("#lightboxClose").focus();
  }

  function closeLightbox() {
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    previousFocus?.focus();
  }

  function changeImage(direction) {
    selected = (selected + direction + 13) % 13;
    showImage();
  }

  $("#lightboxClose")?.addEventListener(
    "click",
    closeLightbox
  );

  $("#lightboxPrev")?.addEventListener(
    "click",
    () => changeImage(-1)
  );

  $("#lightboxNext")?.addEventListener(
    "click",
    () => changeImage(1)
  );

  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (
      lightbox.getAttribute("aria-hidden") === "true"
    ) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      changeImage(-1);
    }

    if (event.key === "ArrowRight") {
      changeImage(1);
    }

    if (event.key === "Tab") {
      const controls = [
        $("#lightboxClose"),
        $("#lightboxPrev"),
        $("#lightboxNext")
      ];

      const index = controls.indexOf(
        document.activeElement
      );

      const direction = event.shiftKey ? -1 : 1;

      const next =
        (index + direction + controls.length)
        % controls.length;

      event.preventDefault();
      controls[next].focus();
    }
  });

  // PACKAGE SELECTION

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
      choosePackage(button.dataset.package);
    });
  });

  $$(".regional-booking").forEach(button => {
    button.addEventListener("click", () => {
      regionSelect.value = button.dataset.origin;
      choosePackage("fly");
    });
  });

  // BOOKING ESTIMATE

  const rates = {
    seat: 150000,
    stay: 500000,
    explore: 620000,
    fly: 920000
  };

  const names = {
    seat: "Seat Only",
    stay: "Stay",
    explore: "Explore",
    fly: "Fly & Explore"
  };

  const inclusions = {
    seat: [
      "Verified hospitality access",
      "Event-day meal and refreshments",
      "Check-in and seat guidance",
      "Guest support"
    ],
    stay: [
      "Hospitality access",
      "Selected hotel with breakfast",
      "Two hotel nights",
      "Event-day transfer"
    ],
    explore: [
      "Hospitality and selected hotel",
      "Tinapa Free Zone & Resort",
      "Kwa Falls",
      "Scheduled attraction transport"
    ],
    fly: [
      "Hospitality and hotel",
      "Tinapa and Kwa Falls",
      "Local and specified airport transfers",
      "Return flight subject to supplier quotation"
    ]
  };

  const form = $("#bookingForm");
  const copyButton = $("#copyEnquiry");

  let enquiryText = "";

  function val(id) {
    return $(`#${id}`)?.value?.trim() || "";
  }

  function updateSummary() {
    const type = val("packageType") || "seat";
    const region = val("originRegion") || "nigeria";

    const guests = Math.max(
      1,
      Math.min(50, Number(val("guestCount")) || 1)
    );

    const hotel = val("hotelClass");
    const room = val("roomPreference");
    const nights = Number(val("hotelNights")) || 2;
    const transfer = val("transfer");

    const start = rates[type] || 150000;

    let extras = 0;

    if (transfer === "shared") {
      extras = 50000 * guests;
    } else if (transfer === "private") {
      extras = 120000 * Math.ceil(guests / 3);
    } else if (transfer === "tour") {
      extras = 180000;
    }

    // Airfare and other unconfirmed supplier
    // supplements are not invented here.
    const total = start * guests + extras;

    const needsQuote =
      type === "fly" ||
      region !== "nigeria" ||
      (type !== "seat" && hotel !== "3star") ||
      (type !== "seat" && room !== "sharing") ||
      (type !== "seat" && nights !== 2) ||
      transfer === "road";

    $("#summaryAmount").textContent = money(total);

    $("#summaryType").textContent =
      `${names[type]} · ${guests} guest${guests > 1 ? "s" : ""}`;

    const items = inclusions[type]
      .map(item => `<li>${item}</li>`)
      .join("");

    $("#summaryDetails").innerHTML = `
      <p><strong>Starting rate:</strong>
        ${money(start)} × ${guests}
      </p>
      <p><strong>Optional transport:</strong>
        ${money(extras)}
      </p>
      <p><strong>Hotel nights:</strong>
        ${type === "seat" ? "Not included" : nights}
      </p>
      <p><strong>Package inclusions:</strong></p>
      <ul>${items}</ul>
      <p>
        ${needsQuote
          ? "Additional supplier quotation required before confirming the final total."
          : "Indicative starting total only, subject to availability and confirmation."}
      </p>
    `;

    enquiryText = [
      "SEE AFRICA — CALABAR BOOKING ENQUIRY",
      "",
      `Name: ${val("fullName")}`,
      `Phone: ${val("phone")}`,
      `Email: ${val("email")}`,
      `Travelling from: ${region}`,
      `Experience: ${names[type]}`,
      `Preferred Carnival date: ${val("carnivalDate")}`,
      `Departure city/airport: ${val("departureAirport") || "Not supplied"}`,
      `Guests: ${guests}`,
      `Hotel class: ${hotel}`,
      `Room preference: ${room}`,
      `Hotel nights: ${type === "seat" ? "Not included" : nights}`,
      `Arrival: ${val("arrivalDate") || "Not supplied"}`,
      `Departure: ${val("departureDate") || "Not supplied"}`,
      `Dietary needs: ${val("dietary") || "None supplied"}`,
      `Optional transfer: ${transfer}`,
      "",
      `Indicative starting total: ${money(total)}`,
      needsQuote
        ? "Additional supplier quotation required."
        : "Subject to availability and confirmation.",
      "",
      "This is an enquiry, not a confirmed reservation."
    ].join("\n");

    return total;
  }

  // Recalculate when preferences change.

  form?.querySelectorAll("input,select").forEach(field => {
    field.addEventListener("change", updateSummary);
    field.addEventListener("input", updateSummary);
  });

  form?.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const arrival = val("arrivalDate");
    const departure = val("departureDate");

    if (arrival && departure && departure <= arrival) {
      alert("Your departure date must be after your arrival date.");
      return;
    }

    updateSummary();

    copyButton.disabled = false;

    $("#copyStatus").textContent =
      "Your estimate is ready. Copy your booking enquiry to share with the booking team.";

    $("#bookingSummary").scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center"
    });
  });

  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(enquiryText);

      $("#copyStatus").textContent =
        "Booking enquiry copied successfully.";
    } catch {
      $("#copyStatus").textContent =
        "Copying is unavailable in this browser. Please try again using HTTPS.";
    }
  });

  updateSummary();
});
