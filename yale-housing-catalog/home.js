const collegeGrid = document.querySelector("#collegeGrid");
const oldCampusGrid = document.querySelector("#oldCampusGrid");
const oldCampusIntro = document.querySelector("#oldCampusIntro");
const directoryTabs = [...document.querySelectorAll("[data-directory-tab]")];

function residenceCardMarkup(residence) {
  const roomCount = getAllRooms().filter((room) => room.collegeId === residence.id).length;
  const roomMeta = roomCount
    ? `${roomCount} room ${roomCount === 1 ? "record" : "records"}`
    : "";
  const palette = typeof getCollegePalette === "function"
    ? getCollegePalette(residence.id, residence)
    : { accent: residence.accent, accentDark: residence.accentDark, accentAlt: residence.accent };
  const logo = typeof collegeLogoMarkup === "function" ? collegeLogoMarkup(residence) : "";
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
        <div class="college-card-heading">
          <div class="accent-swatch" aria-hidden="true">${logo}</div>
          <span class="college-count">${residence.entrances.length} entryways</span>
        </div>
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
}

function selectDirectoryTab(tabName, syncUrl = false) {
  const showOldCampus = tabName === "old-campus";
  collegeGrid?.classList.toggle("hidden", showOldCampus);
  oldCampusGrid?.classList.toggle("hidden", !showOldCampus);
  oldCampusIntro?.classList.toggle("hidden", !showOldCampus);

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
const initialDirectory = new URLSearchParams(window.location.search).get("directory") === "old-campus"
  ? "old-campus"
  : "colleges";
selectDirectoryTab(initialDirectory);
