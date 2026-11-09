const collegeGrid = document.querySelector("#collegeGrid");
const oldCampusGrid = document.querySelector("#oldCampusGrid");
const photoCreditList = document.querySelector("#photoCreditList");
const directoryTabs = [...document.querySelectorAll("[data-directory-tab]")];

function homeEscapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function residenceCardMarkup(residence, rooms) {
  const roomCount = rooms.filter((room) => room.collegeId === residence.id).length;
  const palette = typeof getCollegePalette === "function"
    ? getCollegePalette(residence.id, residence)
    : { accent: residence.accent, accentDark: residence.accentDark, accentAlt: residence.accent };
  const logo = typeof collegeLogoMarkup === "function" ? collegeLogoMarkup(residence) : "";
  const photo = residence.photo
    ? `<img src="${homeEscapeHtml(residence.photo)}" alt="${homeEscapeHtml(residence.name)}" loading="lazy" />`
    : "";

  return `
    <article
      class="college-card has-photo"
      data-college-id="${homeEscapeHtml(residence.id)}"
      style="--college-accent: ${palette.accent}; --college-accent-dark: ${palette.accentDark}; --college-accent-alt: ${palette.accentAlt};"
    >
      <div>
        <figure class="college-photo${photo ? "" : " no-photo"}">
          ${photo}
          <div class="accent-swatch" aria-hidden="true">${logo}</div>
        </figure>
        <h3>${homeEscapeHtml(residence.name)}</h3>
        <p>${homeEscapeHtml(residence.description)}</p>
        <div class="college-meta" aria-label="Residence details">
          ${residence.residenceLabel ? `<span>${homeEscapeHtml(residence.residenceLabel)}</span>` : ""}
          <span>${roomCount} ${roomCount === 1 ? "room" : "rooms"}</span>
          <span>${residence.entrances.length} entryways</span>
          <span>Floors ${homeEscapeHtml(residence.floors.join(", "))}</span>
        </div>
      </div>
      <a class="button primary" href="catalog.html?college=${encodeURIComponent(residence.id)}">View rooms</a>
    </article>
  `;
}

function renderResidenceCards(rooms) {
  if (collegeGrid) collegeGrid.innerHTML = yaleHousingData.colleges.map((college) => residenceCardMarkup(college, rooms)).join("");
  if (oldCampusGrid) oldCampusGrid.innerHTML = yaleHousingData.oldCampusHalls.map((hall) => residenceCardMarkup(hall, rooms)).join("");
}

function renderPhotoCredits() {
  if (!photoCreditList) return;
  photoCreditList.innerHTML = getAllResidences()
    .filter((residence) => residence.photo && residence.photoSourceUrl)
    .map((residence) => `
      <li>
        <a href="${homeEscapeHtml(residence.photoSourceUrl)}" target="_blank" rel="noopener">${homeEscapeHtml(residence.name)}</a>
        — ${homeEscapeHtml(residence.photoCredit)}, ${homeEscapeHtml(residence.photoLicense)}
      </li>
    `).join("");
}

function selectDirectoryTab(tabName, syncUrl = false) {
  const showOldCampus = tabName === "old-campus";
  collegeGrid?.classList.toggle("hidden", showOldCampus);
  oldCampusGrid?.classList.toggle("hidden", !showOldCampus);

  directoryTabs.forEach((tab) => {
    const isActive = tab.dataset.directoryTab === tabName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  if (syncUrl) {
    const url = showOldCampus ? "index.html?view=old-campus#colleges" : "index.html#colleges";
    window.history.replaceState({}, "", url);
  }
}

directoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => selectDirectoryTab(tab.dataset.directoryTab, true));
});

renderResidenceCards(getAllRooms());
renderPhotoCredits();
selectDirectoryTab(new URLSearchParams(window.location.search).get("view") === "old-campus" ? "old-campus" : "colleges");
loadRooms().then(({ rooms }) => renderResidenceCards(rooms));
