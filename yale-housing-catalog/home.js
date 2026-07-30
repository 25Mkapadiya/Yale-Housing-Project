const collegeGrid = document.querySelector("#collegeGrid");

function renderCollegeCards() {
  if (!collegeGrid) return;

  collegeGrid.innerHTML = yaleHousingData.colleges.map((college) => {
    const roomCount = getAllRooms().filter((room) => room.collegeId === college.id).length;
    const floors = college.floors.join(", ");
    const entrances = college.entrances.length;
    const palette = typeof getCollegePalette === "function"
      ? getCollegePalette(college.id, college)
      : { accent: college.accent, accentDark: college.accentDark, accentAlt: college.accent };
    const logo = typeof collegeLogoMarkup === "function" ? collegeLogoMarkup(college) : "";

    return `
      <article
        class="college-card"
        data-college-id="${college.id}"
        style="--college-accent: ${palette.accent}; --college-accent-dark: ${palette.accentDark}; --college-accent-alt: ${palette.accentAlt};"
      >
        <div>
          <div class="accent-swatch" aria-hidden="true">${logo}</div>
          <h3>${college.name}</h3>
          <p>${college.description}</p>
          <div class="college-meta" aria-label="College details">
            <span>${roomCount} starter rooms</span>
            <span>${entrances} entrances</span>
            <span>Floors ${floors}</span>
          </div>
        </div>
        <a class="button primary" href="catalog.html?college=${college.id}">View rooms</a>
      </article>
    `;
  }).join("");
}

renderCollegeCards();
