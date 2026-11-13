
/* =========================================
   CALABAR CARNIVAL 2026
   MAIN LANDING PAGE STYLES
========================================= */

:root {
  --bg: #100719;
  --purple: #210D34;
  --purple-soft: #3B1853;
  --gold: #F5BC4A;
  --gold-light: #FFDC88;
  --white: #FFFFFF;
  --text-soft: rgba(255,255,255,.76);
  --text-muted: rgba(255,255,255,.48);
  --ease: cubic-bezier(.16,1,.3,1);
  --font-display: "Outfit", sans-serif;
  --font-body: "DM Sans", sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  overflow-x: hidden;
  background: var(--bg);
  color: var(--white);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

body.menu-open,
body.dialog-open {
  overflow: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

button, a {
  -webkit-tap-highlight-color: transparent;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 4px;
}

::selection {
  color: var(--bg);
  background: var(--gold);
}

.skip-link {
  position: fixed;
  top: -100px;
  left: 16px;
  padding: 12px 20px;
  background: var(--gold);
  color: var(--bg);
  z-index: 9999;
}

.skip-link:focus {
  top: 16px;
}

/* =========================================
   ORIGINAL INTRO / PRELOADER
========================================= */

.page-loader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: var(--bg);
  transition:
    opacity .85s var(--ease),
    visibility .85s;
}

.page-loader.loaded {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.loader-content {
  text-align: center;
}

.loader-wordmark {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2rem, 6vw, 4.5rem);
  letter-spacing: -.065em;
}

.loader-wordmark span {
  color: var(--gold);
}

.loader-line {
  position: relative;
  display: block;
  height: 1px;
  width: 220px;
  margin: 24px auto 20px;
  overflow: hidden;
  background: rgba(255,255,255,.15);
}

.loader-line::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--gold);
  transform: translateX(-100%);
  animation: loaderProgress 1.35s var(--ease) forwards;
}

.loader-content p {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .38em;
  color: var(--text-muted);
}

@keyframes loaderProgress {
  to { transform: translateX(0); }
}

/* =========================================
   ORIGINAL NAVIGATION
========================================= */

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255,255,255,.13);
  background: transparent;
  transition:
    background .4s ease,
    backdrop-filter .4s ease,
    border-color .4s ease;
}

.site-header.scrolled,
.site-header.menu-active {
  background: rgba(15,6,24,.82);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border-color: rgba(255,255,255,.09);
}

.nav-container {
  width: min(100% - 100px, 1480px);
  margin: auto;
  min-height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
}

.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
}

.brand-mark {
  width: 39px;
  height: 39px;
  display: flex;
  color: var(--gold);
}

.brand-mark svg {
  width: 100%;
  height: 100%;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.brand-text strong {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 22px;
  letter-spacing: -.05em;
}

.brand-text small {
  margin-top: 6px;
  font-size: 8px;
  letter-spacing: .23em;
  font-weight: 700;
  color: rgba(255,255,255,.75);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: clamp(18px,3vw,48px);
}

.nav-link {
  position: relative;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,.72);
  transition: color .3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--white);
}

.nav-link.active::after {
  content: "";
  width: 5px;
  height: 5px;
  position: absolute;
  border-radius: 50%;
  bottom: -12px;
  left: calc(50% - 2.5px);
  background: var(--gold);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 25px;
}

.nav-year {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .12em;
  color: rgba(255,255,255,.65);
  white-space: nowrap;
}

.nav-year strong {
  color: var(--gold);
}

.nav-book-btn {
  border: 1px solid rgba(245,188,74,.7);
  background: rgba(245,188,74,.09);
  color: var(--white);
  padding: 15px 23px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 19px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .1em;
  cursor: pointer;
  transition: .35s var(--ease);
}

.nav-book-btn svg {
  width: 16px;
  height: 16px;
  color: var(--gold);
}

.nav-book-btn:hover {
  background: var(--gold);
  color: var(--bg);
  transform: translateY(-2px);
}

.nav-book-btn:hover svg {
  color: var(--bg);
}

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  padding: 7px;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.menu-toggle span {
  width: 100%;
  height: 2px;
  background: var(--white);
  transition: transform .3s ease;
}

.menu-toggle[aria-expanded="true"] span:first-child {
  transform: translateY(4.5px) rotate(45deg);
}

.menu-toggle[aria-expanded="true"] span:last-child {
  transform: translateY(-4.5px) rotate(-45deg);
}

/* =========================================
   ORIGINAL VIDEO HERO SECTION
   RESTORED WITHOUT DESIGN CHANGES
========================================= */

.carnival-hero {
  width: 100%;
  min-height: 780px;
  height: 100svh;
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background: var(--bg);
}

/* VIDEO */

.hero-media {
  position: absolute;
  inset: 0;
  z-index: -4;
  overflow: hidden;
  background: linear-gradient(125deg,#180826,#361148,#100719);
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.075);
  animation: cinematicZoom 24s ease-in-out infinite alternate;
}

@keyframes cinematicZoom {
  from { transform: scale(1.075); }
  to { transform: scale(1.16); }
}

.video-tint,
.video-gradient,
.video-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.video-tint {
  background: rgba(38,8,60,.24);
  mix-blend-mode: multiply;
}

.video-gradient {
  background:
    linear-gradient(
      90deg,
      rgba(12,4,19,.79) 0%,
      rgba(12,4,19,.48) 48%,
      rgba(12,4,19,.23) 100%
    ),
    linear-gradient(
      180deg,
      rgba(8,3,14,.46) 0%,
      transparent 27%,
      transparent 65%,
      rgba(8,3,14,.80) 100%
    );
}

.video-vignette {
  box-shadow: inset 0 0 190px 70px rgba(9,3,14,.27);
}

.hero-grain {
  position: absolute;
  inset: 0;
  z-index: -2;
  opacity: .17;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.24'/%3E%3C/svg%3E");
}

/* SIDE DETAILS */

.corner-text {
  position: absolute;
  top: 50%;
  font-size: 10px;
  letter-spacing: .28em;
  font-weight: 600;
  color: rgba(255,255,255,.42);
  writing-mode: vertical-rl;
}

.corner-left {
  left: 22px;
  transform: translateY(-50%) rotate(180deg);
}

.corner-right {
  right: 22px;
  transform: translateY(-50%);
}

/* HERO CONTENT */

.hero-container {
  width: min(100% - 100px,1480px);
  margin: 0 auto;
  position: relative;
  z-index: 3;
  padding: 120px 0 115px;
}

.hero-content {
  max-width: 1120px;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 17px;
  margin-bottom: 34px;
  font-size: clamp(10px,1vw,12px);
  font-weight: 700;
  letter-spacing: .24em;
  color: var(--gold-light);
}

.eyebrow-line {
  display: inline-block;
  width: 35px;
  height: 1px;
  flex-shrink: 0;
  background: var(--gold);
}

.eyebrow-line:last-child {
  opacity: .45;
}

/* ORIGINAL HERO HEADLINE */

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(76px, 9.4vw, 155px);
  font-weight: 900;
  line-height: .87;
  letter-spacing: -.09em;
  margin: 0;
  text-transform: uppercase;
}

.title-line {
  display: block;
  overflow: hidden;
  padding-right: .12em;
  padding-bottom: .07em;
}

.title-inner {
  display: inline-block;
  transform: translateY(115%);
  opacity: 0;
  transition:
    transform 1.25s var(--ease),
    opacity .8s ease;
}

.hero-ready .title-inner {
  transform: translateY(0);
  opacity: 1;
}

.title-line:nth-child(2) .title-inner {
  transition-delay: .13s;
}

.title-line:nth-child(3) .title-inner {
  transition-delay: .25s;
}

.title-second {
  color: var(--white);
}

.title-period {
  color: var(--gold);
}

.title-final {
  color: var(--gold);
  font-size: .74em;
  letter-spacing: -.075em;
}

.title-final em {
  color: var(--white);
  font-style: normal;
}

/* ORIGINAL DESCRIPTION */

.hero-description {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: 25px;
}

.description-rule {
  display: block;
  flex-shrink: 0;
  height: 52px;
  width: 2px;
  margin-top: 4px;
  background: var(--gold);
}

.hero-description p {
  max-width: 600px;
  margin: 0;
  font-size: clamp(14px,1.3vw,17px);
  line-height: 1.85;
  font-weight: 400;
  color: var(--text-soft);
}

/* ORIGINAL BUTTONS */

.hero-buttons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 13px;
  margin-top: 36px;
}

.btn {
  min-height: 62px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 8px 10px 8px 25px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 800;
  font-size: 11px;
  letter-spacing: .055em;
  transition:
    background .35s var(--ease),
    color .35s var(--ease),
    border-color .35s var(--ease),
    transform .35s var(--ease);
}

.btn-primary {
  color: #170A24;
  background: var(--gold);
  border: 1px solid var(--gold);
}

.btn-primary:hover {
  background: var(--gold-light);
  transform: translateY(-3px);
}

.btn-secondary {
  color: var(--white);
  background: rgba(255,255,255,.065);
  border: 1px solid rgba(255,255,255,.40);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  color: var(--bg);
  background: var(--white);
  transform: translateY(-3px);
}

.button-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 2px;
  background: rgba(0,0,0,.095);
}

.btn-secondary .button-icon {
  background: rgba(255,255,255,.13);
}

.btn-secondary:hover .button-icon {
  background: rgba(0,0,0,.08);
}

.button-icon svg {
  width: 19px;
  height: 19px;
  transition: transform .35s var(--ease);
}

.btn:hover .button-icon svg {
  transform: translate(2px,-2px);
}

/* ORIGINAL HERO REVEAL */

.hero-animate {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity .85s ease,
    transform 1s var(--ease);
}

.hero-ready .hero-animate {
  opacity: 1;
  transform: translateY(0);
}

.hero-eyebrow { transition-delay: .12s; }
.hero-description { transition-delay: .52s; }
.hero-buttons { transition-delay: .7s; }

/* ORIGINAL HERO FOOTER */

.hero-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  border-top: 1px solid rgba(255,255,255,.16);
}

.hero-bottom-inner {
  width: min(100% - 100px,1480px);
  min-height: 94px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
}

.hero-location {
  display: flex;
  align-items: center;
  gap: 13px;
}

.location-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 20px rgba(245,188,74,.65);
}

.hero-location > div {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.location-label {
  font-size: 9px;
  letter-spacing: .21em;
  color: var(--text-muted);
}

.hero-location strong {
  font-size: 10px;
  letter-spacing: .09em;
  font-weight: 700;
}

.scroll-indicator {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  font-size: 9px;
  letter-spacing: .25em;
  font-weight: 700;
  color: rgba(255,255,255,.75);
}

.scroll-mouse {
  width: 23px;
  height: 35px;
  border: 1px solid rgba(255,255,255,.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.scroll-wheel {
  width: 3px;
  height: 7px;
  border-radius: 3px;
  background: var(--gold);
  animation: mouseWheel 2s ease-in-out infinite;
}

@keyframes mouseWheel {
  0%,100% {
    transform: translateY(0);
    opacity: 1;
  }

  65% {
    transform: translateY(9px);
    opacity: .2;
  }
}

.sound-button {
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  background: transparent;
  color: var(--white);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  cursor: pointer;
}

.sound-icon {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,.35);
  border-radius: 50%;
}

.sound-icon svg {
  width: 16px;
  height: 16px;
}

.sound-button:hover .sound-icon {
  color: var(--gold);
  border-color: var(--gold);
}

.hero-number {
  position: absolute;
  right: 60px;
  bottom: 125px;
  display: flex;
  gap: 12px;
  align-items: center;
  z-index: 3;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  color: rgba(255,255,255,.55);
}

.hero-number span:first-child {
  color: var(--gold);
}

.number-divider {
  width: 35px;
  height: 1px;
  background: rgba(255,255,255,.4);
}

.hero-end-marker {
  height: 1px;
}

/* =========================================
   ORIGINAL BOOKING DIALOG
========================================= */

.booking-dialog {
  width: min(92%,520px);
  max-height: 86dvh;
  padding: 0;
  margin: auto;
  overflow-y: auto;
  color: var(--white);
  background: #1C0D2A;
  border: 1px solid rgba(245,188,74,.25);
  border-radius: 10px;
  box-shadow: 0 30px 100px rgba(0,0,0,.6);
}

.booking-dialog::backdrop {
  background: rgba(5,2,10,.78);
  backdrop-filter: blur(8px);
}

.dialog-inner {
  position: relative;
  padding: 42px 34px;
}

.dialog-close {
  position: absolute;
  top: 16px;
  right: 22px;
  border: none;
  background: none;
  color: var(--white);
  font-size: 30px;
  cursor: pointer;
}

.dialog-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .18em;
  color: var(--gold);
}

.dialog-inner h2 {
  margin: 14px 0 12px;
  font-family: var(--font-display);
  font-size: clamp(28px,5vw,40px);
  letter-spacing: -.05em;
  line-height: 1.12;
}

.dialog-description {
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-soft);
}

.booking-options {
  display: grid;
  gap: 10px;
  margin-top: 25px;
}

.booking-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 17px 18px;
  text-align: left;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 5px;
  background: rgba(255,255,255,.04);
  color: var(--white);
  cursor: pointer;
  transition: .3s ease;
}

.booking-option:hover,
.booking-option.selected {
  border-color: var(--gold);
  background: rgba(245,188,74,.09);
}

.booking-option > span:first-child {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.booking-option strong {
  font-size: 13px;
  letter-spacing: .08em;
}

.booking-option small {
  font-size: 11px;
  color: var(--text-soft);
}

.option-arrow {
  color: var(--gold);
  font-size: 19px;
}

.dialog-note {
  margin: 20px 0 0;
  font-size: 11px;
  line-height: 1.7;
  color: var(--text-muted);
}

/* =========================================
   ORIGINAL HERO TABLETS
========================================= */

@media(max-width:1150px) {

  .nav-container,
  .hero-container,
  .hero-bottom-inner {
    width: min(100% - 64px,1480px);
  }

  .nav-links {
    gap: 20px;
  }

  .nav-year {
    display: none;
  }

  .hero-title {
    font-size: clamp(76px,10vw,120px);
  }

  .corner-text {
    display: none;
  }

}

/* =========================================
   ORIGINAL MOBILE NAVIGATION
========================================= */

@media(max-width:860px) {

  .nav-container {
    min-height: 78px;
  }

  .nav-links {
    position: fixed;
    top: 78px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0 32px;
    background: rgba(17,6,28,.98);
    backdrop-filter: blur(20px);
    max-height: 0;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transition:
      max-height .45s var(--ease),
      opacity .3s ease,
      padding .35s ease,
      visibility .3s;
  }

  .nav-links.open {
    max-height: 360px;
    padding: 16px 32px 30px;
    visibility: visible;
    opacity: 1;
    border-bottom: 1px solid rgba(255,255,255,.1);
  }

  .nav-link {
    padding: 15px 0;
    font-size: 14px;
    border-bottom: 1px solid rgba(255,255,255,.06);
  }

  .nav-link.active::after {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-book-btn {
    padding: 12px 14px;
    gap: 10px;
  }

  .nav-book-btn svg {
    width: 14px;
    height: 14px;
  }

}

/* =========================================
   ORIGINAL MOBILE HERO
========================================= */

@media(max-width:640px) {

  .nav-container,
  .hero-container,
  .hero-bottom-inner {
    width: calc(100% - 38px);
  }

  .nav-container {
    min-height: 74px;
  }

  .brand-mark {
    width: 30px;
    height: 30px;
  }

  .brand-text strong {
    font-size: 18px;
  }

  .brand-text small {
    font-size: 6.5px;
  }

  .nav-book-btn {
    font-size: 9px;
    padding: 11px 12px;
  }

  .nav-book-btn svg {
    display: none;
  }

  .nav-links {
    top: 74px;
  }

  .carnival-hero {
    height: 100svh;
    min-height: 700px;
  }

  .hero-video {
    object-position: 52% center;
  }

  .video-gradient {
    background:
      linear-gradient(
        180deg,
        rgba(9,3,15,.60) 0%,
        rgba(9,3,15,.45) 30%,
        rgba(9,3,15,.65) 65%,
        rgba(9,3,15,.88) 100%
      ),
      linear-gradient(
        90deg,
        rgba(9,3,15,.38),
        rgba(9,3,15,.1)
      );
  }

  .hero-container {
    padding: 115px 0 125px;
  }

  .hero-eyebrow {
    font-size: 9px;
    letter-spacing: .12em;
    gap: 10px;
    margin-bottom: 23px;
  }

  .eyebrow-line {
    width: 20px;
  }

  .eyebrow-line:last-child {
    display: none;
  }

  .hero-title {
    font-size: clamp(59px,13.7vw,94px);
    line-height: .92;
  }

  .title-final {
    font-size: .75em;
  }

  .hero-description {
    margin-top: 26px;
    gap: 13px;
  }

  .description-rule {
    height: 57px;
  }

  .hero-description p {
    font-size: 13px;
    line-height: 1.7;
    max-width: 410px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
    margin-top: 30px;
    gap: 11px;
  }

  .btn {
    min-height: 59px;
    width: 100%;
    padding: 8px 9px 8px 18px;
    font-size: 10px;
  }

  .button-icon {
    width: 40px;
    height: 40px;
  }

  .hero-bottom-inner {
    min-height: 78px;
  }

  .hero-location strong {
    font-size: 9px;
  }

  .location-label {
    font-size: 8px;
  }

  .scroll-indicator {
    display: none;
  }

  .sound-button {
    font-size: 9px;
  }

  .sound-icon {
    width: 31px;
    height: 31px;
  }

  .hero-number {
    right: 19px;
    bottom: 97px;
    font-size: 9px;
  }

  .dialog-inner {
    padding: 36px 22px;
  }

}

@media(max-width:380px) {

  .hero-title {
    font-size: 12.8vw;
  }

  .hero-description p {
    font-size: 12px;
  }

  .nav-actions {
    gap: 10px;
  }

  .brand-logo {
    gap: 6px;
  }

  .brand-text strong {
    font-size: 16px;
  }

  .nav-book-btn {
    padding: 10px;
  }

}

/* =========================================
   ORIGINAL SHORT SCREENS
========================================= */

@media(max-height:720px) and (min-width:641px) {

  .carnival-hero {
    height: auto;
    min-height: 720px;
  }

  .hero-container {
    padding-top: 140px;
    padding-bottom: 140px;
  }

  .hero-title {
    font-size: clamp(68px,8vw,115px);
  }

}

@media(max-height:650px) and (max-width:640px) {

  .carnival-hero {
    height: auto;
    min-height: 700px;
  }

}

/* =========================================
   NEW SECTION 2 — HOSPITALITY
   ALL STYLES ARE SEPARATELY NAMESPACED
========================================= */

.hospitality-section {
  --h-purple: #19072F;
  --h-purple-dark: #10041F;
  --h-green: #56EF83;
  --h-green-soft: #B1FFC5;
  --h-yellow: #FFD247;

  position: relative;
  width: 100%;
  min-height: 850px;
  min-height: 100svh;
  display: flex;
  align-items: center;
  isolation: isolate;
  overflow: hidden;

  background:
    radial-gradient(
      ellipse at 77% 44%,
      rgba(92,28,142,.50),
      transparent 50%
    ),
    radial-gradient(
      ellipse at 8% 85%,
      rgba(46,9,91,.72),
      transparent 52%
    ),
    linear-gradient(
      125deg,
      #10041F 0%,
      #220840 52%,
      #18062E 100%
    );
}

.hospitality-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
  filter: blur(95px);
}

.hospitality-glow-one {
  width: 520px;
  height: 520px;
  left: -250px;
  bottom: -240px;
  background: rgba(74,14,122,.55);
}

.hospitality-glow-two {
  width: 540px;
  height: 540px;
  top: 10%;
  right: -160px;
  background: rgba(106,30,161,.40);
}

.hospitality-pattern {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: .12;

  background-image:
    radial-gradient(
      rgba(255,255,255,.40) .8px,
      transparent .8px
    );

  background-size: 38px 38px;
  mask-image: linear-gradient(90deg,transparent,#000);
}

/* SECTION GRID */

.hospitality-container {
  position: relative;
  z-index: 2;
  width: min(100% - 100px,1460px);
  margin: 0 auto;
  padding: 130px 0 155px;

  display: grid;
  grid-template-columns: 1.06fr .94fr;
  gap: 40px;
  align-items: center;
}

.hospitality-content {
  max-width: 700px;
  position: relative;
  z-index: 5;
}

/* EYEBROW */

.hospitality-eyebrow {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;

  color: var(--h-green);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .21em;
}

.hospitality-eyebrow-line {
  width: 35px;
  height: 2px;
  flex-shrink: 0;
  background: var(--h-yellow);
}

/* BIG TYPOGRAPHY */

.hospitality-heading {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(60px,6.8vw,110px);
  font-weight: 900;
  letter-spacing: -.075em;
  line-height: .94;
  text-transform: uppercase;
}

.hospitality-heading > span {
  display: block;
}

.heading-top {
  color: var(--white);
}

.heading-middle {
  color: var(--h-green);
}

.heading-bottom {
  color: var(--h-yellow);
}

.heading-bottom span {
  color: var(--h-green);
}

.hospitality-lead {
  margin: 29px 0 0;
  max-width: 550px;

  color: rgba(255,255,255,.73);
  font-size: clamp(14px,1.25vw,17px);
  line-height: 1.85;
}

/* TRUST INFORMATION */

.hospitality-trust {
  display: flex;
  align-items: center;
  gap: 16px;

  margin-top: 32px;
  padding: 20px;
  max-width: 570px;

  background: rgba(86,239,131,.055);
  border: 1px solid rgba(86,239,131,.24);
  border-radius: 9px;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.05);
}

.hospitality-check {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;

  border-radius: 50%;
  color: var(--h-green);
  background: rgba(86,239,131,.11);
  border: 1px solid rgba(86,239,131,.23);
}

.hospitality-check svg {
  width: 24px;
  height: 24px;
}

.hospitality-trust > div {
  min-width: 0;
}

.trust-label {
  font-size: 9px;
  letter-spacing: .22em;
  font-weight: 800;
  color: var(--h-green);
}

.hospitality-trust p {
  margin: 8px 0 0;
  color: rgba(255,255,255,.86);
  font-size: 14px;
  line-height: 1.7;
}

.hospitality-trust strong {
  color: var(--h-yellow);
  font-weight: 800;
}

/* DATE INFORMATION */

.hospitality-date {
  display: flex;
  align-items: flex-start;
  gap: 17px;
  margin-top: 32px;
}

.hospitality-date-icon {
  font-size: 37px;
  line-height: 1;
  color: var(--h-green);
  flex-shrink: 0;
}

.hospitality-date > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.hospitality-date-label {
  color: rgba(255,255,255,.56);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .16em;
}

.hospitality-date strong {
  color: var(--h-yellow);
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -.025em;
}

.hospitality-date p {
  margin: 4px 0 0;
  max-width: 480px;

  color: rgba(255,255,255,.62);
  font-size: 12px;
  line-height: 1.85;
}

/* RESERVE BUTTON */

.hospitality-cta {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;

  margin-top: 34px;
  min-height: 60px;
  padding: 9px 9px 9px 24px;

  border: 1px solid var(--h-green);
  border-radius: 4px;

  color: #140622;
  background: var(--h-green);

  font-size: 11px;
  font-weight: 800;
  letter-spacing: .065em;
  cursor: pointer;

  transition:
    transform .35s var(--ease),
    background .35s ease,
    border-color .35s ease;
}

.hospitality-cta:hover {
  transform: translateY(-3px);
  background: var(--h-yellow);
  border-color: var(--h-yellow);
}

.hospitality-cta-arrow {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  background: rgba(0,0,0,.1);
  border-radius: 2px;
  font-size: 22px;
}

/* =========================================
   FLOATING MASK VISUAL
========================================= */

.hospitality-visual {
  position: relative;
  width: 100%;
  height: min(590px,55vw);
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
}

.hospitality-aura {
  position: absolute;
  width: 82%;
  aspect-ratio: 1;
  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(86,239,131,.17) 0%,
      rgba(118,32,169,.22) 45%,
      transparent 73%
    );

  filter: blur(23px);
  animation: hospitalityAura 6s ease-in-out infinite;
}

@keyframes hospitalityAura {
  0%,100% {
    transform: scale(1);
    opacity: .7;
  }

  50% {
    transform: scale(1.14);
    opacity: 1;
  }
}

/* ORBIT CIRCLES */

.hospitality-orbit {
  position: absolute;
  border-radius: 50%;
  aspect-ratio: 1;
  pointer-events: none;
}

.hospitality-orbit-one {
  width: 83%;
  border: 1px solid rgba(255,210,71,.20);
}

.hospitality-orbit-two {
  width: 101%;
  border: 1px dashed rgba(86,239,131,.24);
  animation: hospitalityOrbit 65s linear infinite;
}

@keyframes hospitalityOrbit {
  to {
    transform: rotate(360deg);
  }
}

/* MASK */

.hospitality-mask-float {
  width: min(100%,640px);
  position: relative;
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: hospitalityFloat 6s ease-in-out infinite;
  filter: drop-shadow(0 35px 35px rgba(0,0,0,.27));
}

.hospitality-mask {
  display: block;
  width: 100%;
  max-height: 650px;
  object-fit: contain;

  transform: rotate(-5deg);
  transition: transform .5s var(--ease);

  filter:
    drop-shadow(0 25px 30px rgba(0,0,0,.32))
    drop-shadow(0 0 35px rgba(255,210,71,.13));
}

.hospitality-visual:hover .hospitality-mask {
  transform: rotate(-2deg) scale(1.04);
}

@keyframes hospitalityFloat {
  0%,100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-25px);
  }
}

/* STARS */

.hospitality-star {
  position: absolute;
  z-index: 4;
  pointer-events: none;
  line-height: 1;
  animation: hospitalitySparkle 5s ease-in-out infinite;
}

.h-star-one {
  left: 12%;
  top: 8%;
  font-size: 46px;
  color: var(--h-yellow);
}

.h-star-two {
  right: 5%;
  top: 18%;
  font-size: 28px;
  color: var(--h-green);
  animation-delay: 1s;
}

.h-star-three {
  left: 6%;
  bottom: 11%;
  font-size: 29px;
  color: var(--h-green);
  animation-delay: 2s;
}

@keyframes hospitalitySparkle {
  0%,100% {
    opacity: .5;
    transform: scale(.85) rotate(0deg);
  }

  50% {
    opacity: 1;
    transform: scale(1.12) rotate(20deg);
  }
}

/* FLOATING LABELS */

.hospitality-floating-label {
  position: absolute;
  z-index: 5;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 13px 16px;
  border: 1px solid rgba(255,255,255,.23);
  border-radius: 4px;

  background: rgba(31,10,53,.68);
  backdrop-filter: blur(14px);

  color: var(--white);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .12em;
}

.label-one {
  top: 14%;
  left: -1%;
  transform: rotate(-5deg);
}

.label-one span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--h-green);
  box-shadow: 0 0 12px rgba(86,239,131,.7);
}

.label-two {
  right: -1%;
  bottom: 17%;
  transform: rotate(5deg);
}

.label-two span {
  color: var(--h-yellow);
  font-size: 17px;
}

.hospitality-watermark {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;

  font-family: var(--font-display);
  font-size: clamp(90px,12vw,190px);
  font-weight: 900;
  letter-spacing: -.09em;
  line-height: 1;
  color: rgba(255,255,255,.035);
  pointer-events: none;
}

/* =========================================
   NEW SECTION PARTICLES
========================================= */

.hospitality-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

.hospitality-particle {
  position: absolute;
  bottom: -20px;
  left: var(--left,50%);

  width: var(--size,4px);
  height: var(--size,4px);
  background: var(--color,#FFD247);

  border-radius: 2px;
  opacity: 0;

  animation:
    hospitalityParticleRise
    var(--duration,12s)
    linear infinite;

  animation-delay: var(--delay,0s);
}

@keyframes hospitalityParticleRise {
  0% {
    transform: translate(0,0) rotate(0);
    opacity: 0;
  }

  12% {
    opacity: .6;
  }

  85% {
    opacity: .6;
  }

  100% {
    transform:
      translate(var(--drift,20px),-110vh)
      rotate(430deg);
    opacity: 0;
  }
}

/* =========================================
   SCROLL REVEAL — SECTION 2 ONLY
========================================= */

.hospitality-reveal {
  opacity: 0;
  transform: translateY(45px);

  transition:
    opacity 1s ease,
    transform 1.15s var(--ease);
}

.hospitality-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hospitality-visual.hospitality-reveal {
  transition-delay: .18s;
}

/* =========================================
   NEW HOSPITALITY FOOTER
========================================= */

.hospitality-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;

  border-top: 1px solid rgba(255,255,255,.12);
  background: rgba(10,3,22,.3);
}

.hospitality-bottom-inner {
  width: min(100% - 100px,1460px);
  min-height: 77px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.hospitality-bottom-inner > span:not(.hospitality-bottom-star) {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  color: rgba(255,255,255,.65);
}

.hospitality-bottom-star {
  font-size: 26px;
  color: var(--h-green);
}

/* =========================================
   HOSPITALITY — TABLET
========================================= */

@media (max-width:1150px) {

  .hospitality-container,
  .hospitality-bottom-inner {
    width: calc(100% - 64px);
  }

  .hospitality-container {
    gap: 20px;
  }

  .hospitality-heading {
    font-size: clamp(58px,6.5vw,88px);
  }

  .hospitality-visual {
    height: 460px;
  }

  .hospitality-floating-label {
    padding: 10px 12px;
    font-size: 8px;
  }

}

@media (max-width:860px) {

  .hospitality-container {
    grid-template-columns: 1fr .8fr;
    gap: 10px;
  }

  .hospitality-heading {
    font-size: clamp(52px,7vw,76px);
  }

  .hospitality-visual {
    height: 410px;
  }

  .hospitality-lead {
    font-size: 13px;
  }

  .hospitality-trust {
    padding: 14px;
  }

  .hospitality-trust p {
    font-size: 12px;
  }

  .hospitality-bottom-inner > span:not(.hospitality-bottom-star) {
    font-size: 8px;
  }

}

/* =========================================
   HOSPITALITY — MOBILE
========================================= */

@media (max-width:640px) {

  .hospitality-section {
    min-height: 900px;
    height: auto;
  }

  .hospitality-container,
  .hospitality-bottom-inner {
    width: calc(100% - 38px);
  }

  .hospitality-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;

    padding: 90px 0 125px;
  }

  .hospitality-content {
    width: 100%;
  }

  .hospitality-eyebrow {
    font-size: 9px;
    letter-spacing: .12em;
    gap: 10px;
    margin-bottom: 22px;
  }

  .hospitality-eyebrow-line {
    width: 21px;
  }

  .hospitality-heading {
    font-size: clamp(53px,12.7vw,82px);
    line-height: .96;
  }

  .hospitality-lead {
    margin-top: 22px;
    font-size: 13px;
    line-height: 1.75;
  }

  .hospitality-trust {
    margin-top: 23px;
    padding: 12px;
    gap: 11px;
  }

  .hospitality-check {
    width: 41px;
    height: 41px;
  }

  .hospitality-check svg {
    width: 20px;
    height: 20px;
  }

  .trust-label {
    font-size: 8px;
  }

  .hospitality-trust p {
    font-size: 11px;
  }

  .hospitality-date {
    margin-top: 24px;
    gap: 11px;
  }

  .hospitality-date-icon {
    font-size: 28px;
  }

  .hospitality-date-label {
    font-size: 8px;
  }

  .hospitality-date strong {
    font-size: 19px;
  }

  .hospitality-date p {
    font-size: 11px;
    line-height: 1.7;
  }

  .hospitality-cta {
    margin-top: 24px;
    width: 100%;
    min-height: 56px;
    padding: 8px 8px 8px 18px;
    font-size: 10px;
  }

  .hospitality-cta-arrow {
    width: 38px;
    height: 38px;
  }

  .hospitality-visual {
    width: min(100%,420px);
    height: 345px;
    margin: 5px auto 0;
  }

  .hospitality-mask-float {
    width: 89%;
  }

  .hospitality-mask {
    max-height: 345px;
  }

  .hospitality-orbit-one {
    width: 76%;
  }

  .hospitality-orbit-two {
    width: 96%;
  }

  .h-star-one {
    font-size: 27px;
  }

  .h-star-two,
  .h-star-three {
    font-size: 20px;
  }

  .hospitality-floating-label {
    padding: 9px;
    font-size: 7px;
    letter-spacing: .06em;
  }

  .label-one {
    top: 12%;
    left: 0;
  }

  .label-two {
    right: 0;
    bottom: 12%;
  }

  .hospitality-watermark {
    font-size: 95px;
  }

  .hospitality-bottom-inner {
    min-height: 65px;
    gap: 12px;
  }

  .hospitality-bottom-inner > span:not(.hospitality-bottom-star) {
    font-size: 8px;
    line-height: 1.5;
    letter-spacing: .06em;
  }

  .hospitality-bottom-star {
    font-size: 20px;
  }

}

@media(max-width:380px) {

  .hospitality-heading {
    font-size: 12vw;
  }

  .hospitality-visual {
    height: 285px;
  }

  .hospitality-trust p {
    font-size: 10px;
  }

}

/* =========================================
   REDUCED MOTION — BOTH SECTIONS
========================================= */

@media(prefers-reduced-motion:reduce) {

  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }

  .title-inner {
    transform: none !important;
    opacity: 1 !important;
  }

  .hero-animate {
    transform: none !important;
    opacity: 1 !important;
  }

  .hospitality-reveal {
    opacity: 1 !important;
    transform: none !important;
  }

}
