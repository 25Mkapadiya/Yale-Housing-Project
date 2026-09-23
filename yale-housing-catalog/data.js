function letteredEntryways(lastLetter) {
  const lastCode = lastLetter.charCodeAt(0);
  return Array.from({ length: lastCode - 64 }, (_, index) => `Entryway ${String.fromCharCode(65 + index)}`);
}

const yaleHousingData = {
  adminDemoKey: "YALE-ADMIN",
  colleges: [
    {
      id: "benjamin-franklin",
      name: "Benjamin Franklin College",
      abbreviation: "BF",
      accent: "#8f6c2d",
      accentDark: "#674b18",
      description: "Yale residential college on Prospect Street.",
      entrances: letteredEntryways("H"),
      floors: ["1", "2", "3", "4", "5"],
      image: "assets/rooms/room-gold.svg",
      sourceUrl: "https://benjaminfranklin.yale.edu/"
    },
    {
      id: "berkeley",
      name: "Berkeley College",
      abbreviation: "BK",
      accent: "#d29a2d",
      accentDark: "#8b641d",
      logo: "https://upload.wikimedia.org/wikipedia/en/1/13/Berkeleyshield.png",
      description: "A warm, central college with suite-style housing and active courtyard energy.",
      entrances: letteredEntryways("H"),
      floors: ["1", "2", "3", "4"],
      image: "assets/rooms/room-gold.svg",
      sourceUrl: "https://berkeley.yale.edu/"
    },
    {
      id: "branford",
      name: "Branford College",
      abbreviation: "BR",
      accent: "#a23a36",
      accentDark: "#78211f",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Branford_College_shield.png/250px-Branford_College_shield.png",
      description: "A classic residential college with cozy entries, common spaces, and historic character.",
      entrances: letteredEntryways("P"),
      floors: ["1", "2", "3", "4"],
      image: "assets/rooms/room-red.svg",
      sourceUrl: "https://branford.yale.edu/about/history"
    },
    {
      id: "davenport",
      name: "Davenport College",
      abbreviation: "DC",
      accent: "#7b2d2d",
      accentDark: "#551c1c",
      description: "Yale residential college on York Street.",
      entrances: letteredEntryways("N"),
      floors: ["1", "2", "3", "4", "5"],
      image: "assets/rooms/room-red.svg",
      sourceUrl: "https://davenport.yale.edu/"
    },
    {
      id: "ezra-stiles",
      name: "Ezra Stiles College",
      abbreviation: "ES",
      accent: "#b08a3e",
      accentDark: "#70551f",
      description: "Yale residential college on York Street.",
      entrances: letteredEntryways("J"),
      floors: ["1", "2", "3", "4", "5"],
      image: "assets/rooms/room-gold.svg",
      sourceUrl: "https://ezrastiles.yale.edu/"
    },
    {
      id: "grace-hopper",
      name: "Grace Hopper College",
      abbreviation: "GH",
      accent: "#4b83b6",
      accentDark: "#23527f",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/64/The_Coat_of_Arms_of_Grace_Hopper_College%2C_Yale_University.png/250px-The_Coat_of_Arms_of_Grace_Hopper_College%2C_Yale_University.png",
      description: "A bright college with practical layouts, doubles, singles, and flexible suite configurations.",
      entrances: letteredEntryways("H"),
      floors: ["1", "2", "3", "4", "5"],
      image: "assets/rooms/room-blue.svg",
      sourceUrl: "https://gracehopper.yale.edu/"
    },
    {
      id: "jonathan-edwards",
      name: "Jonathan Edwards College",
      abbreviation: "JE",
      accent: "#2d6a4f",
      accentDark: "#17432f",
      description: "Yale residential college on High Street.",
      entrances: letteredEntryways("L"),
      floors: ["1", "2", "3", "4"],
      image: "assets/rooms/room-green.svg",
      sourceUrl: "https://jonathanedwards.yale.edu/"
    },
    {
      id: "morse",
      name: "Morse College",
      abbreviation: "MC",
      accent: "#aa1f2d",
      accentDark: "#72121c",
      description: "Yale residential college designed by Eero Saarinen.",
      entrances: letteredEntryways("H"),
      floors: ["1", "2", "3", "4", "5"],
      image: "assets/rooms/room-red.svg",
      sourceUrl: "https://morse.yale.edu/"
    },
    {
      id: "pauli-murray",
      name: "Pauli Murray College",
      abbreviation: "PM",
      accent: "#367f62",
      accentDark: "#1c5a45",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/PauliMurrayShield.jpg/250px-PauliMurrayShield.jpg",
      description: "A newer residential college with modern rooms, shared lounges, and accessible circulation.",
      entrances: letteredEntryways("H"),
      floors: ["1", "2", "3", "4", "5"],
      image: "assets/rooms/room-green.svg",
      sourceUrl: "https://paulimurray.yalecollege.yale.edu/"
    },
    {
      id: "pierson",
      name: "Pierson College",
      abbreviation: "PC",
      accent: "#c7a11a",
      accentDark: "#745c08",
      description: "Yale residential college on York Street.",
      entrances: letteredEntryways("H"),
      floors: ["1", "2", "3", "4"],
      image: "assets/rooms/room-gold.svg",
      sourceUrl: "https://pierson.yalecollege.yale.edu/"
    },
    {
      id: "saybrook",
      name: "Saybrook College",
      abbreviation: "SY",
      accent: "#315b89",
      accentDark: "#193b61",
      description: "Yale residential college in Memorial Quadrangle.",
      entrances: letteredEntryways("O"),
      floors: ["1", "2", "3", "4", "5"],
      image: "assets/rooms/room-blue.svg",
      sourceUrl: "https://saybrook.yale.edu/"
    },
    {
      id: "silliman",
      name: "Silliman College",
      abbreviation: "SM",
      accent: "#c78b2f",
      accentDark: "#795018",
      description: "Yale's largest residential college by footprint.",
      entrances: letteredEntryways("M"),
      floors: ["1", "2", "3", "4"],
      image: "assets/rooms/room-gold.svg",
      sourceUrl: "https://silliman.yale.edu/"
    },
    {
      id: "timothy-dwight",
      name: "Timothy Dwight College",
      abbreviation: "TD",
      accent: "#8d2636",
      accentDark: "#591522",
      description: "Yale residential college on Temple Street.",
      entrances: letteredEntryways("I"),
      floors: ["1", "2", "3", "4"],
      image: "assets/rooms/room-red.svg",
      sourceUrl: "https://timothydwight.yale.edu/"
    },
    {
      id: "trumbull",
      name: "Trumbull College",
      abbreviation: "TC",
      accent: "#315d8b",
      accentDark: "#183b60",
      description: "Yale residential college on Elm Street.",
      entrances: letteredEntryways("K"),
      floors: ["1", "2", "3", "4"],
      image: "assets/rooms/room-blue.svg",
      sourceUrl: "https://trumbull.yalecollege.yale.edu/"
    }
  ],
  oldCampusHalls: [
    {
      id: "old-campus-bingham",
      name: "Bingham Hall",
      abbreviation: "BI",
      accent: "#6a7890",
      accentDark: "#39465b",
      entrances: letteredEntryways("E"),
      floors: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      image: "assets/rooms/room-blue.svg",
      sourceUrl: "https://college.yale.edu/welcome-yale-college/new-student-faqs",
      group: "Old Campus"
    },
    {
      id: "old-campus-durfee",
      name: "Durfee Hall",
      abbreviation: "DU",
      accent: "#876e52",
      accentDark: "#55412d",
      entrances: letteredEntryways("F"),
      floors: ["1", "2", "3", "4", "5"],
      image: "assets/rooms/room-gold.svg",
      sourceUrl: "https://college.yale.edu/welcome-yale-college/new-student-faqs",
      group: "Old Campus"
    },
    {
      id: "old-campus-farnam",
      name: "Farnam Hall",
      abbreviation: "FA",
      accent: "#8c4f45",
      accentDark: "#5b2d27",
      entrances: letteredEntryways("C"),
      floors: ["Basement", "1", "2", "3", "4"],
      image: "assets/rooms/room-red.svg",
      sourceUrl: "https://je.yalecollege.yale.edu/sites/default/files/files/JE%202019-2020%20First-Year-Handbook%281%29.pdf",
      group: "Old Campus"
    },
    {
      id: "old-campus-lanman-wright",
      name: "Lanman-Wright Hall",
      abbreviation: "LW",
      accent: "#506b5e",
      accentDark: "#2e453a",
      entrances: letteredEntryways("F"),
      floors: ["1", "2", "3", "4", "5"],
      image: "assets/rooms/room-green.svg",
      sourceUrl: "https://college.yale.edu/welcome-yale-college/new-student-faqs",
      group: "Old Campus"
    },
    {
      id: "old-campus-lawrance",
      name: "Lawrance Hall",
      abbreviation: "LA",
      accent: "#6f5687",
      accentDark: "#48335e",
      entrances: letteredEntryways("D"),
      floors: ["1", "2", "3", "4", "5"],
      image: "assets/rooms/room-blue.svg",
      sourceUrl: "https://college.yale.edu/welcome-yale-college/new-student-faqs",
      group: "Old Campus"
    },
    {
      id: "old-campus-vanderbilt",
      name: "Vanderbilt Hall",
      abbreviation: "VA",
      accent: "#53728c",
      accentDark: "#304d66",
      entrances: letteredEntryways("F"),
      floors: ["Basement", "1", "2", "3", "4", "5"],
      image: "assets/rooms/room-blue.svg",
      sourceUrl: "https://college.yale.edu/welcome-yale-college/new-student-faqs",
      group: "Old Campus"
    },
    {
      id: "old-campus-welch",
      name: "Welch Hall",
      abbreviation: "WE",
      accent: "#8a623d",
      accentDark: "#573a21",
      entrances: letteredEntryways("D"),
      floors: ["1", "2", "3", "4"],
      image: "assets/rooms/room-gold.svg",
      sourceUrl: "https://college.yale.edu/welcome-yale-college/new-student-faqs",
      group: "Old Campus"
    }
  ],
  rooms: [
    {
      id: "bk-b312",
      collegeId: "berkeley",
      roomNumber: "B-312",
      entrance: "Entryway B",
      floor: "3",
      dimensions: "22 ft × 25 ft total suite",
      squareFeet: "560 sq ft",
      occupancy: "4 students",
      suiteType: "4-person suite",
      bath: "Shared hall bath nearby",
      suiteDetails: "Two doubles connected by a central common room. Includes four closets, two desks per bedroom, and a compact seating area.",
      notes: "Sunny afternoon light. Good for a group that wants a shared common room and quieter upper-floor placement.",
      images: ["assets/rooms/room-gold.svg", "assets/rooms/room-blue.svg"]
    },
    {
      id: "bk-a118",
      collegeId: "berkeley",
      roomNumber: "A-118",
      entrance: "Entryway A",
      floor: "1",
      dimensions: "15 ft × 13 ft",
      squareFeet: "195 sq ft",
      occupancy: "2 students",
      suiteType: "Double",
      bath: "Shared hall bath",
      suiteDetails: "Standard first-floor double with built-in closet space and room for two beds, desks, and dressers.",
      notes: "Easy courtyard access. Potential foot traffic during peak hours because of the first-floor location.",
      images: ["assets/rooms/room-blue.svg", "assets/rooms/room-gold.svg"]
    },
    {
      id: "bk-c426",
      collegeId: "berkeley",
      roomNumber: "C-426",
      entrance: "Entryway C",
      floor: "4",
      dimensions: "11 ft × 14 ft",
      squareFeet: "154 sq ft",
      occupancy: "1 student",
      suiteType: "Single in suite",
      bath: "Shared suite bath",
      suiteDetails: "Single bedroom connected to a small 3-person suite. Shared common area and in-suite storage nook.",
      notes: "Best for someone who wants privacy but still wants a suite setup. Stairs required in this mock dataset.",
      images: ["assets/rooms/room-gold.svg", "assets/rooms/room-green.svg"]
    },
    {
      id: "br-d204",
      collegeId: "branford",
      roomNumber: "D-204",
      entrance: "Entryway D",
      floor: "2",
      dimensions: "18 ft × 12 ft",
      squareFeet: "216 sq ft",
      occupancy: "2 students",
      suiteType: "Double",
      bath: "Shared hall bath nearby",
      suiteDetails: "Room has a wide wall for two desks, a shared closet zone, and flexible bed placement.",
      notes: "Cozy second-floor placement with historic details. Mock image represents overall style, not an actual room.",
      images: ["assets/rooms/room-red.svg", "assets/rooms/room-blue.svg"]
    },
    {
      id: "br-e331",
      collegeId: "branford",
      roomNumber: "E-331",
      entrance: "Entryway E",
      floor: "3",
      dimensions: "24 ft × 21 ft total suite",
      squareFeet: "504 sq ft",
      occupancy: "3 students",
      suiteType: "Triple suite",
      bath: "Shared hall bath",
      suiteDetails: "One double and one single connected by a small common room. Includes built-in shelving in the single.",
      notes: "Good balance of privacy and shared space. Common room is compact but useful for studying.",
      images: ["assets/rooms/room-red.svg", "assets/rooms/room-gold.svg"]
    },
    {
      id: "br-c410",
      collegeId: "branford",
      roomNumber: "C-410",
      entrance: "Entryway C",
      floor: "4",
      dimensions: "13 ft × 12 ft",
      squareFeet: "156 sq ft",
      occupancy: "1 student",
      suiteType: "Single",
      bath: "Shared hall bath",
      suiteDetails: "Standalone single with a closet, desk area, and space for a twin XL bed plus dresser.",
      notes: "Quiet location in this mock data. Best for students prioritizing privacy over suite common space.",
      images: ["assets/rooms/room-red.svg", "assets/rooms/room-green.svg"]
    },
    {
      id: "gh-a204",
      collegeId: "grace-hopper",
      roomNumber: "GH-204",
      entrance: "Entryway A",
      floor: "2",
      dimensions: "16 ft × 12 ft",
      squareFeet: "192 sq ft",
      occupancy: "2 students",
      suiteType: "Double",
      bath: "Shared hall bath nearby",
      suiteDetails: "Efficient double with two closets and a bright wall for desks. Flexible bed layout.",
      notes: "Balanced option for students who want a straightforward room close to shared amenities.",
      images: ["assets/rooms/room-blue.svg", "assets/rooms/room-gold.svg"]
    },
    {
      id: "gh-n512",
      collegeId: "grace-hopper",
      roomNumber: "N-512",
      entrance: "Entryway H",
      floor: "5",
      dimensions: "28 ft × 22 ft total suite",
      squareFeet: "616 sq ft",
      occupancy: "5 students",
      suiteType: "5-person suite",
      bath: "Shared suite bath",
      suiteDetails: "Two doubles and one single around a common room. Includes shared storage and a small kitchenette wall in the mock layout.",
      notes: "Large suite option with upper-floor views. Works well for groups that want a central hangout space.",
      images: ["assets/rooms/room-blue.svg", "assets/rooms/room-green.svg"]
    },
    {
      id: "pm-s102",
      collegeId: "pauli-murray",
      roomNumber: "S-102",
      entrance: "Entryway A",
      floor: "1",
      dimensions: "17 ft × 13 ft",
      squareFeet: "221 sq ft",
      occupancy: "2 students",
      suiteType: "Accessible double",
      bath: "Accessible shared bath nearby",
      suiteDetails: "First-floor double with a wider circulation path, two closets, and flexible furniture arrangement.",
      notes: "Close to elevator and shared lounge in this mock layout. Good for accessibility-focused searches.",
      images: ["assets/rooms/room-green.svg", "assets/rooms/room-blue.svg"]
    },
    {
      id: "pm-t421",
      collegeId: "pauli-murray",
      roomNumber: "T-421",
      entrance: "Entryway F",
      floor: "4",
      dimensions: "26 ft × 24 ft total suite",
      squareFeet: "624 sq ft",
      occupancy: "4 students",
      suiteType: "4-person suite",
      bath: "Shared suite bath",
      suiteDetails: "Two doubles with a larger common room and generous storage. Includes shared wall shelving in the mock data.",
      notes: "Modern suite feel with strong common-room space. Mock photo is illustrative only.",
      images: ["assets/rooms/room-green.svg", "assets/rooms/room-gold.svg"]
    },
    {
      id: "pm-n305",
      collegeId: "pauli-murray",
      roomNumber: "N-305",
      entrance: "Entryway B",
      floor: "3",
      dimensions: "12 ft × 13 ft",
      squareFeet: "156 sq ft",
      occupancy: "1 student",
      suiteType: "Single in suite",
      bath: "Shared suite bath",
      suiteDetails: "Single attached to a 4-person suite with shared lounge space and nearby laundry access in this prototype.",
      notes: "Good privacy option while keeping suite community. Great candidate for adding real student photos later.",
      images: ["assets/rooms/room-green.svg", "assets/rooms/room-red.svg"]
    }
  ]
};

function getCollegeById(id) {
  return [...yaleHousingData.colleges, ...yaleHousingData.oldCampusHalls]
    .find((college) => college.id === id);
}

function getAllResidences() {
  return [...yaleHousingData.colleges, ...yaleHousingData.oldCampusHalls];
}

function getStoredRoomDrafts() {
  try {
    const stored = window.localStorage.getItem("yaleHousingRoomDrafts");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Unable to load local room drafts", error);
    return [];
  }
}

function getAllRooms() {
  return [...yaleHousingData.rooms, ...getStoredRoomDrafts()];
}
