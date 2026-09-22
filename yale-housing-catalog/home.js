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
          <span class="college-count">${String(roomCount).padStart(2, "0")} starter rooms</span>
          <h3>${college.name}</h3>
          <p>${college.description}</p>
          <div class="college-meta" aria-label="College details">
            <span>${entrances} entrances</span>
            <span>Floors ${floors}</span>
          </div>
        </div>
        <a class="college-link" href="catalog.html?college=${college.id}">Explore rooms <span aria-hidden="true">→</span></a>
      </article>
    `;
  }).join("");
}

renderCollegeCards();
