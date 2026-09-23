const collegeGrid = document.querySelector("#collegeGrid");
const oldCampusGrid = document.querySelector("#oldCampusGrid");
const oldCampusIntro = document.querySelector("#oldCampusIntro");
const oldCampusCredits = document.querySelector("#oldCampusCredits");
const oldCampusCreditList = document.querySelector("#oldCampusCreditList");
const homeSearchForm = document.querySelector("#homeSearchForm");
const homeSearchInput = document.querySelector("#homeSearchInput");
const homeSearchSuggestions = document.querySelector("#homeSearchSuggestions");
const directoryTabs = [...document.querySelectorAll("[data-directory-tab]")];

let visibleSearchSuggestions = [];
let activeSearchSuggestion = -1;

function homeEscapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function searchSuggestionIndex() {
  const residences = getAllResidences();
  const residenceSuggestions = residences.map((residence) => ({
    label: residence.name,
    meta: `${residence.group ? residence.residenceLabel : "Residential college"} · ${residence.entrances.length} entryways`,
    href: `catalog.html?college=${encodeURIComponent(residence.id)}`,
    terms: `${residence.name} ${residence.abbreviation} ${residence.group || "residential college"}`,
    rank: 0
  }));
  const entrywaySuggestions = residences.flatMap((residence) => residence.entrances.map((entryway) => ({
    label: `${residence.name} · ${entryway}`,
    meta: residence.group || "Residential college entryway",
    href: `catalog.html?college=${encodeURIComponent(residence.id)}&entrance=${encodeURIComponent(entryway)}`,
    terms: `${residence.name} ${residence.abbreviation} ${entryway}`,
    rank: 1
  })));
  const roomSuggestions = getAllRooms().map((room) => {
    const residence = getCollegeById(room.collegeId);
    return {
      label: `${room.roomNumber} · ${residence?.name || "Yale residence"}`,
      meta: `${room.suiteType} · ${room.entrance.replace("Entryway ", "Entry ")} · Floor ${room.floor}`,
      href: `catalog.html?college=${encodeURIComponent(room.collegeId)}&q=${encodeURIComponent(room.roomNumber)}`,
      terms: `${room.roomNumber} ${residence?.name || ""} ${residence?.abbreviation || ""} ${room.suiteType} ${room.entrance} floor ${room.floor}`,
      rank: 2
    };
  });

  return [...residenceSuggestions, ...roomSuggestions, ...entrywaySuggestions];
}

function closeSearchSuggestions() {
  if (!homeSearchSuggestions || !homeSearchInput) return;
  homeSearchSuggestions.hidden = true;
  homeSearchInput.setAttribute("aria-expanded", "false");
  homeSearchInput.removeAttribute("aria-activedescendant");
  activeSearchSuggestion = -1;
}

function updateActiveSearchSuggestion() {
  const options = [...homeSearchSuggestions.querySelectorAll("[role='option']")];
  options.forEach((option, index) => {
    const isActive = index === activeSearchSuggestion;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-selected", String(isActive));
  });
  if (activeSearchSuggestion >= 0) {
    const activeOption = options[activeSearchSuggestion];
    homeSearchInput.setAttribute("aria-activedescendant", activeOption.id);
    activeOption.scrollIntoView({ block: "nearest" });
  } else {
    homeSearchInput.removeAttribute("aria-activedescendant");
  }
}

function renderSearchSuggestions() {
  if (!homeSearchInput || !homeSearchSuggestions) return;
  const query = homeSearchInput.value.trim().toLowerCase();
  if (!query) {
    closeSearchSuggestions();
    return;
  }

  visibleSearchSuggestions = searchSuggestionIndex()
    .map((suggestion) => {
      const label = suggestion.label.toLowerCase();
      const terms = suggestion.terms.toLowerCase();
      const matchScore = label.startsWith(query) ? 0 : label.split(/\s+/).some((word) => word.startsWith(query)) ? 1 : terms.includes(query) ? 2 : 99;
      return { ...suggestion, matchScore };
    })
    .filter((suggestion) => suggestion.matchScore < 99)
    .sort((a, b) => a.matchScore - b.matchScore || a.rank - b.rank || a.label.localeCompare(b.label))
    .slice(0, 8);

  if (!visibleSearchSuggestions.length) {
    closeSearchSuggestions();
    return;
  }

  activeSearchSuggestion = -1;
  homeSearchSuggestions.innerHTML = visibleSearchSuggestions.map((suggestion, index) => `
    <a
      id="home-search-option-${index}"
      class="home-search-suggestion"
      href="${homeEscapeHtml(suggestion.href)}"
      role="option"
      aria-selected="false"
      data-suggestion-index="${index}"
    >
      <span>${homeEscapeHtml(suggestion.label)}</span>
      <small>${homeEscapeHtml(suggestion.meta)}</small>
    </a>
  `).join("");
  homeSearchSuggestions.hidden = false;
  homeSearchInput.setAttribute("aria-expanded", "true");
}

function initHomeSearch() {
  if (!homeSearchForm || !homeSearchInput || !homeSearchSuggestions) return;

  homeSearchInput.addEventListener("input", renderSearchSuggestions);
  homeSearchInput.addEventListener("focus", renderSearchSuggestions);
  homeSearchInput.addEventListener("keydown", (event) => {
    if (homeSearchSuggestions.hidden || !visibleSearchSuggestions.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      activeSearchSuggestion = (activeSearchSuggestion + direction + visibleSearchSuggestions.length) % visibleSearchSuggestions.length;
      updateActiveSearchSuggestion();
    } else if (event.key === "Enter" && activeSearchSuggestion >= 0) {
      event.preventDefault();
      window.location.href = visibleSearchSuggestions[activeSearchSuggestion].href;
    } else if (event.key === "Escape") {
      closeSearchSuggestions();
    }
  });

  homeSearchSuggestions.addEventListener("pointerover", (event) => {
    const option = event.target.closest("[data-suggestion-index]");
    if (!option) return;
    activeSearchSuggestion = Number(option.dataset.suggestionIndex);
    updateActiveSearchSuggestion();
  });

  document.addEventListener("click", (event) => {
    if (!homeSearchForm.contains(event.target)) closeSearchSuggestions();
  });
}

function residenceCardMarkup(residence) {
  const roomCount = getAllRooms().filter((room) => room.collegeId === residence.id).length;
  const roomMeta = roomCount
    ? `${roomCount} room ${roomCount === 1 ? "record" : "records"}`
    : "";
  const palette = typeof getCollegePalette === "function"
    ? getCollegePalette(residence.id, residence)
    : { accent: residence.accent, accentDark: residence.accentDark, accentAlt: residence.accent };
  const logo = typeof collegeLogoMarkup === "function" ? collegeLogoMarkup(residence) : "";
  const visual = residence.hallImage
    ? `<figure class="hall-card-visual">
        <img src="${residence.hallImage}" alt="${residence.name} exterior" loading="lazy" />
        <span class="hall-initials" aria-hidden="true">${residence.abbreviation}</span>
        <span class="college-count">${residence.entrances.length} entryways</span>
      </figure>`
    : `<div class="college-card-heading">
        <div class="accent-swatch" aria-hidden="true">${logo}</div>
        <span class="college-count">${residence.entrances.length} entryways</span>
      </div>`;
  const entrywayRange = residence.entrances.length > 1
    ? `${residence.entrances[0].replace("Entryway ", "")}–${residence.entrances.at(-1).replace("Entryway ", "")}`
    : residence.entrances[0]?.replace("Entryway ", "") || "—";

  return `
    <article
      class="college-card"
      data-college-id="${residence.id}"
      style="--college-accent: ${palette.accent}; --college-accent-dark: ${palette.accentDark}; --college-accent-alt: ${palette.accentAlt};"
    >
      <div>
        ${visual}
        <h3>${residence.name}</h3>
        <div class="college-meta" aria-label="Residence details">
          ${residence.residenceLabel ? `<span class="residence-label">${residence.residenceLabel}</span>` : ""}
          <span>Entries ${entrywayRange}</span>
          ${roomMeta ? `<span>${roomMeta}</span>` : ""}
        </div>
      </div>
      <a class="college-link" href="catalog.html?college=${residence.id}">View entryways <span aria-hidden="true">→</span></a>
    </article>
  `;
}

function renderResidenceCards() {
  if (collegeGrid) {
    collegeGrid.innerHTML = yaleHousingData.colleges.map(residenceCardMarkup).join("");
  }

  if (oldCampusGrid) {
    oldCampusGrid.innerHTML = yaleHousingData.oldCampusHalls.map(residenceCardMarkup).join("");
  }

  if (oldCampusCreditList) {
    oldCampusCreditList.innerHTML = yaleHousingData.oldCampusHalls.map((hall) => `
      <li><a href="${hall.imageSourceUrl}" target="_blank" rel="noopener">${hall.name}</a> — ${hall.imageCredit}, ${hall.imageLicense}</li>
    `).join("");
  }
}

function selectDirectoryTab(tabName, syncUrl = false) {
  const showOldCampus = tabName === "old-campus";
  collegeGrid?.classList.toggle("hidden", showOldCampus);
  oldCampusGrid?.classList.toggle("hidden", !showOldCampus);
  oldCampusIntro?.classList.toggle("hidden", !showOldCampus);
  oldCampusCredits?.classList.toggle("hidden", !showOldCampus);

  directoryTabs.forEach((tab) => {
    const isActive = tab.dataset.directoryTab === tabName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  if (syncUrl) {
    const url = new URL(window.location.href);
    if (showOldCampus) {
      url.searchParams.set("directory", "old-campus");
    } else {
      url.searchParams.delete("directory");
    }
    url.hash = "colleges";
    window.history.replaceState({}, "", url);
  }
}

directoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => selectDirectoryTab(tab.dataset.directoryTab, true));
});

renderResidenceCards();
initHomeSearch();
const initialDirectory = new URLSearchParams(window.location.search).get("directory") === "old-campus"
  ? "old-campus"
  : "colleges";
selectDirectoryTab(initialDirectory);
