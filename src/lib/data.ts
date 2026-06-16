export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  category: "ON ROAD" | "OFF ROAD" | "MOBILITY";
  vehicleType: "SUV" | "SEDAN" | "SPORTS" | "WAGON" | "TRUCK" | "MOBILITY";
  keywords: string[];
  year: string;
  heroGradient: string;
  thumbnailGradient: string;
  persona: {
    name: string;
    age: number;
    occupation: string;
    hobbies: string[];
    story: string;
  };
  specs: {
    length: string;
    width: string;
    height: string;
    wheelbase: string;
    groundClearance: string;
    powertrain: string;
    driveType: string;
    passengers: string;
  };
  referenceKeywords: string[][];
  principles: string[];
}

export interface ThreeDWork {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  software: string[];
  beautyGradient: string;
  clayGradient: string;
  wireframeGradient: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "raidframe-dakar",
    title: "RAIDFRAME",
    subtitle: "DAKAR",
    shortDescription: "An electric off-road racer built for the extremes of the Dakar Rally.",
    category: "OFF ROAD",
    vehicleType: "SUV",
    keywords: ["OFF ROAD", "EV", "ADVENTURE"],
    year: "2024",
    heroGradient: "from-stone-900 via-stone-800 to-amber-900",
    thumbnailGradient: "from-stone-800 to-amber-800",
    persona: {
      name: "Santiago Morales",
      age: 34,
      occupation: "Adventure Photographer & Rally Enthusiast",
      hobbies: ["Off-road racing", "Wilderness photography", "Rock climbing"],
      story: "Santiago lives for the moment the pavement ends. As a photographer who has documented three Dakar Rallies, he understands what machines must endure — and what they must inspire. He needs a vehicle that is as relentless as he is.",
    },
    specs: {
      length: "4,820 mm",
      width: "2,050 mm",
      height: "1,780 mm",
      wheelbase: "2,900 mm",
      groundClearance: "340 mm",
      powertrain: "Dual Motor EV — 520 kW",
      driveType: "AWD with Torque Vectoring",
      passengers: "2",
    },
    referenceKeywords: [
      ["Military", "Aircraft", "Steel"],
      ["Dust", "Desert", "Dune"],
      ["Rally", "Speed", "Grit"],
    ],
    principles: ["Survival Engineering", "Raw Performance", "No Compromise"],
  },
  {
    id: "2",
    slug: "apex-gt",
    title: "APEX",
    subtitle: "GT",
    shortDescription: "A grand tourer that redefines long-distance performance with sculpted precision.",
    category: "ON ROAD",
    vehicleType: "SPORTS",
    keywords: ["ON ROAD", "GT", "PERFORMANCE"],
    year: "2024",
    heroGradient: "from-gray-900 via-zinc-800 to-gray-900",
    thumbnailGradient: "from-zinc-800 to-gray-700",
    persona: {
      name: "Elena Voss",
      age: 41,
      occupation: "Architecture Principal",
      hobbies: ["Track days", "Modern art collecting", "Long-distance driving"],
      story: "Elena appreciates the intersection of form and function more than most. Her design sensibility is precise, minimal, and deeply considered. She wants a car that reflects that — one that rewards the driver who pays attention.",
    },
    specs: {
      length: "4,650 mm",
      width: "1,940 mm",
      height: "1,300 mm",
      wheelbase: "2,780 mm",
      groundClearance: "110 mm",
      powertrain: "Twin-Turbo V8 — 630 hp",
      driveType: "RWD with Active Differential",
      passengers: "2+2",
    },
    referenceKeywords: [
      ["Sculpture", "Precision", "Arc"],
      ["Speed", "Line", "Shadow"],
      ["Glass", "Steel", "Carbon"],
    ],
    principles: ["Aerodynamic Efficiency", "Driver Connection", "Timeless Form"],
  },
  {
    id: "3",
    slug: "terra-rover",
    title: "TERRA",
    subtitle: "ROVER",
    shortDescription: "A mobility concept reimagining access to remote wilderness.",
    category: "OFF ROAD",
    vehicleType: "MOBILITY",
    keywords: ["OFF ROAD", "MOBILITY", "CONCEPT"],
    year: "2025",
    heroGradient: "from-green-950 via-emerald-900 to-stone-900",
    thumbnailGradient: "from-emerald-900 to-stone-800",
    persona: {
      name: "Dr. Aiko Tanaka",
      age: 38,
      occupation: "Environmental Scientist",
      hobbies: ["Ecosystem research", "Trail hiking", "Zero-waste living"],
      story: "Aiko spends 200 days a year in environments that most vehicles cannot reach — and many that should never be disturbed. She needs a vehicle that whispers through wilderness, leaving no trace except the research that protects it.",
    },
    specs: {
      length: "4,500 mm",
      width: "1,980 mm",
      height: "1,920 mm",
      wheelbase: "2,750 mm",
      groundClearance: "380 mm",
      powertrain: "Hydrogen Fuel Cell — 280 kW",
      driveType: "e-AWD",
      passengers: "4",
    },
    referenceKeywords: [
      ["Terrain", "Moss", "Stone"],
      ["Silence", "Forest", "Mist"],
      ["Research", "Modular", "Science"],
    ],
    principles: ["Zero Emission", "Terrain Adaptability", "Purposeful Restraint"],
  },
];

export const threeDWorks: ThreeDWork[] = [
  {
    id: "1",
    slug: "hypercar-study",
    title: "HYPERCAR STUDY",
    shortDescription: "Advanced topology modeling study for an extreme performance vehicle.",
    software: ["Blender", "Alias", "Keyshot"],
    beautyGradient: "from-slate-900 to-blue-950",
    clayGradient: "from-stone-400 to-stone-600",
    wireframeGradient: "from-gray-900 to-gray-800",
  },
  {
    id: "2",
    slug: "offroad-concept",
    title: "OFF-ROAD CONCEPT",
    shortDescription: "Full 3D development of a next-generation off-road platform.",
    software: ["Alias", "Maya", "VRED"],
    beautyGradient: "from-stone-900 to-amber-950",
    clayGradient: "from-stone-300 to-stone-500",
    wireframeGradient: "from-stone-900 to-stone-800",
  },
  {
    id: "3",
    slug: "interior-detail",
    title: "INTERIOR DETAIL",
    shortDescription: "Surface and material study for luxury automotive interior.",
    software: ["Blender", "Keyshot"],
    beautyGradient: "from-zinc-900 to-red-950",
    clayGradient: "from-zinc-400 to-zinc-600",
    wireframeGradient: "from-zinc-900 to-zinc-800",
  },
];
