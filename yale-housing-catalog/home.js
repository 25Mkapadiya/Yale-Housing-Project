const collegeGrid = document.querySelector("#collegeGrid");

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCollegeLogo(college) {
  return college?.logo || "";
}

function collegeLogoMarkup(college, className = "college-logo", size = 64, fallback = "") {
  const logo = getCollegeLogo(college);
  if (!logo) return fallback;

  return `<img src="${escapeHtml(logo)}" alt="${escapeHtml(college?.name || "Residential College")} shield" class="${escapeHtml(className)}" width="${Number(size)}" height="${Number(size)}" loading="lazy" />`;
}

function renderCollegeCards() {
  if (!collegeGrid) return;

  collegeGrid.innerHTML = yaleHousingData.colleges.map((college) => {
    const roomCount = getAllRooms().filter((room) => room.collegeId === college.id).length;
    const floors = college.floors.join(", ");
    const entrances = college.entrances.length;

    return `
      <article class="college-card" style="--college-accent: ${escapeHtml(college.accent)}">
        <div>
          <div class="college-card-top">
            ${collegeLogoMarkup(college, "college-logo college-card-logo", 72, `<div class="accent-swatch" aria-hidden="true"></div>`)}
            <span class="college-abbreviation">${escapeHtml(college.abbreviation)}</span>
          </div>
          <h3>${escapeHtml(college.name)}</h3>
          <p>${escapeHtml(college.description)}</p>
          <div class="college-meta" aria-label="College details">
            <span>${roomCount} starter rooms</span>
            <span>${entrances} entrances</span>
            <span>Floors ${escapeHtml(floors)}</span>
          </div>
        </div>
        <a class="button primary" href="catalog.html?college=${escapeHtml(college.id)}">View rooms</a>
      </article>
    `;
  }).join("");
}

renderCollegeCards();
