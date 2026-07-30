const collegeThemeConfig = {
  berkeley: {
    accent: "#ed1b2f",
    accentDark: "#8f0d19",
    accentAlt: "#ffffff",
    surface: "#fff1f2"
  },
  branford: {
    accent: "#005da8",
    accentDark: "#003f73",
    accentAlt: "#f0c400",
    surface: "#edf6ff"
  },
  "grace-hopper": {
    accent: "#005da8",
    accentDark: "#111111",
    accentAlt: "#ffd21f",
    surface: "#edf6ff"
  },
  "pauli-murray": {
    accent: "#005da8",
    accentDark: "#003f73",
    accentAlt: "#f0182d",
    surface: "#edf6ff"
  }
};

const collegeLogoOverrides = {
  "pauli-murray": "assets/colleges/pauli-murray-shield.svg?v=transparent-4"
};

function themeEscapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCollegePalette(collegeId, college = {}) {
  const palette = collegeThemeConfig[collegeId] || {};
  return {
    accent: palette.accent || college.accent || "#7c9abf",
    accentDark: palette.accentDark || college.accentDark || "#315d8b",
    accentAlt: palette.accentAlt || palette.accent || college.accent || "#7c9abf",
    surface: palette.surface || "#f6f8fb"
  };
}

function getCollegeLogo(college) {
  if (!college) return "";
  return collegeLogoOverrides[college.id] || college.logo || "";
}

function collegeLogoMarkup(college, className = "college-logo-img") {
  const logo = getCollegeLogo(college);
  if (!logo) return "";

  return `
    <img
      src="${themeEscapeHtml(logo)}"
      alt="${themeEscapeHtml(college.name)} shield"
      class="${themeEscapeHtml(className)}"
      loading="lazy"
    />
  `;
}

function setCollegeVariables(target, palette) {
  if (!target) return;
  target.style.setProperty("--college-accent", palette.accent);
  target.style.setProperty("--college-accent-dark", palette.accentDark);
  target.style.setProperty("--college-accent-alt", palette.accentAlt);
  target.style.setProperty("--college-surface", palette.surface);
}

function applyCollegeTheme(collegeId) {
  const college = typeof getCollegeById === "function" ? getCollegeById(collegeId) : null;
  const palette = getCollegePalette(collegeId, college || {});
  const root = document.documentElement;

  root.style.setProperty("--accent", palette.accent);
  root.style.setProperty("--accent-dark", palette.accentDark);
  root.style.setProperty("--accent-alt", palette.accentAlt);
  root.style.setProperty("--college-surface", palette.surface);
  document.body.dataset.activeCollege = college ? college.id : "all";
}

function initColorMode() {
  const toggle = document.querySelector("#themeToggle");
  const savedTheme = window.localStorage.getItem("yhcTheme") || "light";

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("yhcTheme", theme);
    if (toggle) {
      const isDark = theme === "dark";
      toggle.textContent = isDark ? "Light mode" : "Dark mode";
      toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  applyTheme(savedTheme);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }
}

function initCatalogCollegeEnhancements() {
  const selectedCollegeCard = document.querySelector("#selectedCollegeCard");
  const collegeFilter = document.querySelector("#collegeFilter");
  if (!selectedCollegeCard || !collegeFilter) return;

  function enhanceSelectedCollege() {
    const selectedCollegeId = collegeFilter.value || new URLSearchParams(window.location.search).get("college") || "all";
    const college = typeof getCollegeById === "function" ? getCollegeById(selectedCollegeId) : null;
    const palette = getCollegePalette(selectedCollegeId, college || {});

    applyCollegeTheme(selectedCollegeId);
    selectedCollegeCard.dataset.collegeId = college ? college.id : "all";
    setCollegeVariables(selectedCollegeCard, palette);

    const swatch = selectedCollegeCard.querySelector(".accent-swatch");
    if (!swatch) return;

    const nextLogo = college ? collegeLogoMarkup(college, "selected-college-logo") : "";
    if (swatch.dataset.logoFor !== selectedCollegeId) {
      swatch.innerHTML = nextLogo;
      swatch.dataset.logoFor = selectedCollegeId;
      swatch.classList.toggle("has-logo", Boolean(college));
    }
  }

  collegeFilter.addEventListener("change", () => window.setTimeout(enhanceSelectedCollege, 0));

  const observer = new MutationObserver(() => window.setTimeout(enhanceSelectedCollege, 0));
  observer.observe(selectedCollegeCard, { childList: true });

  window.setTimeout(enhanceSelectedCollege, 0);
}

initColorMode();
initCatalogCollegeEnhancements();