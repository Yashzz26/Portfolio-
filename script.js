// ================= Smooth Typing Effect with Multiple Phrases =================
const tagline = document.querySelector("header p");
const phrases = [
  "Aspiring Front-End Web Developer",
  "Creative Problem Solver",
  "Passionate Coder",
  "Tech Enthusiast",
];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let typingSpeed = 60; // lower = faster typing
let pauseTime = 1200; // pause before deleting/typing

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];
  tagline.innerHTML =
    currentPhrase.substring(0, letterIndex) + `<span class="cursor">|</span>`;

  if (!isDeleting && letterIndex < currentPhrase.length) {
    letterIndex++;
    setTimeout(typeWriter, typingSpeed);
  } else if (isDeleting && letterIndex > 0) {
    letterIndex--;
    setTimeout(typeWriter, typingSpeed);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeWriter, pauseTime);
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, typingSpeed);
    }
  }
}
typeWriter();

// ================= Cursor Blink Style =================
const style = document.createElement("style");
style.innerHTML = `
.cursor {
    display: inline-block;
    animation: blink 1s infinite;
}
@keyframes blink {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0; }
}
`;
document.head.appendChild(style);

// ================= Scroll Reveal Animation =================
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.1 }
);
fadeElements.forEach((el) => observer.observe(el));

// ================= Skill Bar Animation =================
const skillBars = document.querySelectorAll(".fill");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const percent = entry.target.getAttribute("data-percent");
        entry.target.style.width = percent + "%";
      }
    });
  },
  { threshold: 0.5 }
);
skillBars.forEach((bar) => skillObserver.observe(bar));

// ================= Dark Mode Toggle =================
const themeToggle = document.getElementById("theme-toggle");

// Load saved theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
