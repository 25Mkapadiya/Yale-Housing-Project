// Loads rooms from Supabase. Falls back to the bundled rooms in data.js if Supabase
// can't be reached, so the catalog never renders empty.
const housingConfig = window.YALE_HOUSING_SUPABASE || {};
const supabaseClient = window.supabase && housingConfig.url && housingConfig.publishableKey
  ? window.supabase.createClient(housingConfig.url, housingConfig.publishableKey)
  : null;

function roomFromRow(row) {
  const photos = [...(row.room_photos || [])].sort((a, b) => a.position - b.position);
  return {
    id: row.id,
    collegeId: row.college_id,
    roomNumber: row.room_number,
    entrance: row.entrance,
    floor: row.floor,
    dimensions: row.dimensions,
    squareFeet: row.square_feet,
    occupancy: row.occupancy,
    suiteType: row.suite_type,
    bath: row.bath,
    suiteDetails: row.suite_details,
    notes: row.notes,
    images: photos.map((photo) => photo.url),
    photoPaths: photos.map((photo) => photo.storage_path).filter(Boolean)
  };
}

async function loadRooms() {
  if (!supabaseClient) {
    return { rooms: getAllRooms(), source: "fallback" };
  }

  try {
    const { data, error } = await supabaseClient
      .from("rooms")
      .select("*, room_photos(url, storage_path, position)")
      .order("college_id")
      .order("room_number");
    if (error) throw error;
    return { rooms: data.map(roomFromRow), source: "supabase" };
  } catch (error) {
    console.warn("Could not load rooms from Supabase; using bundled rooms instead.", error);
    return { rooms: getAllRooms(), source: "fallback" };
  }
}
