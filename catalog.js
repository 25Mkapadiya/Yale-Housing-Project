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
  adminEmail: document.querySelector("#adminEmail"),
  adminPassword: document.querySelector("#adminPassword"),
  adminMessage: document.querySelector("#adminMessage"),
  adminStatus: document.querySelector("#adminStatus"),
  uploadForm: document.querySelector("#uploadForm"),
  uploadSubmit: document.querySelector("#uploadSubmit"),
  lockAdmin: document.querySelector("#lockAdmin"),
  uploadCollege: document.querySelector("#uploadCollege"),
  uploadMessage: document.querySelector("#uploadMessage")
};

let rooms = [];
let roomsLoaded = false;
let roomsSource = "supabase";
let adminSession = null;
let activeCollegeId = initialCollegeId && getCollegeById(initialCollegeId) ? initialCollegeId : "all";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

function residenceOptionGroups(selectedValue) {
  const group = (label, residences) => `
    <optgroup label="${escapeHtml(label)}">
      ${residences.map((residence) => optionMarkup(residence.id, residence.name, selectedValue)).join("")}
    </optgroup>`;
  return group("Residential colleges", yaleHousingData.colleges) + group("Old Campus", yaleHousingData.oldCampusHalls);
}

function hydrateSelects() {
  elements.collegeFilter.innerHTML = optionMarkup("all", "All residences", activeCollegeId) + residenceOptionGroups(activeCollegeId);
  elements.uploadCollege.innerHTML = residenceOptionGroups("");

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
    elements.catalogSubtitle.textContent = "Search rooms across every residential college and Old Campus hall by entrance, floor level, or room details.";
    elements.selectedCollegeCard.innerHTML = `
      <div class="accent-swatch" aria-hidden="true"></div>
      <h3>All residential colleges</h3>
      <p>Browse the full starter set or use filters to narrow the catalog.</p>
    `;
    return;
  }

  elements.catalogTitle.textContent = `${college.name} rooms`;
  elements.catalogSubtitle.textContent = `Browse rooms in ${college.name}, including suite details, dimensions, and notes.`;
  elements.selectedCollegeCard.innerHTML = `
    ${college.photo ? `<figure class="selected-college-photo"><img src="${escapeHtml(college.photo)}" alt="${escapeHtml(college.name)}" /></figure>` : ""}
    <div class="accent-swatch" aria-hidden="true"></div>
    <h3>${escapeHtml(college.name)}</h3>
    <p>${escapeHtml(college.description)}</p>
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
  if (!roomsLoaded) {
    elements.resultCount.textContent = "Loading rooms…";
    elements.emptyState.classList.add("hidden");
    return;
  }

  const filteredRooms = getFilteredRooms();
  elements.resultCount.textContent = `Showing ${filteredRooms.length} ${filteredRooms.length === 1 ? "room" : "rooms"}`;
  elements.emptyState.classList.toggle("hidden", filteredRooms.length > 0);
  elements.roomGrid.classList.toggle("hidden", filteredRooms.length === 0);

  elements.roomGrid.innerHTML = filteredRooms.map((room) => {
    const college = getCollegeById(room.collegeId);
    return `
      <article class="room-card" tabindex="0" role="button" data-room-id="${escapeHtml(room.id)}" aria-label="View details for room ${escapeHtml(room.roomNumber)}">
        <div class="room-image">
          <img src="${escapeHtml(room.images?.[0] || getResidencePhoto(college))}" alt="Photo for room ${escapeHtml(room.roomNumber)}" loading="lazy" />
        </div>
        <div class="room-body">
          <div class="room-topline">
            <div>
              <h3 class="room-number">${escapeHtml(room.roomNumber)}</h3>
              <div class="room-college">${escapeHtml(college?.name || "Yale residence")}</div>
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

  const images = room.images?.length ? room.images : [getResidencePhoto(college)];
  const secondImage = images[1] || images[0];

  elements.modalContent.innerHTML = `
    <div class="modal-layout">
      <div class="modal-images">
        <img src="${escapeHtml(images[0])}" alt="Mock room photo for ${escapeHtml(room.roomNumber)}" />
        <img src="${escapeHtml(secondImage)}" alt="Additional mock room photo for ${escapeHtml(room.roomNumber)}" />
      </div>
      <div class="modal-body">
        <p class="eyebrow">${escapeHtml(college?.name || "Yale residence")}</p>
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
        ${adminSession && roomsSource === "supabase" ? `
          <div class="modal-admin">
            <button class="button ghost" type="button" data-delete-room="${escapeHtml(room.id)}">Delete this room</button>
            <p class="form-message" id="deleteMessage" role="status"></p>
          </div>
        ` : ""}
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

function showAdminForm(session) {
  adminSession = session;
  elements.adminGate.classList.add("hidden");
  elements.uploadForm.classList.remove("hidden");
  elements.adminStatus.textContent = `Signed in as ${session.user.email}. Rooms you save are visible to everyone.`;
}

function showAdminGate() {
  adminSession = null;
  elements.adminGate.classList.remove("hidden");
  elements.uploadForm.classList.add("hidden");
  elements.adminPassword.value = "";
}

async function setupAdminState() {
  if (!supabaseClient) {
    elements.adminMessage.textContent = "Admin sign-in is unavailable because the database could not be reached.";
    return;
  }
  const { data } = await supabaseClient.auth.getSession();
  if (data.session) showAdminForm(data.session);
  supabaseClient.auth.onAuthStateChange((_event, session) => {
    if (session) showAdminForm(session);
    else showAdminGate();
  });
}

async function signIn(event) {
  event.preventDefault();
  if (!supabaseClient) return;
  elements.adminMessage.textContent = "Signing in…";
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: elements.adminEmail.value.trim(),
    password: elements.adminPassword.value
  });
  if (error) {
    elements.adminMessage.textContent = error.message === "Invalid login credentials"
      ? "That email and password didn't match an account."
      : error.message;
    return;
  }
  elements.adminMessage.textContent = "";
  showAdminForm(data.session);
}

async function signOut() {
  if (supabaseClient) await supabaseClient.auth.signOut();
  showAdminGate();
  elements.adminMessage.textContent = "Signed out.";
  elements.uploadMessage.textContent = "";
}

function describeWriteError(error) {
  const message = error?.message || String(error);
  if (/row-level security|violates row-level|Unauthorized|403/i.test(message)) {
    return "This account isn't an admin, so it can't change the catalog.";
  }
  return message;
}

function safeFileName(name) {
  const cleaned = name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned || "photo";
}

async function uploadRoomPhotos(roomId, files) {
  const bucket = housingConfig.photoBucket;
  const uploaded = [];
  const failed = [];

  for (const [index, file] of files.entries()) {
    const path = `${roomId}/${Date.now()}-${index}-${safeFileName(file.name)}`;
    const { error } = await supabaseClient.storage.from(bucket).upload(path, file, {
      contentType: file.type || undefined,
      upsert: false
    });
    if (error) {
      failed.push(`${file.name} (${error.message})`);
      continue;
    }
    const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);
    uploaded.push({ room_id: roomId, url: data.publicUrl, storage_path: path, position: index });
  }

  if (uploaded.length) {
    const { error } = await supabaseClient.from("room_photos").insert(uploaded);
    if (error) {
      await supabaseClient.storage.from(bucket).remove(uploaded.map((photo) => photo.storage_path));
      throw error;
    }
  }

  return { uploaded: uploaded.length, failed };
}

async function saveRoom(event) {
  event.preventDefault();
  if (!supabaseClient || !adminSession) return;

  const form = event.currentTarget;
  const collegeId = document.querySelector("#uploadCollege").value;
  const files = [...document.querySelector("#uploadPictures").files];
  const roomNumber = document.querySelector("#uploadRoomNumber").value.trim();

  elements.uploadSubmit.disabled = true;
  elements.uploadMessage.textContent = files.length
    ? `Saving ${roomNumber} and uploading ${files.length} ${files.length === 1 ? "photo" : "photos"}…`
    : `Saving ${roomNumber}…`;

  try {
    const { data: savedRoom, error } = await supabaseClient
      .from("rooms")
      .insert({
        college_id: collegeId,
        room_number: roomNumber,
        entrance: document.querySelector("#uploadEntrance").value.trim(),
        floor: document.querySelector("#uploadFloor").value,
        dimensions: document.querySelector("#uploadDimensions").value.trim(),
        square_feet: "Pending measurement",
        occupancy: document.querySelector("#uploadOccupancy").value.trim(),
        suite_type: document.querySelector("#uploadSuiteType").value.trim(),
        bath: document.querySelector("#uploadBath").value.trim(),
        suite_details: document.querySelector("#uploadSuiteDetails").value.trim(),
        notes: document.querySelector("#uploadNotes").value.trim()
      })
      .select("id")
      .single();
    if (error) throw error;

    const photoResult = files.length ? await uploadRoomPhotos(savedRoom.id, files) : { uploaded: 0, failed: [] };

    let message = `${roomNumber} was added to the catalog`;
    if (photoResult.uploaded) message += ` with ${photoResult.uploaded} ${photoResult.uploaded === 1 ? "photo" : "photos"}`;
    message += ".";
    if (photoResult.failed.length) message += ` These photos didn't upload: ${photoResult.failed.join(", ")}.`;
    elements.uploadMessage.textContent = message;

    form.reset();
    hydrateSelects();
    await refreshRooms();
    elements.collegeFilter.value = collegeId;
    activeCollegeId = collegeId;
    updateDependentFilters();
    renderSelectedCollege();
    renderRooms();
  } catch (error) {
    elements.uploadMessage.textContent = `Couldn't save ${roomNumber}: ${describeWriteError(error)}`;
  } finally {
    elements.uploadSubmit.disabled = false;
  }
}

async function deleteRoom(roomId, button) {
  const room = rooms.find((item) => item.id === roomId);
  if (!room || !supabaseClient) return;
  if (!window.confirm(`Delete ${room.roomNumber} and its photos? This can't be undone.`)) return;

  const message = document.querySelector("#deleteMessage");
  button.disabled = true;
  message.textContent = "Deleting…";

  const { data, error } = await supabaseClient.from("rooms").delete().eq("id", roomId).select("id");
  if (error || !data?.length) {
    message.textContent = error ? describeWriteError(error) : "This account isn't an admin, so it can't change the catalog.";
    button.disabled = false;
    return;
  }

  if (room.photoPaths?.length) {
    await supabaseClient.storage.from(housingConfig.photoBucket).remove(room.photoPaths);
  }

  await refreshRooms();
  updateDependentFilters();
  renderSelectedCollege();
  renderRooms();
  elements.roomModal.close();
}

async function refreshRooms() {
  const result = await loadRooms();
  rooms = result.rooms;
  roomsSource = result.source;
  roomsLoaded = true;
}

function initCatalog() {
  hydrateSelects();
  elements.collegeFilter.value = activeCollegeId;
  updateDependentFilters();
  renderSelectedCollege();
  renderRooms();
  setupAdminState();

  refreshRooms().then(() => {
    updateDependentFilters();
    renderSelectedCollege();
    renderRooms();
  });

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

  elements.modalContent.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-room]");
    if (button) deleteRoom(button.dataset.deleteRoom, button);
  });

  elements.adminLoginForm.addEventListener("submit", signIn);
  elements.lockAdmin.addEventListener("click", signOut);
  elements.uploadForm.addEventListener("submit", saveRoom);
}

initCatalog();
