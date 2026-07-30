const collegeGrid = document.querySelector("#collegeGrid");

const collegeLogoOverrides = {
  "pauli-murray": "assets/colleges/pauli-murray-shield.svg"
};

function collegeLogoMarkup(college) {
  const logo = collegeLogoOverrides[college.id] || college.logo;
  if (!logo) return "";

  return `
    <img
      src="${logo}"
      alt=""
      aria-hidden="true"
      loading="lazy"
      style="width:100%;height:100%;object-fit:contain;padding:0.35rem;"
    />
  `;
}

function renderCollegeCards() {
  if (!collegeGrid) return;

  collegeGrid.innerHTML = yaleHousingData.colleges.map((college) => {
    const roomCount = getAllRooms().filter((room) => room.collegeId === college.id).length;
    const floors = college.floors.join(", ");
    const entrances = college.entrances.length;

    return `
      <article class="college-card" style="--college-accent: ${college.accent}">
        <div>
          <div class="accent-swatch" aria-hidden="true">${collegeLogoMarkup(college)}</div>
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
