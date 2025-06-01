const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const scoreCard = document.getElementById("score");
const high = document.getElementById("high");
const fault_div = document.getElementById("fault_div");
const elapsed_div = document.getElementById("elapsed_div");
const squashed_div = document.getElementById("squashed_div");
const start = document.getElementById("start");
const start_section_wrapper = document.getElementById("start-section-wrapper");
const info = document.getElementById("info");
const keypad = document.getElementById("keypad");
const themesSelect = document.getElementById("themes");
const log_button = document.getElementById("showlog");
const game_canvas = document.getElementById("game-canvas");
const logpanel = document.getElementById("logpanel");
const display_log = document.getElementById("display_log");
const about = document.getElementById("about");
const aboutpanel = document.getElementById("aboutpanel");
const settings = document.getElementById("settingspanel");
const toggleButton = document.getElementById("soundtoggle");
const toggleSwitchCircle = document.getElementById("toggleSwitchCircle");
const sortLog = document.getElementById("sort_log");

let sound =
  localStorage.getItem("sound") === null
    ? true
    : JSON.parse(localStorage.getItem("sound"));

toggleSwitch(sound);

toggleButton.onclick = function () {
  sound = !sound;
  toggleSwitch(sound);
  localStorage.setItem("sound", sound);
};

function toggleSwitch(on) {
  if (on) {
    toggleButton.classList.add("on");
  } else {
    toggleButton.classList.remove("on");
  }
}

let pop = new Howl({
  src: ["./sounds/pops.wav"],
  volume: 0.2,
});

let dundundun = new Howl({
  src: ["./sounds/dun-dun-dun.mp3"],
});

let glug = new Howl({
  src: ["./sounds/disable.mp3"],
  volume: 0.2,
});

let pfff = new Howl({
  src: ["./sounds/pfff.mp3"],
  volume: 0.2,
});

let fanfare = new Howl({
  src: ["./sounds/fanfare.mp3"],
  volume: 0.2,
});

let switchon = new Howl({
  src: ["./sounds/switch-on.mp3"],
  volume: 0.2,
});

let highScore = localStorage.getItem("high");
let ru = localStorage.getItem("ru");
let savedTheme = localStorage.getItem("theme");
let log = JSON.parse(localStorage.getItem("log") || "[]");
if (highScore) high.innerText = "Best Score: " + highScore;
info.style.display = "none";
if (ru) {
  hide_about();
} else {
  show_about();
}
const scale = window.devicePixelRatio;

let bytes;
let gameOn;
let byteId;
let radius;
let speed;
let waitCounter;
let waitLimit;
let input = [];
let inputDecimal;
let score;
let explosions;
let squashed;
let startTime;
let elapsed;
let fault;

let theme;
let explosionColor;
let color0;
let color1;
let opacity;

const themes = {
  basic: {
    canvasBackground: "#eeeeee",
    color0: "#222222",
    color1: "#222222",
    explosionColor: ["black", "gray"],
  },
  grass: {
    canvasBackground: "green",
    color0: "lightyellow",
    color1: "lightyellow",
    explosionColor: ["lightyellow", "lightgreen", "chartreuse", "greenyellow"],
  },
  homebrew: {
    canvasBackground: "#222",
    color0: "#39ff14",
    color1: "#39ff14",
    explosionColor: ["lightyellow", "lightgreen", "chartreuse", "greenyellow"],
  },
  manpage: {
    canvasBackground: "#FFFAA0",
    color0: "#222",
    color1: "#222",
    explosionColor: ["red", "yellow", "orange", "white"],
  },
  ocean: {
    canvasBackground: "#113366",
    color0: "#eeeeee",
    color1: "#eeeeee",
    explosionColor: ["aquamarine", "dodgerblue", "#eeeeee", "skyblue"],
  },
  redsands: {
    canvasBackground: "#b35656",
    color0: "#dee0b0",
    color1: "#dee0b0",
    explosionColor: ["red", "yellow", "orange", "#dee0b0"],
  },
  circles: {
    canvasBackground: "#444",
    background0: "#000",
    background1: "white",
    color0: "white",
    color1: "#000",
    explosionColor: ["#ffaa00", "yellow", "gold"],
  },
};
theme = savedTheme ? savedTheme : "circles";
themesSelect.value = theme;
function init() {
  bytes = [];
  gameOn = false;
  byteId = 0;
  radius = 24;
  speed = 0.4;
  waitCounter = 2 * radius;
  waitLimit = waitCounter;
  input = [];
  inputDecimal = null;
  score = 0;
  explosions = [];
  squashed = [];
  elapsed = 0;
  fault = 0;

  explosionColor = themes[theme].explosionColor;
  color0 = themes[theme].color0;
  color1 = themes[theme].color1;
  canvas.style.backgroundColor = themes[theme].canvasBackground;
  opacity = 0;
  scoreCard.classList.remove("best");
}

init();

const applyTheme = (theme) => {
  explosionColor = themes[theme].explosionColor;
  color0 = themes[theme].color0;
  color1 = themes[theme].color1;
  canvas.style.backgroundColor = themes[theme].canvasBackground;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  let x = canvas.width / (2 * scale) - 7 * radius - 3;
  let y = 2 * radius;
  let binary = decimalToBinary(85);
  let byte = new Byte(x, y, 85, binary, radius);
  byte.render(context);
  localStorage.setItem("theme", theme);
};

let levelMetaData = [
  { min: 1, max: 16, speed: 0.4 },
  { min: 1, max: 32, speed: 0.5 },
  { min: 1, max: 64, speed: 0.6 },
  { min: 1, max: 128, speed: 0.7 },
  { min: 1, max: 255, speed: 0.8 },
];

const getLevel = (score) => {
  let level = 0;
  if (score <= 150) {
    level = 0;
  } else if (score <= 250) {
    level = 1;
  } else if (score <= 500) {
    level = 2;
  } else if (score <= 1000) {
    level = 3;
  } else {
    level = 4;
  }
  return level;
};

const resizeCanvas = (context) => {
  const canvas = context.canvas;
  if (canvas) {
    canvas.width = Math.floor(400 * scale);
    canvas.height = Math.floor(400 * scale);
    context.scale(scale, scale);
  }
};

const getDecimalBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const decimalToBinary = (decimal) => {
  return decimal.toString(2).padStart(8, "0").split("");
};

class Byte {
  constructor(x, y, decimal, binary, radius) {
    this.id = byteId++;
    this.x = x;
    this.y = y;
    this.decimal = decimal;
    this.bits = [];
    this.radius = radius;
    this.binary = binary;
    this.makeBits(binary);
  }
  makeBits = function (binary) {
    for (const value of binary) {
      let bit = new Bit(this.x, this.y, value, this.radius);
      this.x = this.x + 2 * this.radius + 1;
      this.bits.push(bit);
    }
  };
  render = function (context) {
    for (const bit of this.bits) {
      bit.y = this.y;
      bit.render(context);
    }
  };
  move = function (speed) {
    this.y += speed;
  };
}

class Bit {
  constructor(x, y, value, radius) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.radius = radius;
  }
  render = function (context) {
    if (theme === "circles") {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      context.fillStyle =
        this.value === "1"
          ? themes[theme].background1
          : themes[theme].background0;
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = this.value === "1" ? color1 : color0;
      context.stroke();
      context.closePath();
    }

    context.fillStyle = this.value === "1" ? color1 : color0;
    context.font = "24px Helvetica";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(this.value, this.x, this.y);
  };
}

const spawnByte = (meta) => {
  waitCounter += meta.speed;
  if (waitCounter < waitLimit) return;

  waitCounter = 0;
  let decimal = getDecimalBetween(meta.min, meta.max);
  let x = canvas.width / (2 * scale) - 7 * radius - 3;
  let y = -radius;
  let binary = decimalToBinary(decimal);
  let byte = new Byte(x, y, decimal, binary, radius);
  bytes.push(byte);
};

const render = () => {
  if (context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    elapsed = parseInt((new Date() - startTime) / 1000);
    let level = getLevel(score);
    let meta = levelMetaData[level];
    spawnByte(meta);
    renderBytes(meta.speed);

    if (inputDecimal) {
      let matched = matchDecimal(inputDecimal);
      let p = 0;
      if (matched.length > 0) {
        filterMatchedBytes(matched);
        p = inputDecimal * matched.length;
        for (const byte of matched) {
          squashed.push({
            d: byte.decimal,
            b: byte.binary.join(""),
          });
        }
      } else {
        p = -5;
        fault++;
        info.innerText = "FOUL!";
        if (sound) glug.play();
      }
      score = score + p;
      inputDecimal = null;
    }

    renderExplosions();

    let animationFrameId = window.requestAnimationFrame(render);

    let firstByte = bytes[0];
    if (
      firstByte &&
      firstByte?.y + firstByte?.radius >
        context.canvas.height / window.devicePixelRatio
    ) {
      window.cancelAnimationFrame(animationFrameId);
      gameover();
    }

    show_stats();
  }
};

function show_stats() {
  scoreCard.innerText = score.toString();
  squashed_div.innerHTML = squashed.length;
  fault_div.innerText = fault.toString();
  if (highScore) high.innerText = "Best Score: " + highScore;
  if (score > (parseInt(highScore) || 0)) scoreCard.classList.add("best");
  //elapsed_div.innerHTML = elapsed.toString();
}

const countdown = (count) => {
  if (context) {
    let title = count;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    writetext(title, "white");
  }
};

function writetext(text, fill) {
  context.fillStyle = fill;
  context.font = "40px monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(
    text,
    context.canvas.width / window.devicePixelRatio / 2 - text.length / 2,
    context.canvas.height / window.devicePixelRatio / 2
  );
}

const blowUp = () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  let fill = "rgba(255, 255, 255, " + opacity + ")";
  writetext("Squash Byte", fill);
  opacity = opacity + 0.05;
  renderExplosions();
  let end = window.requestAnimationFrame(blowUp);
  if (explosions.length <= 0) {
    window.cancelAnimationFrame(end);
    startgame(-1);
  }
};

const renderBytes = (speed) => {
  for (const byte of bytes) {
    byte.move(speed);
    byte.render(context);
  }
};

const matchDecimal = (decimal) => {
  let matched = [];
  for (const [index, byte] of bytes.entries()) {
    if (byte.decimal === decimal && byte.y + byte.radius > 0) {
      matched.push(byte);
      if (sound) pop.play();
      eraseByte(byte);
      shiftBytes(index);
    }
  }
  return matched;
};

const eraseByte = (byte) => {
  let bits = byte?.bits;
  if (bits) {
    for (const bit of bits) {
      clearCircle(bit.x, bit.y, bit.radius);
      explosions.push(new Explosion(bit.x, bit.y, 10));
    }
  }
};

function clearCircle(x, y, r) {
  for (var i = 0; i < Math.round(Math.PI * r); i++) {
    var angle = (i / Math.round(Math.PI * r)) * 360;
    context.clearRect(
      x,
      y,
      Math.sin(angle * (Math.PI / 180)) * r,
      Math.cos(angle * (Math.PI / 180)) * r
    );
  }
}

const shiftBytes = (index) => {
  for (let c = index; c >= 0; c--) {
    let byteToShift = bytes[c];
    byteToShift.y = byteToShift.y - 2 * byteToShift.radius;
    byteToShift.render(context);
  }
};

const filterMatchedBytes = (matched) => {
  bytes = bytes.filter((b) => !matched.find(({ id }) => b.id === id));
};

resizeCanvas(context);

class Particle {
  constructor(x, y) {
    const particlesMinSpeed = 1;
    const particlesMaxSpeed = 5;
    const particlesMinSize = 1;
    const particlesMaxSize = 4;
    this.x = x;
    this.y = y;
    this.xv = this.rand(particlesMinSpeed, particlesMaxSpeed, false);
    this.yv = this.rand(particlesMinSpeed, particlesMaxSpeed, false);
    this.size = this.rand(particlesMinSize, particlesMaxSize, true);
    this.r = this.rand(113, 222);
    this.g = "00";
    this.b = this.rand(105, 255);
  }
  rand(min, max, positive) {
    let num;
    if (positive === false) {
      num = Math.floor(Math.random() * max) - min;
      num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    } else {
      num = Math.floor(Math.random() * max) + min;
    }

    return num;
  }
}

class Explosion {
  constructor(x, y, particlesPerExplosion) {
    this.particles = [];
    this.x = x;
    this.y = y;
    for (let i = 0; i < particlesPerExplosion; i++) {
      this.particles.push(new Particle(x, y));
    }
  }
}

function renderExplosions() {
  if (explosions.length === 0) {
    return;
  }
  for (let i = 0; i < explosions.length; i++) {
    const explosion = explosions[i];
    const particles = explosion.particles;

    if (particles.length === 0) {
      explosions.splice(i, 1);
      return;
    }

    const particlesAfterRemoval = particles.slice();
    for (let pi = 0; pi < particles.length; pi++) {
      const particle = particles[pi];

      if (particle.size <= 0) {
        particlesAfterRemoval.splice(pi, 1);
        continue;
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, Math.PI * 2, 0, false);
      context.closePath();
      context.fillStyle =
        explosionColor[Math.floor(Math.random() * explosionColor.length)];
      context.fill();

      // Update
      particle.x += particle.xv;
      particle.y += particle.yv;
      particle.size -= 0.1;
    }

    explosion.particles = particlesAfterRemoval;
  }
}

const setDecimal = (v) => {
  inputDecimal = parseInt(v);
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function wait(wait_time) {
  for (let i = wait_time; i >= -1; i--) {
    let c = i <= 0 ? "Squash Byte" : i.toString();
    countdown(c);
    if (i === 0) {
      if (sound) dundundun.play();
    }
    await sleep(1000);
  }
}

function startgame(wait_time) {
  //keypad.style.visibility = "visible";
  init();
  show_stats();
  wait(wait_time).then(() => {
    gameOn = true;
    startTime = new Date();
    render();
  });
}

function gameover() {
  gameOn = false;
  //keypad.style.visibility = "hidden";
  clear_buttons();
  input = [];
  start_section_wrapper.style.display = "block";
  info.style.display = "none";
  if (!highScore) highScore = 0;

  if (score > parseInt(highScore)) {
    highScore = score;
    localStorage.setItem("high", highScore.toString());
    let ll = JSON.parse(localStorage.getItem("log") || "[]");
    if (ll.length > 0) {
      if (sound) fanfare.play();
    }
  }

  log.push({
    d: new Date(),
    t: elapsed,
    f: fault,
    p: score,
    s: squashed.length,
  });
  localStorage.setItem("log", JSON.stringify(log));
  for (const byte of bytes) {
    for (const bit of byte?.bits) {
      explosions.push(new Explosion(bit.x, bit.y, 20));
    }
  }
}

function clear_buttons() {
  let buttons = Array.from(document.querySelectorAll(".key-pad-button"));
  buttons.forEach((node) => {
    node.classList.remove("clicked");
  });
  info.innerText = "";
}

function highlight_button(v) {
  let buttons = Array.from(document.querySelectorAll(".key-pad-button"));
  buttons.forEach((node) => {
    if (node.value === v) node.classList.add("clicked");
  });
}

function show_log(sort_by) {
  game_canvas.style.display = "none";
  logpanel.style.display = "block";
  display_log.replaceChildren();
  let current_log = JSON.parse(localStorage.getItem("log") || "[]");
  if (current_log.length > 0) {
    let table = document.createElement("table");
    let tr = document.createElement("tr");
    let h = document.createElement("th");
    h.innerText = "#";
    h.className = "left-align";
    tr.appendChild(h);
    let h1 = document.createElement("th");
    h1.innerText = "Date";
    h1.className = "left-align";
    tr.appendChild(h1);
    let h2 = document.createElement("th");
    h2.className = "right-align";
    h2.innerText = "Duration";
    tr.appendChild(h2);
    let h5 = document.createElement("th");
    h5.className = "right-align";
    h5.innerText = "Squashes";
    tr.appendChild(h5);
    let h3 = document.createElement("th");
    h3.className = "right-align";
    h3.innerText = "Fouls";
    tr.appendChild(h3);
    let h4 = document.createElement("th");
    h4.className = "right-align";
    h4.innerText = "Score";
    tr.appendChild(h4);
    let h6 = document.createElement("th");
    h6.className = "right-align";
    h6.innerText = "S/R";
    tr.appendChild(h6);

    table.appendChild(tr);
    let count = 1;
    switch (sort_by) {
      case "score":
        current_log.sort((a, b) => b.p - a.p);
        break;
      case "date":
        current_log.sort((a, b) => b.d - a.d);
        break;
      case "squashes":
        current_log.sort((a, b) => b.s - a.s);
        break;
      case "fouls":
        current_log.sort((a, b) => b.f - a.f);
        break;
      case "duration":
        current_log.sort((a, b) => b.t - a.t);
        break;
      default:
        current_log.sort((a, b) => b.d - a.d);
    }

    for (const log of current_log) {
      let tr = document.createElement("tr");
      if (log.p === (parseInt(highScore) || 0)) {
        tr.className = "high-score-row";
      }
      let h = document.createElement("td");
      h.innerText = count.toString();
      count++;
      tr.appendChild(h);

      let h1 = document.createElement("td");
      const m = new Date(log.d);
      let year = m.toLocaleDateString("en", { year: "2-digit" });
      let dateString =
        m.getMonth() +
        "/" +
        m.getDate() +
        "/" +
        year +
        " " +
        ("0" + m.getHours()).slice(-2) +
        ":" +
        ("0" + m.getMinutes()).slice(-2) +
        "";
      h1.innerText = dateString;
      tr.appendChild(h1);
      let h2 = document.createElement("td");
      h2.className = "right-align";
      h2.innerText = log.t;
      tr.appendChild(h2);
      let h5 = document.createElement("td");
      h5.className = "right-align";
      h5.innerText = log?.s;
      tr.appendChild(h5);
      let h3 = document.createElement("td");
      h3.className = "right-align";
      h3.innerText = log.f;
      tr.appendChild(h3);
      let h4 = document.createElement("td");
      h4.className = "right-align";
      h4.innerText = log.p;
      tr.appendChild(h4);
      let h6 = document.createElement("td");
      h6.className = "right-align";
      h6.innerText =
        log.s + log.f > 0 ? Math.round(log.p / (log.s + log.f), 2) : 0;
      tr.appendChild(h6);

      table.appendChild(tr);
    }
    display_log.appendChild(table);
  } else {
    let no = document.createElement("div");
    no.innerHTML = "empty";
    display_log.appendChild(no);
  }
}
function hide_log() {
  game_canvas.style.display = "block";
  logpanel.style.display = "none";
}

function show_about() {
  game_canvas.style.display = "none";
  aboutpanel.style.display = "block";
}

function hide_about() {
  game_canvas.style.display = "block";
  aboutpanel.style.display = "none";
  localStorage.setItem("ru", true);
}

function show_settings() {
  game_canvas.style.display = "none";
  settings.style.display = "block";
}

function hide_settings() {
  game_canvas.style.display = "block";
  settings.style.display = "none";
}

window.addEventListener(
  "keydown",
  (event) => {
    const isValid = /^[0-9]$/i.test(event.key);
    if (sound && event.key != "Enter") switchon.play();
    if (gameOn) {
      if (isValid && input.length < 3) {
        //highlight_button(event.key);
        input.push(event.key);
      }
      if (event.key === "Enter") {
        //clear_buttons();
        if (input.length > 0) {
          setDecimal(input.join(""));
        }
        input = [];
      }
      if (event.key === "Delete" || event.key === "Backspace") {
        //clear_buttons();
        input.pop();
      }
      info.innerText = input.join("");
    }
  },
  true
);

document.addEventListener(
  "input",
  function (event) {
    if (event.target.id !== "themes") return;
    theme = event.target.value;
    applyTheme(theme);
  },
  false
);

sortLog.addEventListener("change", function (event) {
  const sort_by = event.target.value;
  show_log(sort_by);
});

document.addEventListener(
  "click",
  function (event) {
    if (
      (gameOn && event.target.classList.contains("key-pad-button")) ||
      event.target.className === "key-pad-button-submit"
    ) {
      let value = event.target.value;
      if (sound && value != "submit") switchon.play();
      const isValid = /^[0-9]$/i.test(value);
      if (isValid && input.length < 3) {
        //event.target.classList.add("clicked");
        input.push(value);
      }
      if (value === "submit") {
        if (input.length > 0) {
          //clear_buttons();
          setDecimal(input.join(""));
        }
        input = [];
      }
      if (value === "clear") {
        //clear_buttons();
        input.pop();
      }
      info.innerText = input.join("");
    }
    if (!gameOn && event.target.id === "start") {
      clear_buttons();
      start_section_wrapper.style.display = "none";
      info.style.display = "block";
      if (explosions.length > 0) {
        if (sound) {
          pfff.play();
        }
        blowUp();
      } else startgame(3);
    }
    if (!gameOn && event.target.id === "showlog") {
      show_log("date");
    }
    if (!gameOn && event.target.id === "about") {
      show_about();
    }
    if (event.target.id === "closeabout") {
      hide_about();
    }
    if (!gameOn && event.target.id === "settings") {
      show_settings();
    }
    if (event.target.id === "closesettings") {
      hide_settings();
    }

    if (event.target.id === "back") {
      hide_log();
    }
  },
  false
);
