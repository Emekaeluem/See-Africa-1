
/* =====================================
   CALABAR CARNIVAL 2026
   EXECUTIVE PURPLE LANDING PAGE
===================================== */

:root {
  --purple: #19072F;
  --purple-dark: #10041F;
  --purple-light: #351253;
  --green: #56EF83;
  --green-soft: #B1FFC5;
  --yellow: #FFD247;
  --white: #FFFFFF;
  --muted: rgba(255,255,255,.70);
  --border: rgba(255,255,255,.16);
  --display: "Outfit", sans-serif;
  --body: "DM Sans", sans-serif;
  --ease: cubic-bezier(.16,1,.3,1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--purple);
  color: var(--white);
  font-family: var(--body);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

body.menu-open,
body.dialog-open {
  overflow: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  font-family: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--yellow);
  outline-offset: 4px;
}

::selection {
  background: var(--yellow);
  color: var(--purple);
}

/* =====================================
   HEADER
===================================== */

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border);
  transition:
    background .4s ease,
    backdrop-filter .4s ease;
}

.site-header.scrolled,
.site-header.menu-active {
  background: rgba(20,5,38,.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.navbar {
  width: min(100% - 100px, 1460px);
  height: 93px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
}

.brand-symbol {
  font-size: 43px;
  line-height: 1;
  color: var(--green);
  animation: symbolRotate 24s linear infinite;
}

@keyframes symbolRotate {
  to {
    transform: rotate(360deg);
  }
}

.brand-name {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.brand-name strong {
  font-family: var(--display);
  font-weight: 900;
  font-size: 23px;
  letter-spacing: -.06em;
}

.brand-name small {
  margin-top: 5px;
  color: var(--yellow);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: .19em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: clamp(20px, 3vw, 46px);
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
  color: var(--green);
}

.nav-link.active::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  left: calc(50% - 2.5px);
  bottom: -13px;
  background: var(--yellow);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 23px;
}

.nav-edition {
  color: rgba(255,255,255,.65);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  white-space: nowrap;
}

.nav-edition b {
  color: var(--green);
}

.nav-book {
  padding: 15px 22px;
  border: 1px solid var(--yellow);
  background: var(--yellow);
  color: var(--purple);
  border-radius: 3px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .09em;
  display: inline-flex;
  align-items: center;
  gap: 23px;
  cursor: pointer;
  transition: .35s var(--ease);
}

.nav-book span {
  font-size: 18px;
  line-height: 1;
}

.nav-book:hover {
  background: var(--green);
  border-color: var(--green);
  transform: translateY(-2px);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  width: 40px;
  height: 40px;
  padding: 7px;
  border: none;
  background: transparent;
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

/* =====================================
   HERO BACKGROUND
===================================== */

.carnival-hero {
  position: relative;
  min-height: 780px;
  min-height: 100svh;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  background:
    radial-gradient(
      ellipse at 75% 42%,
      rgba(91,30,140,.50),
      transparent 48%
    ),
    radial-gradient(
      ellipse at 10% 80%,
      rgba(41,11,81,.80),
      transparent 55%
    ),
    linear-gradient(
      125deg,
      #10041F 0%,
      #21083D 52%,
      #18062E 100%
    );
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(95px);
  z-index: -1;
}

.glow-left {
  width: 500px;
  height: 500px;
  left: -250px;
  bottom: -220px;
  background: rgba(69,15,116,.62);
}

.glow-right {
  width: 550px;
  height: 550px;
  right: -110px;
  top: 14%;
  background: rgba(81,24,146,.44);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: .16;
  pointer-events: none;

  background-image:
    radial-gradient(rgba(255,255,255,.38) .8px, transparent .8px);

  background-size: 38px 38px;
  mask-image: linear-gradient(90deg,transparent,#000);
}

.hero-orbit {
  position: absolute;
  border: 1px solid rgba(255,210,71,.12);
  border-radius: 50%;
  z-index: -1;
  pointer-events: none;
}

.orbit-one {
  width: 950px;
  height: 950px;
  right: -370px;
  top: -240px;
}

.orbit-two {
  width: 720px;
  height: 720px;
  right: -245px;
  top: -125px;
  border-style: dashed;
  border-color: rgba(86,239,131,.16);
}

/* =====================================
   HERO LAYOUT
===================================== */

.hero-container {
  position: relative;
  width: min(100% - 100px, 1460px);
  margin: 0 auto;
  padding: 160px 0 180px;
  display: grid;
  grid-template-columns: 1.08fr .92fr;
  align-items: center;
  gap: 30px;
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 5;
  max-width: 780px;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  color: var(--green);
  font-size: clamp(9px,.9vw,12px);
  font-weight: 800;
  letter-spacing: .19em;
}

.eyebrow-line {
  display: inline-block;
  width: 38px;
  height: 2px;
  flex-shrink: 0;
  background: var(--yellow);
}

/* =====================================
   TYPOGRAPHY
===================================== */

.hero-title {
  margin: 0;
  font-family: var(--display);
  font-size: clamp(72px, 7.5vw, 122px);
  font-weight: 900;
  line-height: .90;
  letter-spacing: -.082em;
  text-transform: uppercase;
}

.hero-title > span {
  display: block;
}

.heading-white {
  color: var(--white);
}

.heading-green {
  color: var(--green);
  text-shadow: 0 0 55px rgba(86,239,131,.13);
}

.heading-yellow {
  color: var(--yellow);
}

.heading-last {
  font-size: .80em;
  letter-spacing: -.07em;
  margin-top: 8px;
}

.heading-last em {
  font-style: normal;
  color: var(--white);
}

.hero-description {
  max-width: 580px;
  font-size: clamp(14px,1.25vw,17px);
  line-height: 1.85;
  color: var(--muted);
  margin: 30px 0 0;
}

/* =====================================
   BUTTONS
===================================== */

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.btn {
  min-height: 61px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  padding: 8px 9px 8px 24px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .06em;
  cursor: pointer;
  transition:
    background .35s var(--ease),
    color .35s var(--ease),
    transform .35s var(--ease);
}

.btn-primary {
  background: var(--yellow);
  color: var(--purple);
  border: 1px solid var(--yellow);
}

.btn-primary:hover {
  background: var(--green);
  border-color: var(--green);
  transform: translateY(-3px);
}

.btn-outline {
  background: rgba(255,255,255,.045);
  color: var(--white);
  border: 1px solid rgba(255,255,255,.45);
  backdrop-filter: blur(10px);
}

.btn-outline:hover {
  background: var(--green);
  color: var(--purple);
  border-color: var(--green);
  transform: translateY(-3px);
}

.btn-arrow {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  background: rgba(0,0,0,.10);
  border-radius: 2px;
  font-size: 20px;
  font-weight: 400;
  transition: transform .35s var(--ease);
}

.btn-outline .btn-arrow {
  background: rgba(255,255,255,.10);
}

.btn:hover .btn-arrow {
  transform: translate(2px,-2px);
}

/* =====================================
   TRUST LINE
===================================== */

.hero-trust {
  display: inline-flex;
  align-items: center;
  gap: 13px;
  margin-top: 36px;
  padding: 14px 20px;
  border: 1px solid rgba(86,239,131,.23);
  background: rgba(86,239,131,.055);
  border-radius: 6px;
  backdrop-filter: blur(12px);
}

.trust-icon {
  display: grid;
  place-items: center;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 50%;
  background: rgba(86,239,131,.12);
  color: var(--green);
}

.trust-icon svg {
  width: 19px;
  height: 19px;
}

.hero-trust p {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.6;
  color: rgba(255,255,255,.80);
}

.hero-trust strong {
  color: var(--yellow);
  white-space: nowrap;
  font-weight: 800;
}

/* =====================================
   FLOATING MASK
===================================== */

.hero-visual {
  position: relative;
  width: 100%;
  min-width: 0;
  height: min(590px, 58vw);
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
}

.mask-aura {
  position: absolute;
  width: 78%;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(
      circle,
      rgba(86,239,131,.18) 0%,
      rgba(112,31,156,.19) 42%,
      transparent 72%
    );
  filter: blur(23px);
  animation: auraBreath 6s ease-in-out infinite;
}

@keyframes auraBreath {
  0%,100% {
    transform: scale(1);
    opacity: .75;
  }
  50% {
    transform: scale(1.15);
    opacity: 1;
  }
}

.mask-circle {
  position: absolute;
  aspect-ratio: 1;
  border-radius: 50%;
  pointer-events: none;
}

.mask-circle-one {
  width: 85%;
  border: 1px solid rgba(255,210,71,.20);
}

.mask-circle-two {
  width: 102%;
  border: 1px dashed rgba(86,239,131,.22);
  animation: slowRotate 65s linear infinite;
}

@keyframes slowRotate {
  to { transform: rotate(360deg); }
}

.mask-float {
  position: relative;
  z-index: 3;
  width: min(100%,640px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: maskFloating 6s ease-in-out infinite;
  filter: drop-shadow(0 35px 35px rgba(0,0,0,.30));
}

.carnival-mask {
  width: 100%;
  max-height: 650px;
  object-fit: contain;
  filter:
    drop-shadow(0 25px 30px rgba(0,0,0,.33))
    drop-shadow(0 0 35px rgba(255,210,71,.14));
  transform: rotate(-5deg);
  transition: transform .5s var(--ease);
}

.hero-visual:hover .carnival-mask {
  transform: rotate(-2deg) scale(1.04);
}

@keyframes maskFloating {
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-24px);
  }
}

/* FLOATING DETAILS */

.mask-star {
  position: absolute;
  z-index: 4;
  pointer-events: none;
  line-height: 1;
  animation: starPulse 5s ease-in-out infinite;
}

.star-one {
  top: 7%;
  left: 12%;
  color: var(--yellow);
  font-size: 47px;
}

.star-two {
  top: 18%;
  right: 5%;
  color: var(--green);
  font-size: 30px;
  animation-delay: 1s;
}

.star-three {
  bottom: 10%;
  left: 5%;
  color: var(--green);
  font-size: 30px;
  animation-delay: 2s;
}

@keyframes starPulse {
  0%,100% {
    opacity: .55;
    transform: scale(.85) rotate(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.12) rotate(20deg);
  }
}

.floating-tag {
  position: absolute;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: 1px solid rgba(255,255,255,.23);
  background: rgba(31,10,53,.63);
  backdrop-filter: blur(15px);
  border-radius: 4px;
  color: var(--white);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .12em;
}

.tag-top {
  top: 16%;
  left: -2%;
  transform: rotate(-5deg);
}

.tag-bottom {
  right: -2%;
  bottom: 18%;
  transform: rotate(5deg);
}

.tag-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 13px rgba(86,239,131,.7);
}

.tag-star {
  color: var(--yellow);
  font-size: 17px;
}

.visual-year {
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: 0;
  font-family: var(--display);
  font-size: clamp(90px,12vw,190px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -.09em;
  color: rgba(255,255,255,.035);
  pointer-events: none;
}

/* =====================================
   SMALL PARTICLES
===================================== */

.hero-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  bottom: -20px;
  width: var(--size,5px);
  height: var(--size,5px);
  left: var(--left,50%);
  border-radius: 2px;
  background: var(--color,var(--yellow));
  opacity: 0;
  animation: particleRise var(--duration,12s) linear infinite;
  animation-delay: var(--delay,0s);
}

@keyframes particleRise {
  0% {
    transform: translate(0,0) rotate(0);
    opacity: 0;
  }

  10% {
    opacity: .65;
  }

  85% {
    opacity: .65;
  }

  100% {
    transform: translate(var(--drift,25px),-110vh) rotate(420deg);
    opacity: 0;
  }
}

/* =====================================
   ENTRANCE ANIMATIONS
===================================== */

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 1s ease,
    transform 1.2s var(--ease);
}

.hero-ready .reveal {
  opacity: 1;
  transform: translateY(0);
}

.hero-eyebrow { transition-delay: .1s; }
.hero-title { transition-delay: .22s; }
.hero-description { transition-delay: .38s; }
.hero-actions { transition-delay: .52s; }
.hero-trust { transition-delay: .68s; }
.hero-visual { transition-delay: .32s; }

/* =====================================
   FOOTER STRIP
===================================== */

.hero-footer {
  position: absolute;
  z-index: 8;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(10,3,22,.45);
  border-top: 1px solid rgba(255,255,255,.13);
  backdrop-filter: blur(13px);
}

.hero-footer-inner {
  width: min(100% - 100px,1460px);
  min-height: 106px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.hero-event-date {
  display: flex;
  align-items: center;
  gap: 13px;
  flex-shrink: 0;
}

.date-icon {
  color: var(--green);
  font-size: 30px;
}

.hero-event-date > div {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.footer-label {
  color: rgba(255,255,255,.48);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .15em;
}

.hero-event-date strong {
  font-size: 12px;
  letter-spacing: .08em;
  color: var(--yellow);
}

.hero-microcopy {
  max-width: 480px;
  font-size: 11px;
  line-height: 1.8;
  color: rgba(255,255,255,.61);
}

.scroll-cue {
  display: inline-flex;
  align-items: center;
  gap: 17px;
  white-space: nowrap;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .13em;
  color: var(--white);
}

.scroll-arrow {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(86,239,131,.55);
  border-radius: 50%;
  color: var(--green);
  font-size: 19px;
  animation: arrowBounce 2s ease-in-out infinite;
}

@keyframes arrowBounce {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

/* =====================================
   BOOKING DIALOG
===================================== */

.booking-dialog {
  width: min(92%,510px);
  max-height: 85dvh;
  margin: auto;
  padding: 0;
  overflow-y: auto;
  background: #210B3A;
  color: var(--white);
  border: 1px solid rgba(86,239,131,.3);
  border-radius: 12px;
  box-shadow: 0 30px 90px rgba(0,0,0,.6);
}

.booking-dialog::backdrop {
  background: rgba(8,2,18,.82);
  backdrop-filter: blur(8px);
}

.dialog-inner {
  position: relative;
  padding: 40px 32px;
}

.dialog-close {
  position: absolute;
  top: 15px;
  right: 21px;
  background: transparent;
  border: none;
  color: var(--white);
  font-size: 30px;
  cursor: pointer;
}

.dialog-eyebrow {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .15em;
  color: var(--green);
}

.dialog-inner h2 {
  margin: 13px 0;
  font-family: var(--display);
  font-size: clamp(29px,5vw,40px);
  font-weight: 800;
  letter-spacing: -.05em;
}

.dialog-description {
  font-size: 13px;
  line-height: 1.8;
  color: var(--muted);
}

.booking-options {
  display: grid;
  gap: 10px;
  margin-top: 25px;
}

.booking-option {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: rgba(255,255,255,.04);
  color: var(--white);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 5px;
  text-align: left;
  cursor: pointer;
  transition: .3s ease;
}

.booking-option:hover,
.booking-option.selected {
  border-color: var(--green);
  background: rgba(86,239,131,.08);
}

.booking-option > span:first-child {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.booking-option strong {
  font-size: 13px;
  letter-spacing: .07em;
}

.booking-option small {
  font-size: 11px;
  color: var(--muted);
}

.booking-option > span:last-child {
  color: var(--yellow);
  font-size: 21px;
}

.dialog-note {
  font-size: 11px;
  line-height: 1.7;
  color: var(--green-soft);
  margin: 20px 0 0;
}

/* =====================================
   TABLET
===================================== */

@media (max-width: 1150px) {

  .navbar,
  .hero-container,
  .hero-footer-inner {
    width: calc(100% - 64px);
  }

  .nav-links {
    gap: 22px;
  }

  .nav-edition {
    display: none;
  }

  .hero-title {
    font-size: clamp(66px,7.5vw,104px);
  }

  .hero-visual {
    height: 470px;
  }

  .floating-tag {
    font-size: 8px;
    padding: 10px 12px;
  }

}

/* =====================================
   MOBILE NAVIGATION
===================================== */

@media (max-width: 860px) {

  .navbar {
    height: 76px;
  }

  .nav-links {
    position: fixed;
    top: 76px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0 32px;
    background: rgba(21,5,42,.98);
    backdrop-filter: blur(20px);
    visibility: hidden;
    opacity: 0;
    max-height: 0;
    overflow: hidden;

    transition:
      max-height .4s var(--ease),
      padding .35s ease,
      opacity .3s ease,
      visibility .3s ease;
  }

  .nav-links.open {
    visibility: visible;
    opacity: 1;
    max-height: 350px;
    padding: 15px 32px 28px;
    border-bottom: 1px solid rgba(255,255,255,.14);
  }

  .nav-link {
    padding: 15px 0;
    border-bottom: 1px solid rgba(255,255,255,.08);
    font-size: 14px;
  }

  .nav-link.active::after {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .hero-container {
    grid-template-columns: 1fr 0.8fr;
    gap: 0;
  }

  .hero-title {
    font-size: clamp(60px,8.5vw,82px);
  }

  .hero-visual {
    height: 430px;
  }

  .hero-footer-inner {
    gap: 20px;
  }

  .hero-microcopy {
    max-width: 330px;
  }

  .scroll-cue {
    display: none;
  }

}

/* =====================================
   MOBILE
===================================== */

@media (max-width: 640px) {

  .navbar,
  .hero-container,
  .hero-footer-inner {
    width: calc(100% - 38px);
  }

  .navbar {
    height: 70px;
  }

  .brand-symbol {
    font-size: 34px;
  }

  .brand-name strong {
    font-size: 19px;
  }

  .brand-name small {
    font-size: 6px;
  }

  .nav-book {
    padding: 11px 12px;
    gap: 10px;
    font-size: 9px;
  }

  .nav-book span {
    display: none;
  }

  .nav-links {
    top: 70px;
  }

  .nav-actions {
    gap: 10px;
  }

  .carnival-hero {
    min-height: 900px;
    height: auto;
  }

  .hero-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 113px 0 165px;
    gap: 0;
  }

  .hero-content {
    width: 100%;
    text-align: left;
  }

  .hero-eyebrow {
    font-size: 9px;
    letter-spacing: .09em;
    gap: 9px;
    margin-bottom: 21px;
  }

  .eyebrow-line {
    width: 18px;
  }

  .hero-title {
    font-size: clamp(57px,13.5vw,87px);
    line-height: .93;
  }

  .heading-last {
    font-size: .77em;
  }

  .hero-description {
    font-size: 13px;
    line-height: 1.75;
    margin-top: 22px;
  }

  .hero-actions {
    margin-top: 26px;
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
    min-height: 56px;
    font-size: 10px;
    padding: 8px 8px 8px 18px;
  }

  .btn-arrow {
    width: 38px;
    height: 38px;
  }

  .hero-trust {
    width: 100%;
    margin-top: 22px;
    padding: 12px;
  }

  .hero-trust p {
    font-size: 11px;
  }

  .hero-visual {
    width: min(100%,420px);
    height: 330px;
    margin: 12px auto -8px;
  }

  .mask-float {
    width: 90%;
  }

  .carnival-mask {
    max-height: 350px;
  }

  .mask-circle-one {
    width: 75%;
  }

  .mask-circle-two {
    width: 94%;
  }

  .floating-tag {
    font-size: 7px;
    letter-spacing: .06em;
    padding: 9px;
  }

  .tag-top {
    left: 0;
    top: 12%;
  }

  .tag-bottom {
    right: 0;
    bottom: 10%;
  }

  .star-one {
    font-size: 27px;
  }

  .star-two,
  .star-three {
    font-size: 20px;
  }

  .visual-year {
    font-size: 94px;
    bottom: -5px;
  }

  .hero-footer {
    position: absolute;
    bottom: 0;
  }

  .hero-footer-inner {
    min-height: 115px;
    padding: 18px 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 11px;
  }

  .date-icon {
    font-size: 24px;
  }

  .footer-label {
    font-size: 8px;
  }

  .hero-event-date strong {
    font-size: 11px;
  }

  .hero-microcopy {
    max-width: 100%;
    font-size: 10px;
    line-height: 1.6;
  }

  .dialog-inner {
    padding: 35px 21px;
  }

}

/* =====================================
   VERY SMALL PHONES
===================================== */

@media (max-width: 380px) {

  .hero-title {
    font-size: 13vw;
  }

  .hero-description {
    font-size: 12px;
  }

  .brand-name strong {
    font-size: 16px;
  }

  .brand-symbol {
    font-size: 30px;
  }

  .hero-visual {
    height: 280px;
  }

}

/* =====================================
   REDUCED MOTION
===================================== */

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }

  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }

}
