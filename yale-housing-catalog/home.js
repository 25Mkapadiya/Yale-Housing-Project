const collegeGrid = document.querySelector("#collegeGrid");

function renderCollegeCards() {
  if (!collegeGrid) return;

  collegeGrid.innerHTML = yaleHousingData.colleges.map((college) => {
    const roomCount = getAllRooms().filter((room) => room.collegeId === college.id).length;
    const floors = college.floors.join(", ");
    const entrances = college.entrances.length;

    return `
      <article class="college-card" style="--college-accent: ${college.accent}">
        <div>
          <div class="accent-swatch" aria-hidden="true"></div>
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
