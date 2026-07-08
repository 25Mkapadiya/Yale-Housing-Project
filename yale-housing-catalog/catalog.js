const params = new URLSearchParams(window.location.search);
const initialCollegeId = params.get("college");

const elements = {
  catalogTitle: document.querySelector("#catalogTitle"),
  catalogSubtitle: document.querySelector("#catalogSubtitle"),
  catalogHero: document.querySelector("#catalogHero"),
  selectedCollegeCard: document.querySelector("#selectedCollegeCard"),
  searchInput: document.querySelector("#searchInput"),
  collegeFilter: document.querySelector("#collegeFilter"),
  entranceFilter: document.querySelector("#entranceFilter"),
  floorFilter: document.querySelector("#floorFilter"),
  resetFilters: document.querySelector("#resetFilters"),
  emptyReset: document.querySelector("#emptyReset"),
  resultCount: document.querySelector("#resultCount"),
  roomGrid: document.querySelector("#roomGrid"),
  emptyState: document.querySelector("#emptyState"),
  roomModal: document.querySelector("#roomModal"),
  modalContent: document.querySelector("#modalContent"),
  modalClose: document.querySelector("#modalClose"),
  adminGate: document.querySelector("#adminGate"),
  adminLoginForm: document.querySelector("#adminLoginForm"),
  adminKey: document.querySelector("#adminKey"),
  adminMessage: document.querySelector("#adminMessage"),
  uploadForm: document.querySelector("#uploadForm"),
  lockAdmin: document.querySelector("#lockAdmin"),
  uploadCollege: document.querySelector("#uploadCollege"),
  uploadMessage: document.querySelector("#uploadMessage")
};

let rooms = getAllRooms();
let activeCollegeId = initialCollegeId && getCollegeById(initialCollegeId) ? initialCollegeId : "all";

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

function collegeLogoMarkup(college, className = "college-logo", size = 48, fallback = "") {
  const logo = getCollegeLogo(college);
  if (!logo) return fallback;

  return `<img src="${escapeHtml(logo)}" alt="${escapeHtml(college?.name || "Residential College")} shield" class="${escapeHtml(className)}" width="${Number(size)}" height="${Number(size)}" loading="lazy" />`;
}

function collegeLogoStackMarkup() {
  const logos = yaleHousingData.colleges
    .filter((college) => getCollegeLogo(college))
    .slice(0, 4)
    .map((college) => collegeLogoMarkup(college, "mini-college-logo", 42))
    .join("");

  return logos ? `<div class="college-logo-stack" aria-hidden="true">${logos}</div>` : `<div class="accent-swatch" aria-hidden="true"></div>`;
}

function setAccent(collegeId) {
  const college = getCollegeById(collegeId);
  const root = document.documentElement;
  root.style.setProperty("--accent", college?.accent || "#7c9abf");
  root.style.setProperty("--accent-dark", college?.accentDark || "#315d8b");
}

function optionMarkup(value, label, selectedValue) {
  return `<option value="${escapeHtml(value)}" ${value === selectedValue ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function hydrateSelects() {
  elements.collegeFilter.innerHTML = [
    optionMarkup("all", "All colleges", activeCollegeId),
    ...yaleHousingData.colleges.map((college) => optionMarkup(college.id, college.name, activeCollegeId))
  ].join("");

  elements.uploadCollege.innerHTML = yaleHousingData.colleges
    .map((college) => optionMarkup(college.id, college.name, ""))
    .join("");

  updateDependentFilters();
}

function getFilteredBaseRooms() {
  const selectedCollege = elements.collegeFilter?.value || activeCollegeId;
  if (selectedCollege === "all") return rooms;
  return rooms.filter((room) => room.collegeId === selectedCollege);
}

function updateDependentFilters() {
  const currentEntrance = elements.entranceFilter.value || "all";
  const currentFloor = elements.floorFilter.value || "all";
  const baseRooms = getFilteredBaseRooms();

  const entrances = [...new Set(baseRooms.map((room) => room.entrance))].sort();
  const floors = [...new Set(baseRooms.map((room) => room.floor))].sort((a, b) => {
    if (a === "Basement") return -1;
    if (b === "Basement") return 1;
    return Number(a) - Number(b);
  });

  const entranceValue = entrances.includes(currentEntrance) ? currentEntrance : "all";
  const floorValue = floors.includes(currentFloor) ? currentFloor : "all";

  elements.entranceFilter.innerHTML = [
    optionMarkup("all", "All entrances", entranceValue),
    ...entrances.map((entrance) => optionMarkup(entrance, entrance, entranceValue))
  ].join("");

  elements.floorFilter.innerHTML = [
    optionMarkup("all", "All floors", floorValue),
    ...floors.map((floor) => optionMarkup(floor, floor === "Basement" ? "Basement" : `Floor ${floor}`, floorValue))
  ].join("");
}

function renderSelectedCollege() {
  const selectedCollegeId = elements.collegeFilter.value;
  const college = getCollegeById(selectedCollegeId);
  setAccent(selectedCollegeId);

  if (!college) {
    elements.catalogTitle.textContent = "All rooms";
    elements.catalogSubtitle.textContent = "Search the starter room set by college, entrance, floor level, or room details.";
    elements.selectedCollegeCard.innerHTML = `
      <div class="selected-college-header">
        ${collegeLogoStackMarkup()}
        <div>
          <h3>All residential colleges</h3>
          <p>Browse the full starter set or use filters to narrow the catalog.</p>
        </div>
      </div>
    `;
    return;
  }

  elements.catalogTitle.textContent = `${college.name} rooms`;
  elements.catalogSubtitle.textContent = `Browse mock room data for ${college.name}, including suite details, dimensions, and notes.`;
  elements.selectedCollegeCard.innerHTML = `
    <div class="selected-college-header">
      ${collegeLogoMarkup(college, "college-logo selected-logo", 56, `<div class="accent-swatch" aria-hidden="true"></div>`)}
      <div>
        <h3>${escapeHtml(college.name)}</h3>
        <p>${escapeHtml(college.description)}</p>
      </div>
    </div>
  `;
}

function roomSearchText(room) {
  const college = getCollegeById(room.collegeId);
  return [
    college?.name,
    room.roomNumber,
    room.entrance,
    room.floor,
    room.dimensions,
    room.squareFeet,
    room.occupancy,
    room.suiteType,
    room.bath,
    room.suiteDetails,
    room.notes
  ].join(" ").toLowerCase();
}

function getFilteredRooms() {
  const query = elements.searchInput.value.trim().toLowerCase();
  const collegeId = elements.collegeFilter.value;
  const entrance = elements.entranceFilter.value;
  const floor = elements.floorFilter.value;

  return rooms.filter((room) => {
    const matchesCollege = collegeId === "all" || room.collegeId === collegeId;
    const matchesEntrance = entrance === "all" || room.entrance === entrance;
    const matchesFloor = floor === "all" || room.floor === floor;
    const matchesQuery = !query || roomSearchText(room).includes(query);
    return matchesCollege && matchesEntrance && matchesFloor && matchesQuery;
  });
}

function renderRooms() {
  const filteredRooms = getFilteredRooms();
  elements.resultCount.textContent = `Showing ${filteredRooms.length} ${filteredRooms.length === 1 ? "room" : "rooms"}`;
  elements.emptyState.classList.toggle("hidden", filteredRooms.length > 0);
  elements.roomGrid.classList.toggle("hidden", filteredRooms.length === 0);

  elements.roomGrid.innerHTML = filteredRooms.map((room) => {
    const college = getCollegeById(room.collegeId);
    return `
      <article class="room-card" tabindex="0" role="button" data-room-id="${escapeHtml(room.id)}" aria-label="View details for room ${escapeHtml(room.roomNumber)}">
        <div class="room-image">
          <img src="${escapeHtml(room.images?.[0] || college?.image || "assets/rooms/room-blue.svg")}" alt="Mock photo preview for ${escapeHtml(room.roomNumber)}" />
        </div>
        <div class="room-body">
          <div class="room-topline">
            <div class="room-title-lockup">
              ${collegeLogoMarkup(college, "room-college-logo", 32)}
              <div>
                <h3 class="room-number">${escapeHtml(room.roomNumber)}</h3>
                <div class="room-college">${escapeHtml(college?.name || "Residential College")}</div>
              </div>
            </div>
            <span class="room-pill">${escapeHtml(room.suiteType)}</span>
          </div>
          <div class="room-facts">
            <div class="fact"><span>Entrance</span><strong>${escapeHtml(room.entrance)}</strong></div>
            <div class="fact"><span>Floor</span><strong>${escapeHtml(room.floor)}</strong></div>
            <div class="fact"><span>Dimensions</span><strong>${escapeHtml(room.dimensions)}</strong></div>
            <div class="fact"><span>Occupancy</span><strong>${escapeHtml(room.occupancy)}</strong></div>
          </div>
          <p class="room-meta">${escapeHtml(room.suiteDetails)}</p>
          <p class="room-notes"><strong>Notes:</strong> ${escapeHtml(room.notes)}</p>
        </div>
      </article>
    `;
  }).join("");
}

function openRoomModal(roomId) {
  const room = rooms.find((item) => item.id === roomId);
  if (!room) return;
  const college = getCollegeById(room.collegeId);
  setAccent(room.collegeId);

  const images = room.images?.length ? room.images : [college?.image || "assets/rooms/room-blue.svg"];
  const secondImage = images[1] || images[0];

  elements.modalContent.innerHTML = `
    <div class="modal-layout">
      <div class="modal-images">
        <img src="${escapeHtml(images[0])}" alt="Mock room photo for ${escapeHtml(room.roomNumber)}" />
        <img src="${escapeHtml(secondImage)}" alt="Additional mock room photo for ${escapeHtml(room.roomNumber)}" />
      </div>
      <div class="modal-body">
        <div class="modal-college-lockup">
          ${collegeLogoMarkup(college, "modal-college-logo", 44)}
          <p class="eyebrow">${escapeHtml(college?.name || "Residential College")}</p>
        </div>
        <h2 id="modalRoomTitle">${escapeHtml(room.roomNumber)}</h2>
        <span class="room-pill">${escapeHtml(room.suiteType)}</span>
        <div class="modal-details">
          <div class="modal-detail"><span>Entrance</span><strong>${escapeHtml(room.entrance)}</strong></div>
          <div class="modal-detail"><span>Floor</span><strong>${escapeHtml(room.floor)}</strong></div>
          <div class="modal-detail"><span>Dimensions</span><strong>${escapeHtml(room.dimensions)}</strong></div>
          <div class="modal-detail"><span>Square feet</span><strong>${escapeHtml(room.squareFeet)}</strong></div>
          <div class="modal-detail"><span>Occupancy</span><strong>${escapeHtml(room.occupancy)}</strong></div>
          <div class="modal-detail"><span>Bathroom</span><strong>${escapeHtml(room.bath)}</strong></div>
        </div>
        <h3>Suite details</h3>
        <p class="room-meta">${escapeHtml(room.suiteDetails)}</p>
        <h3>Notes</h3>
        <p class="room-meta">${escapeHtml(room.notes)}</p>
      </div>
    </div>
  `;

  if (typeof elements.roomModal.showModal === "function") {
    elements.roomModal.showModal();
  } else {
    elements.roomModal.setAttribute("open", "");
  }
}

function resetFilters() {
  elements.searchInput.value = "";
  elements.collegeFilter.value = initialCollegeId && getCollegeById(initialCollegeId) ? initialCollegeId : "all";
  updateDependentFilters();
  renderSelectedCollege();
  renderRooms();
}

function handleFilterChange(event) {
  if (event?.target === elements.collegeFilter) {
    activeCollegeId = elements.collegeFilter.value;
    updateDependentFilters();
    const newUrl = activeCollegeId === "all" ? "catalog.html" : `catalog.html?college=${activeCollegeId}`;
    window.history.replaceState({}, "", newUrl);
  }
  renderSelectedCollege();
  renderRooms();
}

function unlockAdmin() {
  elements.adminGate.classList.add("hidden");
  elements.uploadForm.classList.remove("hidden");
  window.sessionStorage.setItem("yaleHousingAdminPreview", "unlocked");
}

function lockAdmin() {
  elements.adminGate.classList.remove("hidden");
  elements.uploadForm.classList.add("hidden");
  elements.adminKey.value = "";
  elements.adminMessage.textContent = "";
  window.sessionStorage.removeItem("yaleHousingAdminPreview");
}

function setupAdminState() {
  if (window.sessionStorage.getItem("yaleHousingAdminPreview") === "unlocked") {
    unlockAdmin();
  }
}

function saveRoomDraft(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const collegeId = document.querySelector("#uploadCollege").value;
  const college = getCollegeById(collegeId);
  const picturesInput = document.querySelector("#uploadPictures");
  const fileNames = [...picturesInput.files].map((file) => file.name);
  const roomNumber = document.querySelector("#uploadRoomNumber").value.trim();
  const floor = document.querySelector("#uploadFloor").value;
  const uploadedRoom = {
    id: `draft-${Date.now()}`,
    collegeId,
    roomNumber,
    entrance: document.querySelector("#uploadEntrance").value.trim(),
    floor,
    dimensions: document.querySelector("#uploadDimensions").value.trim(),
    squareFeet: "Pending measurement",
    occupancy: document.querySelector("#uploadOccupancy").value.trim(),
    suiteType: document.querySelector("#uploadSuiteType").value.trim(),
    bath: document.querySelector("#uploadBath").value.trim(),
    suiteDetails: document.querySelector("#uploadSuiteDetails").value.trim(),
    notes: `${document.querySelector("#uploadNotes").value.trim()}${fileNames.length ? ` Uploaded file names: ${fileNames.join(", ")}.` : ""}`,
    images: [college?.image || "assets/rooms/room-blue.svg"]
  };

  const drafts = getStoredRoomDrafts();
  drafts.push(uploadedRoom);
  window.localStorage.setItem("yaleHousingRoomDrafts", JSON.stringify(drafts));
  rooms = getAllRooms();

  elements.uploadMessage.textContent = `${roomNumber} was saved as a local admin draft.`;
  form.reset();
  hydrateSelects();
  elements.collegeFilter.value = collegeId;
  updateDependentFilters();
  renderSelectedCollege();
  renderRooms();
}

function initCatalog() {
  hydrateSelects();
  elements.collegeFilter.value = activeCollegeId;
  updateDependentFilters();
  renderSelectedCollege();
  renderRooms();
  setupAdminState();

  elements.searchInput.addEventListener("input", renderRooms);
  elements.collegeFilter.addEventListener("change", handleFilterChange);
  elements.entranceFilter.addEventListener("change", renderRooms);
  elements.floorFilter.addEventListener("change", renderRooms);
  elements.resetFilters.addEventListener("click", resetFilters);
  elements.emptyReset.addEventListener("click", resetFilters);

  elements.roomGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".room-card");
    if (card) openRoomModal(card.dataset.roomId);
  });

  elements.roomGrid.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      const card = event.target.closest(".room-card");
      if (card) {
        event.preventDefault();
        openRoomModal(card.dataset.roomId);
      }
    }
  });

  elements.modalClose.addEventListener("click", () => elements.roomModal.close());
  elements.roomModal.addEventListener("click", (event) => {
    if (event.target === elements.roomModal) elements.roomModal.close();
  });

  elements.adminLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (elements.adminKey.value.trim() === yaleHousingData.adminDemoKey) {
      unlockAdmin();
    } else {
      elements.adminMessage.textContent = "That demo key did not match. Try YALE-ADMIN.";
    }
  });

  elements.lockAdmin.addEventListener("click", lockAdmin);
  elements.uploadForm.addEventListener("submit", saveRoomDraft);
}

initCatalog();
