import type {
  Destination,
  JournalArticle,
  KiliRoute,
  Place,
  SafariPackage,
  SafariStyle,
} from "./types";

export const destinations: Destination[] = [
  {
    slug: "tanzania",
    name: "Tanzania",
    filter: "tanzania",
    eyebrow: "Iconic wildlife",
    lede: "Iconic wildlife, open landscapes and unforgettable safari days.",
    body: [
      "From the northern circuit to quieter southern parks, Tanzania is the heart of Serenova’s work. Each journey is written around you — never held as stock.",
    ],
    cta: "explore",
    cover: "tanzania",
  },
  {
    slug: "zanzibar",
    name: "Zanzibar",
    filter: "zanzibar",
    eyebrow: "Island light",
    lede: "Turquoise water, pale sand and a deep Swahili heritage.",
    body: [
      "Often the breath after safari — sometimes the journey itself. Nungwi, Kendwa, Paje, Matemwe and Stone Town, composed with trusted local partners.",
    ],
    cta: "explore",
    cover: "zanzibar",
  },
  {
    slug: "kenya",
    name: "Kenya",
    filter: "kenya",
    eyebrow: "On request",
    lede: "Vast savannas and iconic wildlife, from the Masai Mara to quieter north.",
    body: [
      "Kenya is a land of extraordinary contrast. Serenova designs tailor-made safaris here with trusted local contacts.",
      "For a Kenya journey, please write to Jenny directly. This is not a catalogue.",
    ],
    cta: "contact",
    cover: "kenya",
  },
  {
    slug: "uganda",
    name: "Uganda",
    filter: "uganda",
    eyebrow: "On request",
    lede: "Forests, highland gorillas and lakes — a page of intention, not a departure grid.",
    body: [
      "Uganda is lush forest, dramatic highland and rare primate encounters, from Bwindi to Queen Elizabeth National Park and Murchison Falls.",
      "For a Uganda journey, please contact Jenny directly.",
    ],
    cta: "contact",
    cover: "uganda",
  },
];

export const places: Place[] = [
  {
    slug: "serengeti",
    name: "Serengeti National Park",
    region: "northern",
    country: "tanzania",
    tags: ["Endless plains", "The Great Migration", "Extraordinary wildlife"],
    summary: "UNESCO plains, the migration, and one of Africa’s great wildlife theatres.",
    body: [
      "Serengeti National Park is the jewel of Tanzanian safari and one of the most famous wildlife destinations in the world. Spanning over 14,750 square kilometres, this UNESCO World Heritage Site is known for its golden plains, extraordinary wildlife and the Great Migration.",
      "The name Serengeti comes from the Maasai word siringet, meaning endless plains — a true description of this landscape.",
      "From dramatic predator encounters to vast herds of wildebeest and zebra, every safari here offers unforgettable moments. Whether you visit during the migration or in a quieter season, the park delivers world-class wildlife viewing.",
      "Home to over 70 large mammal species and more than 500 bird species, the Serengeti is one of the best places in Africa to see the Big Five. Open plains, riverine forest, kopjes, woodland and wetland support wildlife all year.",
      "It combines naturally with Ngorongoro Crater, Tarangire, Lake Manyara and the rest of the northern circuit.",
    ],
    cover: "serengeti",
    gallery: ["serengeti", "migration", "tanzania", "home-video-cover"],
    documented: true,
  },
  {
    slug: "ngorongoro",
    name: "Ngorongoro Crater",
    region: "northern",
    country: "tanzania",
    tags: ["A natural wonder", "Extraordinary wildlife", "Timeless beauty"],
    summary: "The world’s largest intact volcanic caldera, dense with wildlife.",
    body: [
      "Ngorongoro Crater is one of Africa’s most extraordinary safari destinations and the jewel of Tanzania’s northern circuit. This volcanic caldera, often called the Eighth Wonder of the World, holds an exceptional density of wildlife, dramatic landscapes and a living Maasai culture.",
      "With its 19-kilometre-wide caldera, Ngorongoro is the world’s largest intact inactive volcano. Steep walls enclose grassland, forest, lakes and swamps, where you may see the Big Five, endangered black rhino, lion prides, elephant, hippo and flamingo.",
      "A UNESCO World Heritage Site, the Ngorongoro Conservation Area protects remarkable wildlife and the traditional way of life of the Maasai people.",
      "It is easily reached from Arusha and often combined with Tarangire, Lake Manyara and the Serengeti.",
    ],
    cover: "ngorongoro",
    gallery: ["ngorongoro", "tanzania", "styles"],
    documented: true,
  },
  {
    slug: "tarangire",
    name: "Tarangire National Park",
    region: "northern",
    country: "tanzania",
    tags: ["Iconic elephants", "Majestic baobabs", "Quiet safari"],
    summary: "Elephant herds, ancient baobabs and a more intimate northern park.",
    body: [
      "Tarangire National Park is one of Tanzania’s most spectacular safari destinations, famous for massive elephant herds, iconic baobab trees and rich biodiversity. Often overlooked for the Serengeti and Ngorongoro, it offers a more peaceful, intimate safari.",
      "About 120 kilometres south-west of Arusha, the park covers nearly 2,850 square kilometres. The Tarangire River is its lifeline.",
      "Home to one of the highest concentrations of elephants in Africa, Tarangire also holds lion, leopard, cheetah, giraffe, zebra, buffalo, wildebeest and over 550 bird species.",
      "It can be visited year-round and combines perfectly with Lake Manyara, Ngorongoro and the Serengeti.",
    ],
    cover: "tarangire",
    gallery: ["tarangire", "tanzania", "home-video-cover"],
    documented: true,
  },
  {
    slug: "lake-manyara",
    name: "Lake Manyara National Park",
    region: "northern",
    country: "tanzania",
    tags: ["Rift valley", "Birdlife"],
    summary: "A compact rift-valley park of forest, lake and famous tree-climbing lions.",
    cover: "manyara",
    gallery: ["manyara"],
    documented: false,
  },
  {
    slug: "arusha-city",
    name: "Arusha",
    region: "northern",
    country: "tanzania",
    tags: ["Gateway"],
    summary: "The northern-circuit gateway: arrivals, briefings and the first night.",
    cover: "about",
    gallery: [],
    documented: false,
  },
  {
    slug: "arusha-national-park",
    name: "Arusha National Park",
    region: "northern",
    country: "tanzania",
    tags: ["Momella", "Meru"],
    summary: "A green park of lakes, colobus monkeys and views of Mount Meru.",
    cover: "arusha-park",
    gallery: [],
    documented: false,
  },
  {
    slug: "mount-kilimanjaro",
    name: "Mount Kilimanjaro",
    region: "northern",
    country: "tanzania",
    tags: ["Summit"],
    summary: "Africa’s highest peak — treated in full on its own page.",
    cover: "styles",
    gallery: ["styles"],
    documented: false,
  },
  {
    slug: "lake-natron",
    name: "Lake Natron",
    region: "northern",
    country: "tanzania",
    tags: ["Flamingos"],
    summary: "A remote alkaline lake and flamingo breeding ground at the foot of Ol Doinyo Lengai.",
    cover: "lake-natron",
    gallery: [],
    documented: false,
  },
  {
    slug: "saadani",
    name: "Saadani National Park",
    region: "wider",
    country: "tanzania",
    tags: ["Coast"],
    summary: "Where bush meets the Indian Ocean.",
    cover: "saadani",
    gallery: [],
    documented: false,
  },
  {
    slug: "kitulo",
    name: "Kitulo National Park",
    region: "wider",
    country: "tanzania",
    tags: ["Highlands"],
    summary: "A highland park of wildflowers, often called the Serengeti of flowers.",
    cover: "kitulo",
    gallery: [],
    documented: false,
  },
  {
    slug: "nyerere",
    name: "Nyerere National Park",
    region: "wider",
    country: "tanzania",
    tags: ["Rufiji"],
    summary: "One of Africa’s largest parks: river, boat safari and wild southern Tanzania.",
    cover: "nyerere",
    gallery: [],
    documented: false,
  },
  {
    slug: "ruaha",
    name: "Ruaha National Park",
    region: "wider",
    country: "tanzania",
    tags: ["South"],
    summary: "A vast, less-visited southern park of baobabs, lions and the Great Ruaha River.",
    cover: "ruaha",
    gallery: [],
    documented: false,
  },
  {
    slug: "mikumi",
    name: "Mikumi National Park",
    region: "wider",
    country: "tanzania",
    tags: ["South"],
    summary: "An accessible southern park on the road toward Nyerere and the coast.",
    cover: "mikumi",
    gallery: [],
    documented: false,
  },
  {
    slug: "udzungwa",
    name: "Udzungwa Mountains National Park",
    region: "wider",
    country: "tanzania",
    tags: ["Forest"],
    summary: "Eastern-arc rainforest, endemic primates and waterfall walks.",
    cover: "udzungwa",
    gallery: [],
    documented: false,
  },
  {
    slug: "katavi",
    name: "Katavi National Park",
    region: "wider",
    country: "tanzania",
    tags: ["Remote"],
    summary: "One of Tanzania’s wildest and least-visited parks.",
    cover: "katavi",
    gallery: [],
    documented: false,
  },
  {
    slug: "mahale",
    name: "Mahale Mountains National Park",
    region: "wider",
    country: "tanzania",
    tags: ["Chimpanzees"],
    summary: "Lake Tanganyika and habituated chimpanzees on forested slopes.",
    cover: "mahale",
    gallery: [],
    documented: false,
  },
  {
    slug: "gombe",
    name: "Gombe Stream National Park",
    region: "wider",
    country: "tanzania",
    tags: ["Chimpanzees"],
    summary: "Jane Goodall’s lakeshore forest — intimate chimpanzee tracking.",
    cover: "gombe",
    gallery: [],
    documented: false,
  },
  {
    slug: "bagamoyo",
    name: "Bagamoyo",
    region: "wider",
    country: "tanzania",
    tags: ["Heritage"],
    summary: "A historic coastal town of stone, dhows and Swahili memory.",
    cover: "bagamoyo",
    gallery: [],
    documented: false,
  },
];

export const styles: SafariStyle[] = [
  {
    slug: "halal-friendly",
    name: "Halal-Friendly Safari",
    summary:
      "Travel with peace of mind on a journey designed around your values, from meals to prayer.",
    cover: "halal",
  },
  {
    slug: "fly-in",
    name: "Fly-In Safari",
    summary:
      "Spend less time on the road and more time in the wild, with scheduled or private light aircraft.",
    cover: "fly",
  },
  {
    slug: "walking",
    name: "Walking Safari",
    summary:
      "Leave the vehicle. Walk with experienced guides through tracks, sounds and details you would otherwise miss.",
    cover: "walking",
  },
  {
    slug: "photography",
    name: "Photography Safari",
    summary:
      "Time, light and access for travellers who want Africa at its most memorable — and still.",
    cover: "photography",
  },
  {
    slug: "honeymoon",
    name: "Honeymoon Safari",
    summary:
      "Private camps, slower days and the space to be two people in a very large landscape.",
    cover: "honeymoon",
  },
  {
    slug: "family",
    name: "Family Safari",
    summary:
      "Ages, rest, and camps that actually work with children — without flattening the wilderness.",
    cover: "family",
  },
  {
    slug: "beach-zanzibar",
    name: "Beach & Zanzibar Holiday",
    summary:
      "White sand and Swahili towns after the bush, or a journey that is the island alone.",
    cover: "zanzibar",
  },
  {
    slug: "great-migration",
    name: "Great Migration Safari",
    summary:
      "Follow one of nature’s great movements across the Serengeti — herds, river and timing.",
    cover: "migration",
  },
];

const sharedIncludes = [
  "Private transport",
  "All accommodations on the itinerary",
  "Park fees",
  "Taxes / VAT",
  "Meals as specified",
];

const sharedExcludes = [
  "International flights",
  "Additional nights before or after the safari",
  "Tips",
  "Personal items, insurance and visas",
];

export const packages: SafariPackage[] = [
  {
    slug: "crater-baobab",
    name: "Crater & Baobab Escape",
    subtitle: "2 days · Tarangire & Ngorongoro",
    days: 2,
    category: "Semi-luxury",
    audience: "Couples, friends and short escapes",
    overview:
      "Two northern-circuit highlights in two days: Tarangire’s elephant herds and baobabs, then Ngorongoro Crater. Designed as a short safari with strong wildlife and clear value.",
    itinerary: [
      {
        title: "Day 1 — Tarangire National Park",
        text: "Game drive among elephants, baobabs and mixed wildlife. Overnight at Farm of Dreams Lodge or similar.",
      },
      {
        title: "Day 2 — Ngorongoro Crater – Arusha",
        text: "Descend into the crater for a full game drive, then return to Arusha in the late afternoon.",
      },
    ],
    highlights: [
      "Game drives in Tarangire and Ngorongoro Crater",
      "Elephant herds and baobabs",
      "Chance to see lion, buffalo, zebra and wildebeest",
      "Private safari vehicle and professional guide",
    ],
    stays: [
      { name: "Farm of Dreams Lodge", role: "Main stay", photo: "lodge-farm-of-dreams" },
      { name: "Bougainvillea Safari Lodge", role: "Alternative", photo: "lodge-bougainvillea" },
    ],
    prices: [
      { people: 1, usd: 1210 },
      { people: 2, usd: 723 },
      { people: 3, usd: 620 },
      { people: 4, usd: 585 },
      { people: 5, usd: 525 },
      { people: 6, usd: 480 },
    ],
    includes: sharedIncludes,
    excludes: [...sharedExcludes, "Tips (suggested USD 15 per person per day)"],
    mapPoints: ["Arusha", "Tarangire", "Ngorongoro"],
    cover: "tarangire",
    gallery: ["tarangire", "ngorongoro"],
    pricesPending: true,
  },
  {
    slug: "wild-essence",
    name: "Wild Essence",
    subtitle: "3 days · Serengeti & Ngorongoro",
    days: 3,
    category: "Mid-range",
    audience: "Couples, families and friends",
    overview:
      "The endless plains of the Serengeti and the natural wonder of Ngorongoro Crater in three days — two of Tanzania’s most iconic landscapes.",
    itinerary: [
      {
        title: "Day 1 — Arusha to Serengeti",
        text: "Drive from Arusha into the Serengeti. Afternoon game drive. Overnight at Serengeti Serena Lodge or similar.",
      },
      {
        title: "Day 2 — Full day in the Serengeti",
        text: "Morning and afternoon game drives. Overnight in the Serengeti.",
      },
      {
        title: "Day 3 — Serengeti to Ngorongoro – Arusha",
        text: "Morning game drive, then Ngorongoro Crater and return to Arusha in the late afternoon.",
      },
    ],
    highlights: [
      "Game drives in the Serengeti and Ngorongoro Crater",
      "Chance to see the Big Five",
      "Professional, experienced guides",
      "Flexible for couples, families or small groups",
    ],
    stays: [
      { name: "Serengeti Serena Lodge", role: "Main stay (as printed)", photo: "lodge" },
      { name: "Shuhudia Adventure Camp", role: "Listed alternative", photo: "lodge-shuhudia" },
    ],
    prices: [
      { people: 1, usd: 3450 },
      { people: 2, usd: 2294 },
      { people: 4, usd: 1950 },
      { people: 6, usd: 1780 },
    ],
    includes: [
      "Private 4x4 safari vehicle",
      "English-speaking guide",
      "Accommodation as on the itinerary",
      "Meals (full board)",
      "Park and conservation fees",
      "Airport / Arusha transfers",
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Visas",
      "Drinks unless specified",
      "Tips",
    ],
    mapPoints: ["Arusha", "Serengeti", "Ngorongoro"],
    cover: "serengeti",
    gallery: ["serengeti", "ngorongoro"],
    pricesPending: true,
  },
  {
    slug: "great-migration",
    name: "Great Migration Journey",
    subtitle: "6 days · Tanzania safari",
    days: 6,
    category: "Semi-luxury",
    audience: "Couples, families and friends",
    overview:
      "A six-day immersion around the Great Migration: Tarangire, Ngorongoro and northern Serengeti, with a start and finish in Arusha.",
    itinerary: [
      { title: "Day 1 — Arusha", text: "Arrive and settle. Overnight Under the Shade Arusha or similar." },
      { title: "Day 2 — Tarangire National Park", text: "Elephant country and baobabs. Overnight Farm of Dreams or similar." },
      { title: "Day 3 — Ngorongoro Crater", text: "A full crater day. Overnight Serenity Camp or similar." },
      { title: "Day 4 — Northern Serengeti", text: "Toward the migration. Overnight Moyo Camp North or similar." },
      { title: "Day 5 — Northern Serengeti", text: "A full day with the herds, subject to season." },
      { title: "Day 6 — Return", text: "Last game drive and road back toward Arusha." },
    ],
    highlights: [
      "The Great Migration in northern Serengeti, in season",
      "Ngorongoro Crater",
      "Game drives in Tarangire and the Serengeti",
      "Semi-luxury camps",
    ],
    stays: [
      { name: "Under the Shade Arusha", role: "Night 1", photo: "lodge-under-the-shade" },
      { name: "Farm of Dreams Lodge", role: "Tarangire", photo: "lodge-farm-of-dreams" },
      { name: "Serenity Camp", role: "Ngorongoro", photo: "lodge-serenity" },
      { name: "Moyo Camp North", role: "Northern Serengeti", photo: "lodge-moyo-north" },
    ],
    prices: [
      { people: 1, usd: 5770 },
      { people: 2, usd: 4410 },
      { people: 3, usd: 4214 },
      { people: 4, usd: 3800 },
      { people: 5, usd: 3100 },
      { people: 6, usd: 2865 },
    ],
    includes: sharedIncludes,
    excludes: [...sharedExcludes, "Activities in Zanzibar if added"],
    mapPoints: ["Arusha", "Tarangire", "Ngorongoro", "Northern Serengeti"],
    cover: "migration",
    gallery: ["migration", "serengeti", "ngorongoro", "tarangire"],
    pricesPending: true,
  },
  {
    slug: "ndutu-wilderness",
    name: "Ndutu Wilderness",
    subtitle: "8 days · Tanzania safari",
    days: 8,
    category: "Mid-range",
    audience: "Couples, families and friends",
    overview:
      "Eight mid-range days through Ngorongoro, the Ndutu calving grounds and central Serengeti — the rhythm of a real composed safari, starting and ending in Arusha.",
    itinerary: [
      { title: "Day 1 — Arusha", text: "Arrive and transfer to lodge. Overnight Tulia Boutique & Spa or similar." },
      { title: "Day 2 — Ngorongoro to Ndutu", text: "Crater rim toward Ndutu. Overnight Ndutu Camp Migration or similar." },
      { title: "Day 3 — Ndutu", text: "Full day in the Ndutu area, in season with the calving herds." },
      { title: "Day 4 — Ndutu", text: "A second Ndutu day for light, cats and movement." },
      { title: "Day 5 — Central Serengeti", text: "Drive into central Serengeti. Overnight Tukaone Serengeti or similar." },
      { title: "Day 6 — Central Serengeti", text: "Full day of game drives." },
      { title: "Day 7 — Return via Ngorongoro", text: "Road back toward Arusha. Overnight Tulia or similar." },
      { title: "Day 8 — Kilimanjaro Airport", text: "Departure transfer." },
    ],
    highlights: [
      "Ngorongoro Crater",
      "Ndutu and the Great Migration, in season",
      "Central Serengeti game drives",
      "Mid-range camps and lodges",
    ],
    stays: [
      { name: "Tulia Boutique & Spa", role: "Arusha", photo: "lodge-tulia" },
      { name: "Ndutu Camp Migration", role: "Ndutu", photo: "lodge" },
      { name: "Tukaone Serengeti Camp", role: "Central Serengeti", photo: "lodge-tukaone" },
    ],
    prices: [
      { people: 1, usd: 5480 },
      { people: 2, usd: 3740 },
      { people: 3, usd: 3265 },
      { people: 4, usd: 2880 },
      { people: 5, usd: 2692 },
      { people: 6, usd: 2475 },
    ],
    includes: sharedIncludes,
    excludes: sharedExcludes,
    mapPoints: ["Arusha", "Ngorongoro", "Ndutu", "Serengeti"],
    cover: "ndutu",
    gallery: ["ndutu", "serengeti", "ngorongoro"],
    pricesPending: true,
  },
  {
    slug: "northern-migration",
    name: "Northern Migration Passage",
    subtitle: "8 days · luxury",
    days: 8,
    category: "Luxury",
    audience: "Couples and small groups",
    overview:
      "An eight-day luxury reading of the northern migration, for travellers who want fewer vehicles and more space. Full day-by-day transcription from maquette p.31 remains to be locked.",
    itinerary: [
      { title: "Days 1–8", text: "Luxury northern circuit as printed on maquette p.31 — day-by-day copy to be confirmed with Jenny before publication." },
    ],
    highlights: [
      "Northern Serengeti in migration season",
      "Luxury camps",
      "Private guiding",
    ],
    stays: [{ name: "Luxury camps as printed", role: "To confirm", photo: "lodge" }],
    prices: [{ people: 2, usd: 8695 }],
    includes: sharedIncludes,
    excludes: sharedExcludes,
    mapPoints: ["Arusha", "Northern Serengeti"],
    cover: "serengeti",
    gallery: ["serengeti", "migration"],
    pricesPending: true,
  },
  {
    slug: "through-the-lens",
    name: "Through the Lens",
    subtitle: "10 days · photography",
    days: 10,
    category: "Mid-range",
    audience: "Photographers",
    overview:
      "Ten days shaped for light, time and access. Detailed itinerary from maquette p.32 to be confirmed with Jenny.",
    itinerary: [
      { title: "Days 1–10", text: "Photography-led northern circuit as printed on maquette p.32 — full itinerary pending confirmation." },
    ],
    highlights: ["Time for photography", "Iconic northern parks", "Guided game drives"],
    stays: [{ name: "Camps as printed", role: "To confirm", photo: "lodge" }],
    prices: [{ people: 2, usd: 5380 }],
    includes: sharedIncludes,
    excludes: sharedExcludes,
    mapPoints: ["Arusha", "Tarangire", "Serengeti"],
    cover: "serengeti",
    gallery: ["serengeti", "cta"],
    pricesPending: true,
  },
  {
    slug: "bush-ocean",
    name: "Bush & Ocean Escape",
    subtitle: "10 days · luxury · safari & Zanzibar",
    days: 10,
    category: "Luxury",
    audience: "Couples and honeymoons",
    overview:
      "Safari, then Zanzibar. The land, then the open water. Detailed lodge list from maquette p.33 to be confirmed.",
    itinerary: [
      { title: "Bush days", text: "Northern-circuit safari as printed." },
      { title: "Ocean days", text: "Zanzibar beach time after the bush." },
    ],
    highlights: ["Luxury safari", "Zanzibar after the bush", "A single composed journey"],
    stays: [
      { name: "Safari camps as printed", role: "Bush", photo: "lodge" },
      { name: "Zanzibar lodge as printed", role: "Ocean", photo: "lodge" },
    ],
    prices: [{ people: 2, usd: 7935 }],
    includes: sharedIncludes,
    excludes: sharedExcludes,
    mapPoints: ["Arusha", "Serengeti", "Zanzibar"],
    cover: "zanzibar",
    gallery: ["tanzania", "zanzibar"],
    pricesPending: true,
  },
];

export const kiliRoutes: KiliRoute[] = [
  { slug: "machame", name: "Machame", summary: "Challenging and scenic — the classic route.", cover: "styles" },
  { slug: "lemosho", name: "Lemosho", summary: "Scenic and secluded, a favourite.", cover: "styles" },
  { slug: "shira", name: "Shira", summary: "Wide plateau views.", cover: "styles" },
  { slug: "rongai", name: "Rongai", summary: "Quieter and drier, from the north.", cover: "styles" },
  { slug: "northern-circuit", name: "Northern Circuit", summary: "The most scenic route, with high success rates.", cover: "styles" },
  { slug: "umbwe", name: "Umbwe", summary: "For experienced climbers — direct and steep.", cover: "styles" },
  { slug: "shira-plateau", name: "Shira Plateau", summary: "A shorter high-altitude option.", cover: "styles" },
];

export const articles: JournalArticle[] = [
  {
    slug: "best-time-tanzania",
    title: "Best Time to Visit Tanzania",
    category: "Travel guide",
    excerpt:
      "Safari seasons, the Great Migration, Zanzibar and Kilimanjaro — every season has a different story.",
    cover: "tanzania",
    published: true,
    body: [
      "Tanzania can be visited throughout the year, but the best time depends on what you hope to experience. Classic wildlife, the Great Migration, tropical beaches or climbing Kilimanjaro each favour a different window.",
      "The dry season, June to October, is the most popular safari time. Wildlife gathers around water, grass is thinner and animals are easier to spot. It is ideal for classic game viewing, the Big Five, Serengeti and Ngorongoro, Tarangire and Manyara, and later-season river crossings.",
      "The green season, November to May, is quieter, beautiful for photography, rich in birds and often kinder on rates. Short rains usually fall in November and December; April and May can be heavier.",
      "The Great Migration moves with the seasons: January to March in southern Serengeti and Ndutu (calving); April to June the herds move north; July to October northern Serengeti and the Mara River, depending on rain.",
      "Zanzibar is excellent June to October and December to March. March to May is usually wetter. Kilimanjaro is generally kindest January to March and June to October.",
    ],
  },
  {
    slug: "great-migration-when",
    title: "The Great Migration — Where to Go and When",
    category: "Wildlife",
    excerpt: "A seasonal reading of the herds — not a promise of a crossing on a given day.",
    cover: "migration",
    published: false,
  },
  {
    slug: "what-to-pack",
    title: "What to Pack for a Safari in Tanzania",
    category: "Travel tips",
    excerpt: "Clothing, bags and the few things that actually matter in camp.",
    cover: "about",
    published: false,
  },
  {
    slug: "family-safari",
    title: "Tanzania Safari with Kids",
    category: "Family",
    excerpt: "Ages, rest days and camps that work with children.",
    cover: "home-video-cover",
    published: false,
  },
  {
    slug: "halal-safari",
    title: "Halal-Friendly Safari in Tanzania",
    category: "Meals & travel",
    excerpt: "Food, prayer and practical respect on the road.",
    cover: "tanzania",
    published: false,
  },
  {
    slug: "safari-zanzibar",
    title: "Safari & Zanzibar — How to Combine Both",
    category: "Couples",
    excerpt: "Bush then ocean, without rushing either.",
    cover: "zanzibar",
    published: false,
  },
];

export function getDestination(slug: string) {
  return destinations.find((item) => item.slug === slug);
}

export function getPlace(slug: string) {
  return places.find((item) => item.slug === slug);
}

export function getStyle(slug: string) {
  return styles.find((item) => item.slug === slug);
}

export function getPackage(slug: string) {
  return packages.find((item) => item.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((item) => item.slug === slug);
}

export function fromPrice(item: SafariPackage) {
  const two = item.prices.find((price) => price.people === 2) ?? item.prices[0];
  return two?.usd;
}
