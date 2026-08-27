import fs from 'fs';

const filePath = 'c:/Users/rishi/MAJIN/Website/components/scanfeast/scanfeast-case-study.css';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const newCss = `/* =========================================================
   SCANFEAST CINEMATIC SYSTEM
   ========================================================= */

.sf-cinematic {
  position: relative;
  width: 100%;
}

.sf-cinematic__sticky {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
}

.sf-cinematic__scene {
  position: relative;
  width: 100%;
  height: 100%;

  overflow: hidden;

  border: 1px solid var(--sf-line);

  background:
    radial-gradient(
      circle at 50% 50%,
      rgba(255, 106, 0, 0.075),
      transparent 35%
    ),
    linear-gradient(
      180deg,
      #0d1117,
      #07090c
    );
}

/* subtle technical grid */

.sf-cinematic__scene::before {
  content: "";

  position: absolute;
  inset: 0;

  pointer-events: none;

  background:
    linear-gradient(
      rgba(255, 255, 255, 0.025) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.025) 1px,
      transparent 1px
    );

  background-size:
    70px 70px;

  mask-image:
    radial-gradient(
      circle at center,
      black,
      transparent 78%
    );
}

/* =========================================================
   COPY
   ========================================================= */

.sf-scene-copy {
  position: absolute;
  z-index: 20;

  top: 18%;

  width: min(350px, 30vw);
}

.sf-scene-copy--left {
  left: 7%;
}

.sf-scene-copy--right {
  right: 7%;
  text-align: right;
}

.sf-scene-copy span {
  color: var(--sf-orange);

  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Consolas,
    monospace;

  font-size: 8px;
  letter-spacing: 0.15em;
}

.sf-scene-copy h3 {
  margin: 18px 0 0;

  font-size:
    clamp(34px, 4vw, 64px);

  line-height: 0.86;

  letter-spacing: -0.07em;
}

.sf-scene-copy p {
  max-width: 330px;

  margin-top: 22px;

  color: var(--sf-muted);

  font-size: 12px;
  line-height: 1.8;
}

/* =========================================================
   TABLE
   ========================================================= */

.sf-table-object {
  position: absolute;

  z-index: 5;

  left: 50%;
  top: 61%;

  width:
    min(520px, 45vw);

  aspect-ratio: 1.7;

  transform-origin: center;

  transition: opacity 100ms linear;
}

.sf-table-object__top {
  position: absolute;
  inset: 0;

  border-radius: 28px;

  border:
    1px solid
    rgba(255, 255, 255, 0.16);

  background:
    radial-gradient(
      circle at center,
      rgba(255, 106, 0, 0.1),
      transparent 45%
    ),
    linear-gradient(
      145deg,
      #1a2028,
      #0c1015
    );

  box-shadow:
    inset 0 0 40px
      rgba(255, 255, 255, 0.03),

    0 90px 120px
      rgba(0, 0, 0, 0.58);
}

.sf-table-object__inner {
  position: absolute;
  inset: 7%;

  border-radius: 20px;

  border:
    1px solid
    rgba(255, 255, 255, 0.055);
}

.sf-table-object__qr {
  position: absolute;

  left: 50%;
  top: 50%;

  transform:
    translate(-50%, -50%)
    rotateX(-58deg)
    rotateZ(7deg);

  display: grid;

  grid-template-columns:
    repeat(3, 18px);

  gap: 5px;

  padding: 13px;

  border-radius: 5px;

  background: #f4f6f8;
}

.sf-table-object__qr span {
  width: 18px;
  height: 18px;

  background: #07090c;
}

.sf-table-object__qr span:nth-child(2),
.sf-table-object__qr span:nth-child(5),
.sf-table-object__qr span:nth-child(8) {
  opacity: 0.4;
}

.sf-table-object__top small {
  position: absolute;

  left: 50%;
  bottom: 7%;

  transform:
    translateX(-50%)
    rotateX(-58deg);

  color:
    rgba(255, 255, 255, 0.32);

  font:
    7px
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Consolas,
    monospace;

  letter-spacing: 0.15em;
}

.sf-table-object__leg {
  position: absolute;

  width: 40px;
  height: 150px;

  top: 72%;

  background:
    linear-gradient(
      90deg,
      #080b0e,
      #1a2027,
      #080b0e
    );

  transform-origin: top;
}

.sf-table-object__leg--a {
  left: 18%;
  transform: rotate(4deg);
}

.sf-table-object__leg--b {
  right: 18%;
  transform: rotate(-4deg);
}

/* =========================================================
   DEVICES
   ========================================================= */

.sf-device {
  position: absolute;

  z-index: 15;

  left: 50%;
  top: 52%;
}

.sf-device--phone {
  width:
    min(290px, 24vw);
}

.sf-device__phone-frame {
  position: relative;

  padding: 9px;

  border-radius: 36px;

  border:
    1px solid
    rgba(255, 255, 255, 0.16);

  background:
    linear-gradient(
      145deg,
      #303741,
      #0b0e12
    );

  box-shadow:
    0 70px 100px
      rgba(0, 0, 0, 0.65);
}

.sf-device__speaker {
  position: absolute;

  z-index: 10;

  top: 10px;
  left: 50%;

  width: 90px;
  height: 20px;

  transform:
    translateX(-50%);

  border-radius: 30px;

  background: #050607;
}

.sf-device__screen {
  position: relative;

  height: 570px;

  overflow: hidden;

  border-radius: 27px;

  background: #fff;
}

.sf-device__screen img {
  position: absolute;

  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: contain;

  transition:
    opacity 80ms linear;
}

/* =========================================================
   KDS MONITOR
   ========================================================= */

.sf-device--kds {
  left: 42%;
  top: 55%;

  width:
    min(770px, 58vw);
}

.sf-device__monitor-shell {
  padding: 13px;

  border-radius: 20px;

  border:
    1px solid
    rgba(255, 255, 255, 0.15);

  background:
    linear-gradient(
      145deg,
      #313842,
      #0b0e12
    );

  box-shadow:
    0 80px 120px
      rgba(0, 0, 0, 0.65);
}

.sf-device__screen--wide {
  position: relative;

  height:
    min(470px, 35vw);

  border-radius: 11px;

  overflow: hidden;

  background: white;
}

.sf-device__screen--wide img {
  object-fit: cover;
}

.sf-device__stand {
  width: 130px;
  height: 35px;

  margin: 0 auto;

  border-radius:
    0 0 14px 14px;

  background:
    linear-gradient(
      180deg,
      #252b32,
      #0e1115
    );
}

.sf-kds-live-overlay {
  position: absolute;

  inset: auto 30px 30px 30px;

  padding: 18px;

  border-radius: 14px;

  background:
    rgba(7, 9, 12, 0.9);

  border:
    1px solid
    rgba(255, 106, 0, 0.3);

  backdrop-filter: blur(20px);
}

.sf-kds-live-overlay__bar {
  display: flex;
  justify-content: space-between;

  font:
    9px
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Consolas,
    monospace;
}

.sf-kds-live-overlay__bar span {
  color:
    var(--sf-orange);
}

.sf-kds-live-overlay__timer {
  margin-top: 9px;

  font-size: 45px;

  letter-spacing: -0.06em;
}

/* =========================================================
   MICRO FLOW
   ========================================================= */

.sf-scene-microcopy {
  position: absolute;

  z-index: 30;

  left: 50%;
  bottom: 11%;

  display: flex;
  align-items: center;
  gap: 14px;

  transform:
    translateX(-50%);

  white-space: nowrap;
}

.sf-scene-microcopy span {
  color:
    rgba(255, 255, 255, 0.6);

  font:
    7px
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Consolas,
    monospace;

  letter-spacing: 0.13em;
}

.sf-scene-microcopy span:first-child {
  color:
    var(--sf-orange);
}

.sf-scene-microcopy i {
  width: 28px;
  height: 1px;

  background:
    rgba(255, 255, 255, 0.16);
}

/* =========================================================
   KITCHEN FLOW
   ========================================================= */

.sf-kitchen-flow {
  position: absolute;

  left: 42%;
  bottom: 10%;

  transform:
    translateX(-50%);

  display: flex;
  align-items: center;
  gap: 15px;

  white-space: nowrap;
}

.sf-kitchen-flow span {
  font:
    7px
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Consolas,
    monospace;

  color:
    rgba(255, 255, 255, 0.55);

  letter-spacing: 0.13em;
}

.sf-kitchen-flow span:last-child {
  color:
    var(--sf-orange);
}

.sf-kitchen-flow i {
  width: 34px;
  height: 1px;

  background:
    rgba(255, 255, 255, 0.16);
}

/* =========================================================
   SERVER TRANSITION
   ========================================================= */

.sf-server-transition {
  position: absolute;

  z-index: 30;

  right: 7%;
  top: 55%;

  width:
    min(380px, 31vw);
}

.sf-server-transition__screen {
  overflow: hidden;

  border-radius: 16px;

  border:
    1px solid
    rgba(255, 255, 255, 0.13);

  box-shadow:
    0 50px 90px
    rgba(0, 0, 0, 0.5);
}

.sf-server-transition__screen img {
  display: block;

  width: 100%;
  height: auto;
}

.sf-server-transition__label {
  margin-top: 12px;

  color:
    var(--sf-orange);

  font:
    7px
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Consolas,
    monospace;

  letter-spacing: 0.14em;
}

/* =========================================================
   MANAGER
   ========================================================= */

.sf-dashboard-object {
  position: absolute;

  z-index: 15;

  left: 55%;
  top: 54%;

  width:
    min(930px, 66vw);
}

.sf-dashboard-object__bezel {
  padding: 13px;

  border-radius: 19px;

  background:
    linear-gradient(
      145deg,
      #333a43,
      #0b0e12
    );

  border:
    1px solid
    rgba(255, 255, 255, 0.16);

  box-shadow:
    0 80px 130px
      rgba(0, 0, 0, 0.68);
}

.sf-dashboard-object__screen {
  overflow: hidden;

  border-radius: 8px;

  background: white;
}

.sf-dashboard-object__screen img {
  display: block;

  width: 100%;
  height: auto;
}

.sf-manager-metrics {
  position: absolute;

  z-index: 30;

  left: 7%;
  bottom: 11%;

  display: flex;
  gap: 8px;
}

.sf-manager-metrics article {
  min-width: 105px;

  padding: 15px;

  border:
    1px solid
    rgba(255, 255, 255, 0.1);

  background:
    rgba(13, 17, 23, 0.82);

  backdrop-filter: blur(16px);
}

.sf-manager-metrics strong {
  display: block;

  font:
    7px
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Consolas,
    monospace;

  color: var(--sf-orange);

  letter-spacing: 0.1em;
}

.sf-manager-metrics span {
  display: block;

  margin-top: 7px;

  color:
    rgba(255, 255, 255, 0.45);

  font-size: 9px;
}

/* =========================================================
   NEXT SCENE
   ========================================================= */

.sf-next-scene-hint {
  position: absolute;

  z-index: 30;

  right: 8%;
  bottom: 10%;

  display: grid;
  gap: 7px;

  text-align: right;
}

.sf-next-scene-hint span {
  color:
    rgba(255, 255, 255, 0.3);

  font:
    7px
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Consolas,
    monospace;
}

.sf-next-scene-hint strong {
  color:
    var(--sf-orange);

  font-size: 18px;

  letter-spacing: -0.04em;
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 900px) {
  .sf-scene-copy {
    width: 260px;
  }

  .sf-device--phone {
    width: 235px;
  }

  .sf-device__screen {
    height: 470px;
  }

  .sf-table-object {
    width: 390px;
  }

  .sf-device--kds {
    left: 50%;
    top: 58%;

    width: 72vw;
  }

  .sf-server-transition {
    right: 5%;
    top: auto;
    bottom: 17%;

    width: 280px;
  }

  .sf-dashboard-object {
    left: 57%;

    width: 72vw;
  }
}

@media (max-width: 640px) {
  .sf-cinematic__scene {
    min-height: 620px;
  }

  .sf-scene-copy {
    top: 8%;
    left: 20px;
    right: 20px;

    width: auto;

    text-align: left;
  }

  .sf-scene-copy h3 {
    font-size: 34px;
  }

  .sf-scene-copy p {
    max-width: 300px;
  }

  .sf-table-object {
    width: 320px;
    top: 59%;
  }

  .sf-device--phone {
    top: 53%;
    width: 205px;
  }

  .sf-device__screen {
    height: 420px;
  }

  .sf-scene-microcopy {
    bottom: 8%;
  }

  .sf-kitchen-flow {
    left: 50%;
    bottom: 8%;

    gap: 9px;
  }

  .sf-kitchen-flow i {
    width: 18px;
  }

  .sf-kitchen-flow span {
    font-size: 6px;
  }

  .sf-device--kds {
    width: 91vw;
  }

  .sf-server-transition {
    display: none;
  }

  .sf-dashboard-object {
    left: 50%;
    top: 57%;

    width: 94vw;
  }

  .sf-manager-metrics {
    left: 20px;
    bottom: 7%;
  }

  .sf-manager-metrics article {
    min-width: 85px;
    padding: 10px;
  }
}`;

const prefix = lines.slice(0, 113).join('\n'); // lines 1 to 113 (0-indexed to 112)
const suffix = lines.slice(963).join('\n'); // lines 964 to end (0-indexed from 963)

const finalContent = prefix + '\n\n' + newCss + '\n\n' + suffix;

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('CSS Replaced successfully');
