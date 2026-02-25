// Game Database - Corrected Version
// Total games: 73
// Last updated: January 26, 2026
// Currency: LKR (Sri Lankan Rupees)

const gamesDatabase = [
  {
    id: 1,
    title: "Alan Wake Remastered",
    slug: "alan-wake-remastered",
    genre: "Action-Adventure",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.9,
    image: "https://i.ibb.co/1JTR1VWB/Alan-Wake-Remastered.png",
    badge: null,
    description: "A psychological thriller following a writer searching for his missing wife in a mysterious town.",
    longDescription: "Experience the award-winning cinematic action-thriller with enhanced visuals. Troubled author Alan Wake fights against a dark presence stalking the town of Bright Falls using light as his primary weapon. The remastered edition features updated character models and 4K resolution.",
    features: ["Flashlight Combat Mechanic", "Psychological Thriller Story", "Dark Presence Enemies"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-10-05",
    publisher: "Epic Games",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 2,
    title: "Alan Wake 2",
    slug: "alan-wake-2",
    genre: "Survival Horror",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.9,
    image: "https://i.ibb.co/SD0K2Z2k/Alan-Wake-2.png",
    badge: null,
    description: "A survival horror sequel weaving two terrifying stories of a writer and an FBI agent.",
    longDescription: "Trapped in a nightmare dimension, Alan Wake writes a story to escape, while FBI agent Saga Anderson investigates ritualistic murders in the Pacific Northwest. Players switch between both characters in this intense survival horror filled with twists, darkness, and psychological dread.",
    features: ["Dual Protagonists (Alan & Saga)", "Live-Action Video Integration", "Mind Place Investigation Board"],
    systemRequirements: "PS5",
    releaseDate: "2023-10-27",
    publisher: "Epic Games",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 3,
    title: "Astro Bot",
    slug: "astro-bot",
    genre: "Platformer",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.4,
    image: "https://i.ibb.co/RG0JtQ9Q/Astro-Bot.png",
    badge: null,
    description: "A delightful 3D platformer celebrating PlayStation history with creative mechanics.",
    longDescription: "Join Astro on a supersized space adventure to rescue his crew. Explore diverse galaxies, master unique power-ups, and enjoy a celebration of gaming history. The game fully utilizes the DualSense controller for an immersive and charming platforming experience.",
    features: ["DualSense Haptic Feedback", "PlayStation Character Cameos", "Creative Platforming Gadgets"],
    systemRequirements: "PS5",
    releaseDate: "2024-09-06",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 4,
    title: "Assassins Creed Ezio Collection",
    slug: "assassins-creed-ezio-collection",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.2,
    image: "https://i.ibb.co/Rp6GhxXm/Assassins-Creed-Ezio-Collection.png",
    badge: null,
    description: "The definitive saga of Ezio Auditore, featuring three acclaimed historical adventures.",
    longDescription: "Includes Assassin's Creed II, Brotherhood, and Revelations. Follow Ezio's journey from a young nobleman to a legendary Master Assassin across Renaissance Italy and Constantinople. This collection features enhanced graphics and all single-player DLC.",
    features: ["Renaissance Italy Setting", "Hidden Blade Assassinations", "The Auditore Villa Management"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2016-11-15",
    publisher: "Ubisoft",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 5,
    title: "Assassins Creed Triple Pack",
    slug: "assassins-creed-triple-pack",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/JRhhmj2M/Assassins-Creed-Triple-Pack.png",
    badge: null,
    description: "A bundle containing Black Flag, Unity, and Syndicate.",
    longDescription: "Experience three distinct eras: the Golden Age of Piracy in the Caribbean, the chaos of the French Revolution in Paris, and the Industrial Revolution in Victorian London. This pack offers a massive amount of open-world stealth and action gameplay.",
    features: ["Naval Combat (Black Flag)", "Parisian Parkour (Unity)", "Victorian Gang Wars (Syndicate)"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2016-04-26",
    publisher: "Ubisoft",
    players: "1-8 players",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 6,
    title: "Assassins Creed Origins Gold Edition",
    slug: "assassins-creed-origins-gold-edition",
    genre: "Action RPG",
    price: 500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.1,
    image: "https://i.ibb.co/WWWmJZg6/Assassins-Creed-Origins-Gold-Edition.png",
    badge: null,
    description: "An RPG reinvention of the series set in Ancient Egypt, exploring the brotherhood's roots.",
    longDescription: "Discover the origin story of the Assassin's Brotherhood as Bayek of Siwa. Set in a massive open-world Egypt, this RPG action game features revamped combat and loot systems. The Gold Edition includes the Season Pass and major expansions.",
    features: ["Ancient Egypt Setting", "Senu the Eagle Scout", "RPG Loot & Leveling System"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2017-10-27",
    publisher: "Ubisoft",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 7,
    title: "Assassins Creed Odyssey Ultimate Edition",
    slug: "assassins-creed-odyssey-ultimate-edition",
    genre: "Action RPG",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.3,
    image: "https://i.ibb.co/d0VN4BHp/Assassins-Creed-Odyssey-Ultimate-Edition.png",
    badge: null,
    description: "A massive Greek epic where you forge your destiny as a Spartan mercenary",
    longDescription: "Choose between Alexios or Kassandra and decide the fate of Ancient Greece during the Peloponnesian War. This vast RPG features large-scale battles and naval combat. The Ultimate Edition includes the Season Pass and the Deluxe Pack.",
    features: ["Ancient Greece Setting", "Dialogue Choices", "Large-Scale Conquest Battles"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2018-10-05",
    publisher: "Ubisoft",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 8,
    title: "Assassins Creed Valhalla Complete Edition",
    slug: "assassins-creed-valhalla-complete-edition",
    genre: "Action RPG",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.0,
    image: "https://i.ibb.co/mr4LQWs4/Assassins-Creed-Valhalla-Complete-Edition.png",
    badge: null,
    description: "A Viking saga of conquest, raiding, and settlement building in England.",
    longDescription: "Raid your way to glory as Eivor, a legendary Viking warrior. Build your settlement, customize your character, and forge alliances across 9th-century England. The Complete Edition includes the base game, the Season Pass, and the shadowy Dawn of Ragnarok expansion.",
    features: ["Viking Raids", "Settlement Building", "Dual-Wielding Weapons"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2020-11-10",
    publisher: "Ubisoft",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 9,
    title: "Assassins Creed Mirage Deluxe Edition",
    slug: "assassins-creed-mirage-deluxe-edition",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.7,
    image: "https://i.ibb.co/Vc2LHcRf/Assassins-Creed-Mirage-Deluxe-Edition.png",
    badge: null,
    description: "A return to the series' stealth roots set in 9th-century Baghdad.",
    longDescription: "Play as Basim, a cunning street thief seeking answers and justice. Join the Hidden Ones and master the art of assassination in a dense, vibrant city. The Deluxe Edition adds Prince of Persia-inspired content and digital collectibles.",
    features: ["Baghdad Setting", "Return to Roots Stealth", "Assassin's Focus Ability"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2023-10-05",
    publisher: "Ubisoft",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 10,
    title: "Assassins Creed Shadows",
    slug: "assassins-creed-shadows",
    genre: "Action RPG",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.2,
    image: "https://i.ibb.co/tpcYtNqh/Assassins-Creed-Shadows.png",
    badge: null,
    description: "An open-world RPG set in Feudal Japan featuring a shinobi and a samurai.",
    longDescription: "Experience the intertwined stories of Naoe, an adept shinobi assassin, and Yasuke, a legendary samurai. Master their distinct playstyles while exploring a dynamic open world in late Sengoku period Japan.",
    features: ["Japan Setting", "Naoe (Shinobi) & Yasuke (Samurai)", "Dynamic Seasons & Weather"],
    systemRequirements: "PS5",
    releaseDate: "2025-03-20",
    publisher: "Ubisoft",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 11,
    title: "Avatar Frontiers Of Pandora Complete",
    slug: "avatar-frontiers-of-pandora-complete-edition",
    genre: "Action-Adventure",
    price: 3000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.2,
    image: "https://i.ibb.co/cXszDN0y/Avatar-Frontiers-Of-Pandora-Complete.png",
    badge: null,
    description: "A first-person action-adventure set in the open world of the Western Frontier.",
    longDescription: "Play as a Na'vi reconnecting with their lost heritage to protect Pandora from the militaristic RDA. Explore a beautiful, reactive alien world, fly on your Banshee, and master both traditional and human weapons. Includes all story packs and cosmetic content.",
    features: ["Western Frontier Open World", "Ikran (Banshee) Flight", "Na'vi Agility & Strength"],
    systemRequirements: "PS5",
    releaseDate: "2023-12-07",
    publisher: "Ubisoft",
    players: "1-2 players",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 12,
    title: "Batman Arkham Knight",
    slug: "batman-arkham-knight",
    genre: "Action-Adventure",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.7,
    image: "https://i.ibb.co/nN7sj3Qy/Batman-Arkham-Knight.png",
    badge: null,
    description: "The explosive finale to the Arkham series featuring the drivable Batmobile.",
    longDescription: "Scarecrow returns to unite the super criminals of Gotham against the Batman. Explore the entire city, use the Batmobile for combat and traversal, and face the mysterious Arkham Knight in this darker, ultimate Batman experience.",
    features: ["Batmobile", "Gotham City Open World", "Fear Takedowns"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2015-06-23",
    publisher: "Warner Bros. Games",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 13,
    title: "Battlefield 1 And V Bundle",
    slug: "battlefield-1-and-v-bundle",
    genre: "First-Person Shooter",
    price: 1000.00,
    rentalPeriodDays: 14,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/MkS9jLB4/Battlefield-1-And-V-Bundle.png",
    badge: null,
    description: "A dual-pack of large-scale shooters set in World War I and World War II.",
    longDescription: "Experience the dawn of all-out warfare in Battlefield 1 and the chaotic fronts of Battlefield V. Both games feature massive multiplayer battles, destructible environments, and immersive War Stories single-player campaigns.",
    features: ["WWI & WWII Settings", "Behemoth Vehicles", "Fortification Building"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2018-10-18",
    publisher: "Electronic Arts",
    players: "64 players",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 14,
    title: "Battlefield 6",
    slug: "battlefield-6",
    genre: "First-Person Shooter",
    price: 2000.00,
    rentalPeriodDays: 7,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/mC8BKY9g/Battlefield-6.png",
    badge: null,
    description: "The next generation of all-out warfare with massive dynamic destruction.",
    longDescription: "Returning to a modern setting, this installment features 128-player battles (on current gen) and the new Escalation mode. With revamped class systems and cutting-edge physics, it delivers the most chaotic and immersive sandbox combat in the franchise's history.",
    features: ["Next-Gen Environmental Destruction", "Modern Military Setting", "Massive Player Count Battles"],
    systemRequirements: "PS5",
    releaseDate: "2025-10-10",
    publisher: "Electronic Arts",
    players: "128 players",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 15,
    title: "Black Myth Wukong PS5",
    slug: "black-myth-wukong-ps5",
    genre: "Action RPG",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.1,
    image: "https://i.ibb.co/F4BJjLBk/Black-Myth-Wukong-PS5.png",
    badge: null,
    description: "An action RPG rooted in Chinese mythology and Journey to the West.",
    longDescription: "Play as the Destined One and venture into a realm filled with wonders and ancient mysteries. Master the staff, spells, and transformations to defeat powerful foes in this visually stunning soulslike adventure.",
    features: ["Chinese Mythology Setting", "72 Transformations", "Staff-Based Martial Arts"],
    systemRequirements: "PS5",
    releaseDate: "2024-08-20",
    publisher: "Game Science",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 16,
    title: "Call Of Duty Black Ops 7",
    slug: "call-of-duty-black-ops-7",
    genre: "First-Person Shooter",
    price: 2000.00,
    rentalPeriodDays: 14,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/hJ9s0SHB/Call-Of-Duty-Black-Ops-7.png",
    badge: null,
    description: "A futuristic sequel set in 2035, continuing the legacy of Black Ops 2.",
    longDescription: "Following the events of previous titles, this installment thrusts players into a high-tech future conflict. It features a gripping campaign starring David Mason, a revamped multiplayer with omnidirectional movement, and the return of round-based Zombies.",
    features: ["2035 Futuristic Setting", "Semi-Open World Missions", "Advanced Tech Warfare"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2025-11-14",
    publisher: "Activision",
    players: "64+ players",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 17,
    title: "Call Of Duty Black Ops 6",
    slug: "call-of-duty-black-ops-6",
    genre: "First-Person Shooter",
    price: 2000.00,
    rentalPeriodDays: 14,
    originalPrice: null,
    rating: 8.3,
    image: "https://i.ibb.co/FLSSxqj9/Call-Of-Duty-Black-Ops-6.png",
    badge: null,
    description: "A spy thriller set in the early 90s focusing on the Gulf War era.",
    longDescription: "Developed by Treyarch, this entry offers a mind-bending campaign of espionage and betrayal. It introduces Omnimovement for fluid combat, a robust multiplayer suite, and the fan-favorite classic Zombies mode.",
    features: ["Gulf War Spy Thriller", "Omnimovement System", "Round-Based Zombies"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2024-10-25",
    publisher: "Activision",
    players: "12 players (MP) / 4 (Co-op)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 18,
    title: "Call Of Duty Cold War",
    slug: "call-of-duty-cold-war",
    genre: "First-Person Shooter",
    price: 2000.00,
    rentalPeriodDays: 14,
    originalPrice: null,
    rating: 7.6,
    image: "https://i.ibb.co/s9wTQgxK/Call-Of-Duty-Cold-War.png",
    badge: null,
    description: "A direct sequel to the original Black Ops set in the volatile early 1980s.",
    longDescription: "Hunt down a Soviet spy named Perseus across iconic Cold War locations like East Berlin and Vietnam. The game features a paranoid campaign, classic multiplayer combat, and a heavily expanded Zombies experience.",
    features: ["1980s Setting", "Multiple Campaign Endings", "Zombies Onslaught Mode"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2020-11-13",
    publisher: "Activision",
    players: "40 players (Fireteam)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 19,
    title: "Call Of Duty Modern Warfare",
    slug: "call-of-duty-modern-warfare",
    genre: "First-Person Shooter",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.0,
    image: "https://i.ibb.co/Y46DnWw8/Call-Of-Duty-Modern-Warfare.png",
    badge: null,
    description: "A gritty reboot of the legendary series with a grounded, realistic campaign.",
    longDescription: "Captain Price and the SAS partner with the CIA and freedom fighters to retrieve stolen chemical weapons. The game introduced a new engine, Gunfight mode, and served as the foundation for the massive Warzone ecosystem.",
    features: ["Clean House Night Vision Mission", "Gunsmith Weapon Customization", "Tactical Sprint"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2019-10-25",
    publisher: "Activision",
    players: "64 players (Ground War)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 20,
    title: "Call Of Duty Modern Warfare 2",
    slug: "call-of-duty-modern-warfare-2",
    genre: "First-Person Shooter",
    price: 2000.00,
    rentalPeriodDays: 14,
    originalPrice: null,
    rating: 7.5,
    image: "https://i.ibb.co/VpxRDXVP/Call-Of-Duty-Modern-Warfare-2.png",
    badge: null,
    description: "Task Force 141 returns to stop a global terrorist threat.",
    longDescription: "A sequel featuring globe-trotting missions and tactical combat. It introduced new water physics and vehicle mechanics in multiplayer. The campaign follows Soap, Ghost, and Price as they track down a cartel allied with terrorists.",
    features: ["Water Combat Physics", "Third-Person Mode", "Special Ops Raids"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2022-10-28",
    publisher: "Activision",
    players: "64 players (Ground War)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 21,
    title: "Call Of Duty Modern Warfare 3",
    slug: "call-of-duty-modern-warfare-3",
    genre: "First-Person Shooter",
    price: 2000.00,
    rentalPeriodDays: 14,
    originalPrice: null,
    rating: 5.6,
    image: "https://i.ibb.co/VcSkVtJx/Call-Of-Duty-Modern-Warfare-3.png",
    badge: null,
    description: "The conclusion to the rebooted trilogy featuring the villain Makarov.",
    longDescription: "Captain Price and Task Force 141 face off against the ultimate threat, Vladimir Makarov. The game features Open Combat Missions in the campaign and a multiplayer mode that includes remastered maps from the original MW2 (2009).",
    features: ["Open Combat Missions", "Carry Forward Inventory", "Classic MW2 (2009) Maps"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2023-11-10",
    publisher: "Activision",
    players: "64 players (Ground War)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 22,
    title: "Call Of Duty Vanguard Cross Gen",
    slug: "call-of-duty-vanguard-cross-gen",
    genre: "First-Person Shooter",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.3,
    image: "https://i.ibb.co/C3JHN3d3/Call-Of-Duty-Vanguard-Cross-Gen.png",
    badge: null,
    description: "A WWII shooter focusing on the birth of Special Forces.",
    longDescription: "Fight on four fronts of World War II - Pacific, Western, Eastern, and North Africa. The game features a cinematic campaign, destructible environments in multiplayer, and a Zombies mode developed by Treyarch.",
    features: ["Destructible Environments", "Champion Hill Mode", "Four WWII Fronts"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-11-05",
    publisher: "Activision",
    players: "48 players (Blitz)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 23,
    title: "Call Of Duty WW2",
    slug: "call-of-duty-ww2",
    genre: "First-Person Shooter",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.9,
    image: "https://i.ibb.co/VYL7MZ35/Call-Of-Duty-WW2.png",
    badge: null,
    description: "A return to the roots of the franchise with boots-on-the-ground combat.",
    longDescription: "Experience the dramatic story of the 1st Infantry Division landing on D-Day and fighting across Europe. The multiplayer returns to traditional gameplay without jetpacks, and the Nazi Zombies mode offers a darker, horror-focused take on the formula.",
    features: ["D-Day Beach Landing", "War Mode (Objective Push)", "Headquarters Social Hub"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2017-11-03",
    publisher: "Activision",
    players: "48 players (HQ)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 24,
    title: "Clair Obscur Expedition 33 Digital",
    slug: "clair-obscur-expedition-33-digital",
    genre: "Turn-Based RPG",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/qLCsk3K2/Clair-Obscur-Expedition-33-Digital.png",
    badge: null,
    description: "A turn-based RPG with real-time mechanics set in a stunning fantasy world.",
    longDescription: "Lead the Expedition 33 to destroy the Paintress, an entity that erases people every year. This game blends classic turn-based combat with real-time parries and dodges, all rendered in breathtaking graphics powered by Unreal Engine 5.",
    features: ["Turn-Based/Real-Time Hybrid Combat", "The Paintress Antagonist", "Belle Epoque Fantasy Art Style"],
    systemRequirements: "PS5",
    releaseDate: "2025-04-24",
    publisher: "Kepler Interactive",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 25,
    title: "Cronos The New Dawn PS5",
    slug: "cronos-the-new-dawn-ps5",
    genre: "Survival Horror",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.7,
    image: "https://i.ibb.co/JwxbyJfH/Cronos-New-Dawn-PS5.png",
    badge: null,
    description: "A time-bending sci-fi survival horror from the creators of Silent Hill 2 Remake.",
    longDescription: "As a Traveler acting for the cryptic Collective, you must scour the wastelands of a post-apocalyptic future and 1980s Poland. Harvest souls and survive nightmare creatures in this intense, atmospheric horror experience.",
    features: ["Time Travel Mechanics", "Post-Apocalyptic 1980s Poland", "Soul Harvesting Tool"],
    systemRequirements: "PS5",
    releaseDate: "2025-09-05",
    publisher: "Bloober Team",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 26,
    title: "Cyberpunk 2077 Ultimate",
    slug: "cyberpunk-2077-ultimate",
    genre: "Action RPG",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.6,
    image: "https://i.ibb.co/m5sxrdCz/Cyberpunk-2077-Ultimate.png",
    badge: null,
    description: "An open-world action RPG set in the futuristic Night City.",
    longDescription: "Play as V, a mercenary outlaw seeking a unique implant that is the key to immortality. This edition includes the acclaimed Phantom Liberty expansion and the massive 2.0 update, offering the complete, polished Night City experience.",
    features: ["Night City Open World", "Cyberware Implants", "Johnny Silverhand (Keanu Reeves)"],
    systemRequirements: "PS5",
    releaseDate: "2023-12-05",
    publisher: "CD Projekt Red",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 27,
    title: "Death Stranding Directors Cut",
    slug: "death-stranding-directors-cut",
    genre: "Action-Adventure",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.5,
    image: "https://i.ibb.co/7xjZgvmM/Death-Stranding-Directors-Cut.png",
    badge: null,
    description: "A genre-defying action game about reconnecting a fractured society.",
    longDescription: "From Hideo Kojima, play as Sam Bridges as he delivers hope to humanity by connecting the last survivors of a devastated America. The Director's Cut adds new weapons, vehicles, missions, and a racing mode.",
    features: ["Cargo Delivery Balance Mechanics", "Social Strand System", "BB (Bridge Baby) Companion"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2025-06-26",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 28,
    title: "Death Stranding 2 On The Beach",
    slug: "death-stranding-2-on-the-beach",
    genre: "Action-Adventure",
    price: 3000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/Xkd0rr1f/Death-Stranding-2-On-The-Beach.png",
    badge: null,
    description: "The surreal sequel continuing Sam Bridges' journey to connect the world.",
    longDescription: "Embark on a new mission to save humanity from extinction. Exploring new regions beyond America, Sam faces new enemies and bizarre phenomena. Features an all-star cast including Norman Reedus, Lea Seydoux, and Elle Fanning.",
    features: ["The Drawbridge (Mobile Base)", "Dynamic Terrain Changes", "Puppet Companion"],
    systemRequirements: "PS5",
    releaseDate: "2021-09-24",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 29,
    title: "Dying Light Beast",
    slug: "dying-light-beast",
    genre: "Action RPG",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/MDSb549r/Dying-Light-Beast.png",
    badge: null,
    description: "A standalone survival adventure bringing back hero Kyle Crane.",
    longDescription: "After years of experimentation, Kyle Crane breaks free to hunt his captors. Set in a new rural region, this title introduces Beast Mode, allowing you to unleash mutant powers on zombies and human enemies alike.",
    features: ["Beast Mode Transformations", "Parkour Traversal", "Rural Forest Setting"],
    systemRequirements: "PS5",
    releaseDate: "2025-09-18",
    publisher: "Techland",
    players: "1-4 players (Co-op)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 30,
    title: "Elden Ring",
    slug: "elden-ring",
    genre: "Action RPG",
    price: 3500.00,
    rentalPeriodDays: 60,
    originalPrice: null,
    rating: 9.6,
    image: "https://i.ibb.co/39mB5X1J/Elden-Ring.png",
    badge: null,
    description: "A masterpiece open-world RPG filled with danger and discovery.",
    longDescription: "created by Hidetaka Miyazaki and George R.R. Martin. Journey through the Lands Between as a Tarnished to reassemble the Elden Ring. Explore a seamless world, fight demigods, and discover secrets in this Game of the Year winner.",
    features: ["The Lands Between Open World", "Torrent (Spirit Steed)", "Hardcore Boss Battles"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2022-02-25",
    publisher: "Bandai Namco",
    players: "1-4 players (PvP/Co-op)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 31,
    title: "Elden Ring Nightreign",
    slug: "elden-ring-nightreign",
    genre: "Action RPG",
    price: 2500.00,
    rentalPeriodDays: 60,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/4nnmmTDC/Elden-Ring-Nightreign.png",
    badge: null,
    description: "A standalone co-op roguelike spin-off set in the Elden Ring universe.",
    longDescription: "Play as Nightfarers in a procedurally generated version of the Lands Between. This title focuses on cooperative survival and roguelike mechanics, challenging teams to survive the Primordial Night and defeat powerful bosses.",
    features: ["Co-op Focused Gameplay", "Procedural Map Elements", "Survival Mechanics"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2025-05-30",
    publisher: "Bandai Namco",
    players: "1-3 players (Co-op)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 32,
    title: "Evil Within 2",
    slug: "evil-within-2",
    genre: "Survival Horror",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.6,
    image: "https://i.ibb.co/rK6214qF/Evil-Within-2.png",
    badge: null,
    description: "A psychological survival horror where a father searches for his daughter.",
    longDescription: "Detective Sebastian Castellanos must enter the nightmarish STEM world once again to save his daughter, Lily. survive terrifying creatures and sadistic human villains in a warping reality that blends stealth, combat, and exploration.",
    features: ["STEM Distortion World", "Semi-Open Exploration", "Crafting & Stealth Survival"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2017-10-13",
    publisher: "Bethesda Softworks",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 33,
    title: "Far Cry 6",
    slug: "far-cry-6",
    genre: "First-Person Shooter",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.3,
    image: "https://i.ibb.co/pjyR7D2f/Far-Cry-6-GOTY.png",
    badge: null,
    description: "A guerrilla revolution shooter set on the tropical island of Yara.",
    longDescription: "Play as Dani Rojas and fight against the regime of dictator Anton Castillo (Giancarlo Esposito). Use Resolver weapons crafted from scrap, recruit animal companions, and liberate the island in this chaotic open-world sandbox.",
    features: ["Resolver Makeshift Weapons", "Amigo Animal Companions", "Supremo Backpacks"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-10-07",
    publisher: "Ubisoft",
    players: "1-2 players (Co-op)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 34,
    title: "EA FC 25",
    slug: "fc-25",
    genre: "Sports",
    price: 2500.00,
    rentalPeriodDays: 60,
    originalPrice: null,
    rating: 7.7,
    image: "https://i.ibb.co/pvpKPWfQ/EA-FC-25.png",
    badge: null,
    description: "The latest chapter in the world's most popular football simulation.",
    longDescription: "Features the new Rush 5v5 mode and FC IQ for deeper tactical control. With updated rosters, realistic player movement, and expanded Career Mode options, it delivers the most authentic football experience to date.",
    features: ["Rush 5v5 Mode", "FC IQ Tactical System", "Player Roles"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2024-09-27",
    publisher: "Electronic Arts",
    players: "22 players (11v11)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 35,
    title: "EA FC 24",
    slug: "fifa-24",
    genre: "Sports",
    price: 2000.00,
    rentalPeriodDays: 60,
    originalPrice: null,
    rating: 7.5,
    image: "https://i.ibb.co/Hpq4h23p/EA-FC-24.png",
    badge: null,
    description: "The first title in the new EA Sports FC era of football gaming.",
    longDescription: "Powered by HyperMotionV technology for realistic animation. Introduce mixed gender teams in Ultimate Team and evolved player careers. It laid the groundwork for the post-FIFA branding of EA's soccer franchise.",
    features: ["HyperMotionV Technology", "PlayStyles Traits", "Mixed Gender Ultimate Team"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2023-09-29",
    publisher: "Electronic Arts",
    players: "22 players (11v11)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 36,
    title: "Final Fantasy XVI",
    slug: "final-fantasy-xvi",
    genre: "Action RPG",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.7,
    image: "https://i.ibb.co/chx6sWyz/Final-Fantasy-XVI.png",
    badge: null,
    description: "A dark fantasy action RPG focusing on Eikons and political intrigue.",
    longDescription: "Follow Clive Rosfield on a tragic journey of revenge across Valisthea. The game features fast-paced, real-time action combat and massive cinematic battles between giant summons (Eikons).",
    features: ["Eikon vs. Eikon Kaiju Battles", "Real-Time Action Combat", "Dark Fantasy Tone"],
    systemRequirements: "PS5",
    releaseDate: "2023-06-22",
    publisher: "Square Enix",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 37,
    title: "Ghost Of Tsushima",
    slug: "ghost-of-tsushima",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.3,
    image: "https://i.ibb.co/H9JsSB1/Ghost-Of-Tsushima.png",
    badge: null,
    description: "An open-world samurai epic set during the Mongol invasion of Japan.",
    longDescription: "Play as Jin Sakai, a samurai who must abandon his code to become The Ghost and save his home. Explore a beautiful island, master sword combat, and liberate villages in this visually striking adventure.",
    features: ["Guiding Wind Navigation", "Samurai & Ghost Stances", "Kurosawa (Black & White) Mode"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2020-07-17",
    publisher: "Sony Interactive Entertainment",
    players: "1-4 players (Legends Mode)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 38,
    title: "Ghost Of Yotei",
    slug: "ghost-of-yotei",
    genre: "Action-Adventure",
    price: 3000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.6,
    image: "https://i.ibb.co/21kfmQNF/Ghost-Of-Yotei.png",
    badge: null,
    description: "The standalone sequel to Ghost of Tsushima set in Hokkaido.",
    longDescription: "Set in 1603, follow a new protagonist, Atsu, in the lands surrounding Mount Yotei. This title introduces firearms, new weapon stances, and a frontier setting filled with ronin and danger, evolving the Ghost formula.",
    features: ["Mount Yotei Setting", "Shamisen Music Mechanics", "Wolf Companion"],
    systemRequirements: "PS5",
    releaseDate: "2025-10-02",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 39,
    title: "God Of War 2018 Deluxe Edition",
    slug: "god-of-war-2018-deluxe-edition",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.4,
    image: "https://i.ibb.co/kVg5J862/God-Of-War-2018-Deluxe-Edition.png",
    badge: null,
    description: "Kratos returns as a father in the harsh realm of Norse mythology.",
    longDescription: "Leaving Greek mythology behind, an older Kratos and his son Atreus journey to the highest peak in the realms. This reboot features a continuous single-shot camera, brutal combat, and a deeply emotional story.",
    features: ["Leviathan Axe Recall", "Continuous One-Shot Camera", "Atreus as Support"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2018-04-20",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 40,
    title: "God Of War Ragnarok",
    slug: "god-of-war-ragnarok",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.4,
    image: "https://i.ibb.co/7dwg2HHL/God-Of-War-Ragnarok.png",
    badge: null,
    description: "The epic conclusion to Kratos and Atreus's Norse saga.",
    longDescription: "Fimbulwinter is underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world. Features expanded combat and diverse locations.",
    features: ["Draupnir Spear", "Nine Realms Exploration", "Playable Atreus Segments"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2022-11-09",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 41,
    title: "Hitman World Of Assassination",
    slug: "hitman-world-of-assassination",
    genre: "Stealth",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.4,
    image: "https://i.ibb.co/7JznqV0V/Hitman-World-Of-Assassination.png",
    badge: null,
    description: "The ultimate stealth package containing the entire modern trilogy.",
    longDescription: "Become Agent 47 and perform contract kills across the globe. This collection unifies Hitman 1, 2, and 3 into one seamless experience, including the roguelike Freelancer mode for endless replayability.",
    features: ["Disguise System", "Sandbox Assassination Opportunities", "Roguelike Freelancer Mode"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-01-20",
    publisher: "IO Interactive",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 42,
    title: "Hazelight Bundle",
    slug: "hazelight-bundle",
    genre: "Co-op Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/wFzms9Jb/Hazelight-Bundle.png",
    badge: null,
    description: "A co-op bundle featuring A Way Out and It Takes Two.",
    longDescription: "Two award-winning adventures designed strictly for co-op. escape prison in the gritty A Way Out and fix a broken relationship in the magical platformer It Takes Two. A friend plays for free via the Friend's Pass.",
    features: ["Mandatory Split-Screen Co-op", "Genre-Bending Gameplay", "Emotional Narratives"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-12-09",
    publisher: "Electronic Arts",
    players: "2 players (Co-op Only)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 43,
    title: "Hell Is Us",
    slug: "hell-is-us",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.7,
    image: "https://i.ibb.co/j9vs967M/Hell-Is-Us.png",
    badge: null,
    description: "An action-adventure exploring a war-torn country infested with supernatural entities.",
    longDescription: "A unique title that refuses to use map markers or compasses, forcing players to explore organically. Fight mysterious creatures using medieval weapons and a drone in a world that blends civil war reality with cosmic horror.",
    features: ["No HUD/Map Markers", "Drone Companion", "Sword & Modern Tech Mix"],
    systemRequirements: "PS5",
    releaseDate: "2025-09-04",
    publisher: "Nacon",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 44,
    title: "Hogwarts Legacy Deluxe Edition",
    slug: "hogwarts-legacy-deluxe-edition",
    genre: "Action RPG",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.4,
    image: "https://i.ibb.co/QjkXYQJN/Hogwarts-Legacy-Deluxe-Edition.png",
    badge: null,
    description: "An open-world action RPG set in the 1800s Wizarding World.",
    longDescription: "Become a student at Hogwarts School of Witchcraft and Wizardry. Learn spells, brew potions, tame beasts, and explore the castle and surrounding grounds while uncovering an ancient secret. Deluxe Edition includes the Dark Arts Pack.",
    features: ["Hogwarts Castle Exploration", "Spell Combinations", "Broom & Mount Flight"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2023-02-10",
    publisher: "Warner Bros. Games",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 45,
    title: "Hollow Knight Silk Song",
    slug: "hollow-knight-silk-song",
    genre: "Metroidvania",
    price: 1800.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/jvnmZ93t/Hollow-Knight-Silk-Song-Play-Station.png",
    badge: null,
    description: "The highly anticipated sequel starring Hornet, the princess-protector of Hallownest.",
    longDescription: "Explore a new kingdom ruled by silk and song. Hornet possesses a more acrobatic moveset than the original Knight, allowing for faster combat and traversal. Craft tools and battle over 150 new enemies in this beautiful 2D Metroidvania.",
    features: ["Hornet Protagonist", "Silk & Thread Mechanics", "Tool Crafting"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2025-09-04",
    publisher: "Team Cherry",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 46,
    title: "Horizon Zero Dawn Remastered",
    slug: "horizon-zero-dawn-remastered",
    genre: "Action RPG",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.6,
    image: "https://i.ibb.co/bMyt5XW0/Horizon-Zero-Dawn-Remastered.png",
    badge: null,
    description: "The origin of Aloy in a post-apocalyptic world ruled by machines.",
    longDescription: "Upgraded for PS5, this action RPG follows outcast Aloy as she unravels the mystery of her past and the fall of civilization. Hunt robotic dinosaurs with a bow and spear in a lush, reclaimed open world.",
    features: ["Robot Dinosaur Enemies", "Focus Scanning Device", "Bow & Trap Combat"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2024-10-31",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 47,
    title: "Horizon Forbidden West",
    slug: "horizon-forbidden-west",
    genre: "Action RPG",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.8,
    image: "https://i.ibb.co/rKJXLKJp/Horizon-Forbidden-West.png",
    badge: null,
    description: "Aloy ventures to a majestic but dangerous new frontier.",
    longDescription: "To save the biosphere from collapse, Aloy must explore the Forbidden West. Discover new machine types, underwater exploration, and diverse tribes. The game features stunning visuals and expanded tactical combat options.",
    features: ["Underwater Exploration", "Shieldwing Glider", "Pullcaster Grapple"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2022-02-18",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 48,
    title: "Indiana Jones And The Great Circle",
    slug: "indiana-jones-and-the-great-circle",
    genre: "Action-Adventure",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/nN8vSrKd/Indiana-Jones-and-the-Great-Circle.png",
    badge: null,
    description: "A first-person cinematic adventure starring the legendary archaeologist.",
    longDescription: "Set between Raiders and Last Crusade, Indy travels the globe to uncover the secret of the Great Circle. Use the whip for traversal and combat, solve puzzles, and punch Nazis in this authentic Lucasfilm adventure.",
    features: ["First-Person Whip Combat", "Global Puzzle Solving", "Disguise Mechanics"],
    systemRequirements: "PS5",
    releaseDate: "2025-04-17",
    publisher: "Bethesda Softworks",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 49,
    title: "Kena Bridge Of Spirits",
    slug: "kena-bridge-of-spirits",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.1,
    image: "https://i.ibb.co/pBTtHjZ7/Kena-Bridge-Of-Spirits.png",
    badge: null,
    description: "A story-driven action-adventure with charming visuals and fast-paced combat.",
    longDescription: "Play as Kena, a Spirit Guide traveling to a forgotten village. Collect and upgrade tiny spirit companions called the Rot to manipulate the environment and defeat corrupted spirits. It plays like a playable Pixar movie.",
    features: ["The Rot (Spirit Companions)", "Pixar-Style Animation", "Spirit Mask Transformation"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-09-21",
    publisher: "Ember Lab",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 50,
    title: "Kingdom Come Deliverance 2",
    slug: "kingdom-come-deliverance-2",
    genre: "RPG",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 6.9,
    image: "https://i.ibb.co/60dbwf9M/Kingdom-Come-Deliverance-2.png",
    badge: null,
    description: "A realistic medieval RPG set in the Holy Roman Empire.",
    longDescription: "You are Henry, a blacksmith's son thrust into a civil war. This game emphasizes historical accuracy, with no magic or dragons. Master complex sword combat, manage your hunger and energy, and rise from a peasant to a warrior.",
    features: ["15th Century Bohemia", "Realistic Sword Fighting", "Crossbows & Early Firearms"],
    systemRequirements: "PS5",
    releaseDate: "2025-02-04",
    publisher: "Deep Silver",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 51,
    title: "Last Of Us Part 1 Remastered",
    slug: "last-of-us-part-1-remastered",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.8,
    image: "https://i.ibb.co/cKP6xPg5/Last-Of-Us-Part-1-Remastered.png",
    badge: null,
    description: "The remake of the emotional storytelling masterpiece about survival.",
    longDescription: "In a ravaged civilization, weary protagonist Joel is hired to smuggle 14-year-old Ellie out of a military quarantine zone. What starts as a small job becomes a brutal, heartbreaking journey across the U.S. Built from the ground up for PS5.",
    features: ["Joel & Ellie Dynamic", "Clicker Stealth", "Crafting on the Fly"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2022-09-02",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 52,
    title: "Last Of Us Part 2 Remastered",
    slug: "last-of-us-part-2-remastered",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.0,
    image: "https://i.ibb.co/rRbpkcTZ/Last-Of-Us-Part-2-Remastered.png",
    badge: null,
    description: "A harrowing sequel about the cycle of violence and revenge.",
    longDescription: "Five years later, Ellie and Joel have settled in Wyoming. When a violent event disrupts that peace, Ellie embarks on a relentless journey to carry out justice. Includes the new No Return roguelike survival mode.",
    features: ["Dual Narrative (Ellie/Abby)", "Prone & Dodge Mechanics", "No Return Survival Mode"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2024-01-19",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 53,
    title: "Little Nightmares 3",
    slug: "little-nightmares-3",
    genre: "Puzzle Platformer",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.1,
    image: "https://i.ibb.co/fYYyzFtR/Little-Nightmares-3.png",
    badge: null,
    description: "A co-op horror adventure following two new children, Low and Alone.",
    longDescription: "Traverse the Spiral, a cluster of disturbing dystopian places. For the first time in the series, play in online co-op or with an AI companion. Solve puzzles and evade grotesque enemies in a terrifyingly atmospheric world.",
    features: ["Online Co-op", "The Spiral Setting", "Giant Monster Evasion"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2025-10-10",
    publisher: "Bandai Namco",
    players: "1-2 players (Co-op)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 54,
    title: "Mafia Trilogy",
    slug: "mafia-trilogy",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/Fk9KQdyh/Mafia-Trilogy.png",
    badge: null,
    description: "The complete saga of organized crime across three eras in America.",
    longDescription: "Includes the remake of Mafia, the remaster of Mafia II, and Mafia III. Live the life of a gangster during the Prohibition era, the Golden Age of the mob in the 50s, and the turbulent late 60s in New Bordeaux.",
    features: ["Period-Accurate Cities", "Cinematic Mob Storylines", "Classic Cars & Music"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2020-09-25",
    publisher: "2K Games",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 55,
    title: "Mafia Old Country",
    slug: "mafia-old-country",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/0yn35DP6/Mafia-Old-Country.png",
    badge: null,
    description: "A prequel to the Mafia series exploring the origins of the mob in Sicily.",
    longDescription: "Set in the brutal underworld of 1900s Sicily. uncover the origins of organized crime in this gritty narrative adventure. It promises the series' signature deep storytelling and authentic period atmosphere.",
    features: ["1900s Sicily Setting", "Origins of the Mob", "Brutal Melee Combat"],
    systemRequirements: "PS5",
    releaseDate: "2025-08-08",
    publisher: "2K Games",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 56,
    title: "Metal Gear Solid Snake Eater",
    slug: "metal-gear-solid-snake-eater",
    genre: "Stealth",
    price: 3000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/twJNLykK/Metal-Gear-Solid-Snake-Eater.png",
    badge: null,
    description: "A faithful remake of the legendary survival stealth game MGS3.",
    longDescription: "Relive the origin story of Big Boss during the Cold War. Infiltrate a Soviet jungle, hunt for food, heal injuries, and master CQC combat. This remake features modern graphics and controls while keeping the original voice acting and story intact.",
    features: ["Jungle Survival (Food/Cure)", "Camouflage Index", "CQC (Close Quarters Combat)"],
    systemRequirements: "PS5",
    releaseDate: "2025-08-28",
    publisher: "Konami",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 57,
    title: "Mortal Shell",
    slug: "mortal-shell",
    genre: "Action RPG",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.6,
    image: "https://i.ibb.co/KpjCb6GX/Mortal-Shell.png",
    badge: null,
    description: "A punishing action RPG where you possess the bodies of fallen warriors.",
    longDescription: "A soulslike set in a shattered world. inhabit four different Shells, each with unique combat styles. Master the unique harden mechanic to block attacks and survive against formidable foes and grotesque bosses.",
    features: ["Harden Stone Mechanic", "Shell Possession System", "Dark Fantasy Atmosphere"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2020-08-18",
    publisher: "Playstack",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 58,
    title: "Plague Tale Innocence",
    slug: "plague-tale-innocence",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.2,
    image: "https://i.ibb.co/1GVF2YDc/Plague-Tale-Innocence.png",
    badge: null,
    description: "An emotional stealth-adventure set during the Black Death in France.",
    longDescription: "Follow siblings Amicia and Hugo as they flee from the Inquisition and swarms of supernatural rats. Use fire and light to manipulate the rats and stealth to avoid soldiers in this dark, narrative-driven journey.",
    features: ["Rat Swarms", "Sling Combat", "Light & Fire Puzzles"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-07-06",
    publisher: "Focus Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 59,
    title: "Resident Evil Biohazard",
    slug: "resident-evil-biohazard",
    genre: "Survival Horror",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.6,
    image: "https://i.ibb.co/pBJK2mvV/Resident-Evil-Biohazard.png",
    badge: null,
    description: "A return to survival horror played from a terrifying first-person perspective.",
    longDescription: "Searching for his wife, Ethan Winters enters a derelict plantation home occupied by the deranged Baker family. This game revitalized the series with true horror, resource scarcity, and a claustrophobic atmosphere.",
    features: ["First-Person Horror", "The Baker Family", "VHS Tape Puzzles"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2017-01-24",
    publisher: "Capcom",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 60,
    title: "Resident Evil Village Gold",
    slug: "resident-evil-village-gold",
    genre: "Survival Horror",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.4,
    image: "https://i.ibb.co/Tqvx9Hyd/Resident-Evil-Village-Gold.png",
    badge: null,
    description: "Ethan Winters faces werewolves and vampires in a mysterious European village",
    longDescription: "The sequel to Biohazard. Ethan must rescue his daughter from four lords ruling a snowy village. The Gold Edition includes the Shadows of Rose story expansion and a Third-Person Mode for the main campaign.",
    features: ["Lady Dimitrescu", "The Duke Merchant", "Werewolf Enemies"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-05-07",
    publisher: "Capcom",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 61,
    title: "Resident Evil 2 And 3 Remake",
    slug: "resident-evil-2-and-3-remake",
    genre: "Survival Horror",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.1,
    image: "https://i.ibb.co/hxynN3nr/Resident-Evil-2-And-3-Remake.png",
    badge: null,
    description: "A bundle of two classic survival horror games reimagined for modern consoles.",
    longDescription: "Survive the Raccoon City outbreak. In RE2, play as Leon and Claire trying to escape the police station. In RE3, play as Jill Valentine fleeing the relentless Nemesis. Both feature stunning graphics and over-the-shoulder gameplay.",
    features: ["Mr. X & Nemesis Stalkers", "Raccoon City Police Station", "Over-the-Shoulder Aim"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2019-01-25",
    publisher: "Capcom",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 62,
    title: "Resident Evil 4 Remake Gold",
    slug: "resident-evil-4-remake-gold",
    genre: "Survival Horror",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.3,
    image: "https://i.ibb.co/Q3CnCywF/Resident-Evil-4-Remake-Gold.png",
    badge: null,
    description: "The reimagining of the action-horror classic that changed the genre.",
    longDescription: "Leon S. Kennedy is sent to rescue the president's daughter from a cult in Spain. Features modernized gameplay, a darker tone, and incredible visuals. Gold Edition includes the Separate Ways DLC starring Ada Wong.",
    features: ["Knife Parry Mechanic", "Attache Case Inventory", "Escorting Ashley"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2023-03-24",
    publisher: "Capcom",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 63,
    title: "Silent Hill 2 Remake",
    slug: "silent-hill-2-remake",
    genre: "Survival Horror",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.6,
    image: "https://i.ibb.co/kggCYqxD/Silent-Hill-2-Remake.png",
    badge: null,
    description: "psychological horror masterpiece rebuilt for a new generation.",
    longDescription: "Sunderland receives a letter from his deceased wife calling him to Silent Hill. Explore the fog-covered town, solve puzzles, and face disturbing monsters like Pyramid Head in this faithful and terrifying remake by Bloober Team.",
    features: ["Fog-Covered Town", "Pyramid Head", "Psychological Horror Narrative"],
    systemRequirements: "PS5",
    releaseDate: "2024-10-08",
    publisher: "Konami",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 64,
    title: "Sniper Elite 5",
    slug: "sniper-elite-5",
    genre: "Tactical Shooter",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.7,
    image: "https://i.ibb.co/BHj13GML/Sniper-Elite-5.png",
    badge: null,
    description: "A tactical shooter featuring advanced sniping physics and gruesome X-ray kills.",
    longDescription: "Elite marksman Karl Fairburne uncovers a Nazi plot in 1944 France. Use authentic WWII weaponry, customize your loadout, and infiltrate massive maps. Features the Invasion Mode where another player can hunt you as an Axis sniper.",
    features: ["X-Ray Kill Cam", "Axis Invasion Mode", "Weapon Customization"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2022-05-26",
    publisher: "Rebellion",
    players: "1-16 players (Multiplayer)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 65,
    title: "Spider Man Remastered",
    slug: "spider-man-remastered",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.7,
    image: "https://i.ibb.co/dTs1DSQ/Spiderman-Remastered.png",
    badge: null,
    description: "Swing through New York as an experienced Peter Parker fighting iconic villains.",
    longDescription: "An original Spider-Man story where Peter struggles to balance his chaotic personal life with his hero duties. Features fluid web-swinging, improvisational combat, and stunning visuals. Includes The City That Never Sleeps DLC chapters.",
    features: ["Web-Swinging Traversal", "Manhattan Open World", "Gadget Wheel"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2020-11-12",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 66,
    title: "Spider Man Miles Morales",
    slug: "spider-man-miles-morales",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.5,
    image: "https://i.ibb.co/HLb7nq4D/Spider-Man-Miles-Morales.png",
    badge: null,
    description: "Miles Morales rises as a new Spider-Man to protect his Harlem home.",
    longDescription: "Set one year after the first game. Miles masters unique bio-electric venom blast attacks and camouflage power. He must stop a war between a devious energy corporation and a high-tech criminal army.",
    features: ["Bio-Electric Venom Blasts", "Camouflage Invisibility", "Harlem Winter Setting"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2020-11-12",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 67,
    title: "Spider Man 2 PS5",
    slug: "spider-man-2-ps5",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.0,
    image: "https://i.ibb.co/jvPbpFc4/Spider-Man-2-PS5.png",
    badge: null,
    description: "Peter and Miles team up to face Kraven the Hunter and Venom.",
    longDescription: "Switch between both Spider-Men instantly in an expanded New York. Master the Symbiote suit's savage powers and Miles' evolved venom abilities. The story tests their strength and their bonds as the city faces its greatest threat.",
    features: ["Web Wings", "Symbiote Suit Powers", "Instant Character Switching"],
    systemRequirements: "PS5",
    releaseDate: "2023-10-20",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 68,
    title: "Split Fiction PS5",
    slug: "split-fiction-ps5",
    genre: "Co-op Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.1,
    image: "https://i.ibb.co/0VqwkRt7/Split-Fiction.png",
    badge: null,
    description: "A mind-bending co-op adventure from the creators of It Takes Two.",
    longDescription: "Two writers are trapped in a simulation of their own stories. Players must cooperate to navigate shifting genres - from fantasy to sci-fi - solving puzzles that require splitting the fiction and mechanics between them.",
    features: ["Dynamic Split-Screen", "Reality/Genre Shifting", "Co-op Narrative"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2025-03-06",
    publisher: "Electronic Arts",
    players: "2 players (Co-op)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 69,
    title: "Star Wars Jedi Fallen Order",
    slug: "star-wars-jedi-fallen-order",
    genre: "Action-Adventure",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.9,
    image: "https://i.ibb.co/LDtjsk41/Star-Wars-Jedi-Fallen-Order.png",
    badge: null,
    description: "A galaxy-spanning action-adventure following a Jedi Padawan on the run.",
    longDescription: "Play as Cal Kestis, a survivor of Order 66. Rebuild the Jedi Order while evading the Empire's Inquisitors. Master lightsaber combat and Force abilities in a game that blends Uncharted exploration with Dark Souls combat.",
    features: ["Lightsaber Dueling", "Force Powers", "BD-1 Droid Companion"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2019-11-15",
    publisher: "Electronic Arts",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 70,
    title: "The Order 1886",
    slug: "the-order-1886",
    genre: "Action-Adventure",
    price: 750.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 6.3,
    image: "https://i.ibb.co/FLQ3qftx/The-Order-1886.png",
    badge: null,
    description: "A cinematic shooter set in a steampunk version of Victorian London.",
    longDescription: "Join an ancient order of knights who use advanced technology to fight half-breed monsters. Known for its incredible graphics and seamless transition between cutscenes and gameplay, it delivers a short but intense narrative experience.",
    features: ["Steampunk Victorian London", "Lycan Enemies", "Seamless Cinematic Transitions"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2015-02-20",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 71,
    title: "Uncharted Legacy Of Thieves Bundle",
    slug: "uncharted-legacy-of-thieves-bundle",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.7,
    image: "https://i.ibb.co/ZR4H5WYp/Uncharted-Legacy-Of-Thieves-Bundle.png",
    badge: null,
    description: "The definitive remaster of Uncharted 4 and The Lost Legacy.",
    longDescription: "Seek your fortune as Nathan Drake in his final adventure, and as Chloe Frazer in an expedition to India. Both games feature blockbuster set pieces, witty dialogue, and high-octane puzzle-platforming action.",
    features: ["Grappling Hook Swinging", "Jeep Driving", "Cinematic Set Pieces"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2022-01-28",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 72,
    title: "Warhammer 40000 Space Marine 2",
    slug: "warhammer-40000-space-marine-2",
    genre: "Action Shooter",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.0,
    image: "https://i.ibb.co/fz3swr2t/Warhammer-40000-Space-Marine-2.png",
    badge: null,
    description: "A brutal third-person shooter where you play as a superhuman Space Marine.",
    longDescription: "Titus returns to fight the Tyranid swarms. Unleash deadly abilities and an arsenal of devastating weaponry to obliterate hundreds of enemies on screen. Defend the Imperium in the solo campaign or 3-player co-op modes.",
    features: ["Tyranid Swarms", "Chainsword Executions", "Titus Protagonist"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2024-09-09",
    publisher: "Focus Entertainment",
    players: "1-12 players (PvP) / 1-3 (Co-op)",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 73,
    title: "Witcher 3 Complete Edition",
    slug: "witcher-3-complete-edition",
    genre: "Action RPG",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.4,
    image: "https://i.ibb.co/Rk9M6L0C/Witcher-3-Complete-Edition.png",
    badge: null,
    description: "An open-world RPG masterpiece about a monster hunter searching for his adopted daughter.",
    longDescription: "Play as Geralt of Rivia in a war-torn, morally ambiguous world. Track down the Child of Prophecy while hunting beasts and solving quests. The Complete Edition includes the massive Hearts of Stone and Blood and Wine expansions.",
    features: ["Monster Hunting Contracts", "Geralt of Rivia", "Gwent Card Game"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2022-12-14",
    publisher: "CD Projekt Red",
    players: "1 player",
    onlinePlay: true,
    discount: 10
  },
  {
    id: 74,
    title: "God of War III Remastered",
    slug: "god-of-war-3-remastered",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.1,
    image: "https://i.ibb.co/mrmnsKPw/God-of-War-III-Remastered.png",
    badge: null,
    description: "Kratos' final chapter in his war against the Greek gods, remastered in 1080p.",
    longDescription: "Set in the realm of brutal Greek mythology, God of War III Remastered allows players to take on the fearless role of Kratos as he rises from the darkest depths of Hades to scale the very heights of Mount Olympus to seek his bloody revenge on those who have betrayed him.",
    features: ["1080p at 60fps", "Photo Mode", "Ground-breaking depth of scale", "Realistic muscle realism", "Destructible environments"],
    systemRequirements: "PS4",
    releaseDate: "2015-07-14",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 75,
    title: "Dead Space Remake",
    slug: "dead-space-remake",
    genre: "Survival Horror",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.9,
    image: "https://i.ibb.co/HDbYCtwx/Dead-Space-Remake.png",
    badge: null,
    description: "A complete remake of the sci-fi survival horror classic, rebuilt with the Frostbite engine.",
    longDescription: "Isaac Clarke is an everyman engineer on a mission to repair a vast mining ship, the USG Ishimura, only to discover something has gone horribly wrong. The ship's crew has been slaughtered and Isaac's beloved partner, Nicole, is lost somewhere on board. Rebuilt from the ground up with elevated visual fidelity.",
    features: ["Fully rebuilt assets", "3D atmospheric audio", "Peeling system for necromorph damage", "Zero-G freedom", "No camera cuts"],
    systemRequirements: "PS5",
    releaseDate: "2023-01-27",
    publisher: "Electronic Arts",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 76,
    title: "Days Gone Remastered",
    slug: "days-gone-remastered",
    genre: "Action-Adventure",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.0,
    image: "https://i.ibb.co/DPhNCwb8/Days-Gone-Remastered.png",
    badge: null,
    description: "Ride into a desperate dog-eat-dog world ravaged by a deadly pandemic as drifter Deacon St. John.",
    longDescription: "Days Gone Remastered brings the open-world survival action to PS5 with improved graphical fidelity, increased foliage draw distance, and Tempest 3D Audio. Play as Deacon St. John, a bounty hunter facing a brutal struggle for survival against feral creatures known as Freakers in the high desert of the Pacific Northwest.",
    features: ["4K resolution support", "60 FPS", "DualSense haptic feedback", "New 'Horde Assault' arcade mode", "Permadeath mode"],
    systemRequirements: "PS5",
    releaseDate: "2025-04-25",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 77,
    title: "Resident Evil Requiem",
    slug: "resident-evil-requiem",
    genre: "Survival Horror",
    price: 4000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/wj60s5j/Resident-Evil-Requiem.png",
    badge: "Preorder",
    description: "The ninth mainline entry features Leon S. Kennedy and FBI analyst Grace Ashcroft in a terrifying new investigation.",
    longDescription: "Commemorating the series' 30th anniversary, Requiem returns to the narrative between the Raccoon City incident and Umbrella's fall. Switch between FBI analyst Grace Ashcroft in tense first-person survival sections and agent Leon S. Kennedy in action-heavy third-person combat as they uncover the dark secrets of a devastated region.",
    features: ["Dual protagonists", "Switchable First/Third-person perspectives", "Lighting-based stealth mechanics", "RE Engine graphics", "Expanded melee combat"],
    systemRequirements: "PS5",
    releaseDate: "2026-02-27",
    publisher: "Capcom",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 78,
    title: "Grand Theft Auto V",
    slug: "grand-theft-auto-v",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 60,
    originalPrice: null,
    rating: 8.1,
    image: "https://i.ibb.co/rffVcXTm/Grand-Theft-Auto-V.png",
    badge: null,
    description: "Experience the interwoven stories of three criminals in the sprawling city of Los Santos.",
    longDescription: "When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government, and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city.",
    features: ["Three playable protagonists", "Massive open world", "GTA Online included", "First-person mode", "Rockstar Editor"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2014-11-18",
    publisher: "Rockstar Games",
    players: "1-30 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 79,
    title: "Red Dead Redemption 2: Ultimate Edition",
    slug: "red-dead-redemption-2-ultimate-edition",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 60,
    originalPrice: null,
    rating: 9.7,
    image: "https://i.ibb.co/BKFfn34B/Red-Dead-Redemption-2-Ultimate-Edition.png",
    badge: null,
    description: "An epic tale of life in America's unforgiving heartland, including exclusive Story Mode and Online content.",
    longDescription: "Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal, and fight their way across the rugged heartland of America in order to survive.",
    features: ["Exclusive Story Mode Bank Robbery Mission", "Dappled Black Thoroughbred horse", "Bonus Outfits", "Rank Bonuses for Online", "Free Survivor Camp Theme"],
    systemRequirements: "PS4",
    releaseDate: "2018-10-26",
    publisher: "Rockstar Games",
    players: "1-32 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 80,
    title: "Mortal Kombat 1: Definitive Edition",
    slug: "mortal-kombat-1-definitive-edition",
    genre: "Fighting",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.3,
    image: "https://i.ibb.co/SDqQXhGp/Mortal-Kombat-1-Definitive-Edition.png",
    badge: null,
    description: "The complete MK1 experience featuring the reborn universe, Khaos Reigns expansion, and all Kombat Packs.",
    longDescription: "Discover a reborn Mortal Kombat Universe created by the Fire God Liu Kang. This Definitive Edition includes the base game, the cinematic Khaos Reigns story expansion, and the complete roster of DLC fighters including Omni-Man, Peacemaker, and Homelander, plus the return of fan-favorite Animalities.",
    features: ["Kameo Fighter system", "Immersive Story Campaign", "Khaos Reigns Expansion included", "Cross-play support", "4K visuals"],
    systemRequirements: "PS5",
    releaseDate: "2025-05-14",
    publisher: "Warner Bros. Games",
    players: "1-2 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 81,
    title: "Unravel Yarny Bundle",
    slug: "unravel-yarny-bundle",
    genre: "Puzzle-Platformer",
    price: 500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.8,
    image: "https://i.ibb.co/bjZjp0Ws/Unravel-Yarny-Bundle.png",
    badge: null,
    description: "A collection containing both Unravel and Unravel Two.",
    longDescription: "Join Yarny, a character made from a single thread of yarn, on a life-sized adventure. In Unravel, swing through the rigorous Northern Scandinavian landscape to reconnect memories of a lost family. In Unravel Two, build relationships with other Yarnys in local co-op and solve complex puzzles together.",
    features: ["Includes Unravel 1 and 2", "Physics-based puzzles", "Local Co-op (Unravel Two)", "Stunning photorealistic graphics", "Emotional storytelling"],
    systemRequirements: "PS4",
    releaseDate: "2018-07-23",
    publisher: "Electronic Arts",
    players: "1-2 players",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 82,
    title: "Control Ultimate Edition",
    slug: "control-ultimate-edition",
    genre: "Action-Adventure",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.5,
    image: "https://i.ibb.co/5XhHFxN3/Control-Ultimate-Edition.png",
    badge: null,
    description: "Master supernatural abilities in this third-person action-adventure, including all expansions.",
    longDescription: "A corruptive presence has invaded the Federal Bureau of Control. Only you have the power to stop it. The world is now your weapon in an epic fight to annihilate an ominous enemy through deep and unpredictable environments. Contains the main game and all previously released Expansions ('The Foundation' and 'AWE').",
    features: ["Ray Tracing support (PS5)", "Haptic Feedback", "Shape-shifting Service Weapon", "Telekinetic abilities", "Metroidvania-style exploration"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-02-02",
    publisher: "505 Games",
    players: "1 player",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 83,
    title: "Far Cry 3 Classic Edition",
    slug: "far-cry-3-classic-edition",
    genre: "First-Person Shooter",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.0,
    image: "https://i.ibb.co/Y7VZcqLC/Far-Cry-3-Classic-Edition.png",
    badge: null,
    description: "Rediscover the Rook Island and face off against Vaas in this classic shooter.",
    longDescription: "Create your own adventure in a single-player open world island where the only rules are 'kill or be killed.' You play as Jason Brody, stranded on a mysterious tropical island ruled by lawlessness and violence. You must slash, sneak, and shoot your way across the island to save your friends.",
    features: ["Updated graphics for modern consoles", "Iconic villain Vaas Montenegro", "Open-world exploration", "Diverse weapon arsenal", "Skill tree progression"],
    systemRequirements: "PS4",
    releaseDate: "2018-06-26",
    publisher: "Ubisoft",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 84,
    title: "Need for Speed Heat",
    slug: "need-for-speed-heat",
    genre: "Racing",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.2,
    image: "https://i.ibb.co/PZV81q8J/Need-for-Speed-Heat.png",
    badge: null,
    description: "Hustle by day and risk it all at night in this white-knuckle street racer.",
    longDescription: "Compete in the Speedhunter Showdown by day to earn bank, then flip the script at night to build your rep in underground street races. Facing a rogue police task force, you must customize your fleet of cars and leave your mark on Palm City's street racing scene.",
    features: ["Day/Night cycle", "Deep car customization", "Police chases", "Cross-play support", "Open-world Palm City"],
    systemRequirements: "PS4",
    releaseDate: "2019-11-08",
    publisher: "Electronic Arts",
    players: "1-16 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 85,
    title: "Need for Speed Payback",
    slug: "need-for-speed-payback",
    genre: "Racing",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 6.1,
    image: "https://i.ibb.co/ks9jbJpS/Need-for-Speed-Payback.png",
    badge: null,
    description: "Survive a heist gone wrong and take down The House in the underworld of Fortune Valley.",
    longDescription: "Set in the underworld of Fortune Valley, you and your crew were divided by betrayal and reunited by revenge to take down The House, a nefarious cartel that rules the city's casinos, criminals, and cops. Craft unique rides with deeper performance and visual customization than ever before.",
    features: ["Three playable characters", "Action-driving missions", "Relic cars (derelicts)", "Off-road racing", "Drag racing"],
    systemRequirements: "PS4",
    releaseDate: "2017-11-10",
    publisher: "Electronic Arts",
    players: "1-8 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 86,
    title: "Forza Horizon 5",
    slug: "forza-horizon-5",
    genre: "Racing",
    price: 8500.00,
    rentalPeriodDays: 0,
    originalPrice: null,
    rating: 9.2,
    image: "https://i.ibb.co/XZgrFP4F/Forza-Horizon-5.png",
    badge: null,
    description: "The ultimate Horizon adventure awaits in the vibrant and ever-evolving landscapes of Mexico.",
    longDescription: "Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world's greatest cars. Lead breathtaking expeditions across a world of striking contrast and beauty while battling awe-inspiring weather events like towering dust storms and intense tropical storms.",
    features: ["Largest Horizon world yet", "EventLab for custom modes", "Dynamic weather", "Ray tracing (Forzavista)", "Cross-platform play"],
    systemRequirements: "PS5",
    releaseDate: "2021-11-09",
    publisher: "Xbox Game Studios",
    players: "1-12 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 87,
    title: "The Last of Us Remastered",
    slug: "the-last-of-us-remastered",
    genre: "Action-Adventure",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.5,
    image: "https://i.ibb.co/kdKxFCK/Last-Of-Us-Remastered.png",
    badge: null,
    description: "The game that defined a generation, remastered for PS4.",
    longDescription: "In a ravaged civilization, where infected and hardened survivors run rampant, weary protagonist Joel is hired to smuggle 14-year-old Ellie out of a military quarantine zone. What starts as a small job soon transforms into a brutal cross-country journey. Includes the 'Left Behind' single-player prequel chapter.",
    features: ["1080p/60fps", "Factions Multiplayer Mode", "Photo Mode", "Includes Left Behind DLC", "Director commentary"],
    systemRequirements: "PS4",
    releaseDate: "2014-07-29",
    publisher: "Sony Interactive Entertainment",
    players: "1-8 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 88,
    title: "The Last of Us Part II",
    slug: "the-last-of-us-part-2",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 9.3,
    image: "https://i.ibb.co/4nV1hk7S/The-Last-of-Us-Part-II.png",
    badge: null,
    description: "Experience the winner of over 300 Game of the Year awards with new modes and enhancements.",
    longDescription: "Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled in Jackson, Wyoming. When a violent event disrupts that peace, Ellie embarks on a relentless journey to carry out justice and find closure. Remastered for PS5 with new roguelike survival mode 'No Return.'",
    features: ["Native 4K support", "No Return roguelike mode", "Lost Levels (cut content)", "Guitar Free Play", "DualSense integration"],
    systemRequirements: "PS4",
    releaseDate: "2024-01-19",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 89,
    title: "Lies of P",
    slug: "lies-of-p",
    genre: "Action RPG",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.0,
    image: "https://i.ibb.co/TDsH9HdD/Lies-Of-P.png",
    badge: null,
    description: "A dark Belle Epoque retelling of Pinocchio's story.",
    longDescription: "You are a puppet created by Geppetto who's caught in a web of lies with unimaginable monsters and untrustworthy figures standing between you and the events that have befallen the world of Krat. Confront the city's madness with a unique weapon-making system and special abilities.",
    features: ["Weapon assembly system", "Fable Arts", "P-Organ skill tree", "Multiple endings", "60fps Performance Mode"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2023-09-19",
    publisher: "Neowiz Games",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 90,
    title: "Detroit: Become Human",
    slug: "detroit-become-human",
    genre: "Adventure",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.8,
    image: "https://i.ibb.co/Wp5HD3P2/Detroit-Become-Human.png",
    badge: null,
    description: "A narrative-driven thriller where androids gain sentience.",
    longDescription: "Enter the near-future metropolis of Detroit in 2038 - a city rejuvenated by the introduction of highly advanced androids that exist only to serve mankind. But that's all about to change. Step into the shoes of three distinct android characters as this brave new world teeters on the brink of chaos.",
    features: ["Branching narrative", "Multiple endings", "Three playable characters", "Flowchart system", "4K visuals"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2018-05-25",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 91,
    title: "A Plague Tale: Requiem",
    slug: "a-plague-tale-requiem",
    genre: "Action-Adventure",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.2,
    image: "https://i.ibb.co/Y47dxYks/Plague-Tale-Requiem.png",
    badge: null,
    description: "Amicia and Hugo travel south to start a new life while evading the curse.",
    longDescription: "After escaping their devastated homeland, Amicia and Hugo travel far south to new regions and vibrant cities. But when Hugo's powers reawaken, death and destruction return in a flood of devouring rats. Forced to flee once more, the siblings place their hopes in a prophesied island that may hold the key to saving Hugo.",
    features: ["Stealth gameplay", "Rat swarm tech", "Crossbow combat", "Alchemy crafting", "Photo Mode"],
    systemRequirements: "PS5",
    releaseDate: "2022-10-18",
    publisher: "Focus Entertainment",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 92,
    title: "Star Wars Jedi: Survivor",
    slug: "star-wars-jedi-survivor",
    genre: "Action-Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.5,
    image: "https://i.ibb.co/B5T12qmM/Jedi-Survivor.png",
    badge: null,
    description: "Cal Kestis continues his crusade against the Empire in this galaxy-spanning sequel.",
    longDescription: "Five years after the events of Fallen Order, Cal Kestis must stay one step ahead of the Empire's constant pursuit as he begins to feel the weight of being one of the last remaining Jedi in the galaxy. Developed by the veteran team at Respawn Entertainment.",
    features: ["Cinematic combat", "New Force abilities", "Expanded exploration", "Dual-wield lightsabers", "Mount traversal"],
    systemRequirements: "PS5",
    releaseDate: "2023-04-28",
    publisher: "Electronic Arts",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 93,
    title: "Red Dead Redemption",
    slug: "red-dead-redemption",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.6,
    image: "https://i.ibb.co/SwZwc0tx/Red-dead-redemption.png",
    badge: null,
    description: "John Marston hunts down the last of his former gang to save his family.",
    longDescription: "When federal agents threaten his family, former outlaw John Marston is forced to hunt down the gang of criminals he once called friends. Experience Marston's journey across the sprawling expanses of the American West and Mexico as he fights to bury his blood-stained past.",
    features: ["4K support (PS5)", "Undead Nightmare included", "Open world western", "Dead Eye targeting", "Hardcore mode"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2023-08-17",
    publisher: "Rockstar Games",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 94,
    title: "Silent Hill f",
    slug: "silent-hill-f",
    genre: "Survival Horror",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/pBxNRtBY/Silent-Hill-F.png",
    badge: null,
    description: "A completely new story set in 1960s Japan written by Ryukishi07.",
    longDescription: "Set in 1960s Japan featuring a beautiful yet horrifying world. Written by Ryukishi07, famed for visual novels dealing with murder mysteries and psychological and supernatural horror, this entry brings the series' signature psychological terror to a completely new setting and era.",
    features: ["New setting (1960s Japan)", "Psychological horror", "Flower-based monstrosities", "Written by Ryukishi07", "Unreal Engine 5"],
    systemRequirements: "PS5",
    releaseDate: "2025-09-25",
    publisher: "Konami",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 95,
    title: "Stray",
    slug: "stray",
    genre: "Adventure",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.3,
    image: "https://i.ibb.co/7xRKYscK/Stray.png",
    badge: null,
    description: "A lost cat unravels an ancient mystery in a long-forgotten cybercity.",
    longDescription: "Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home. Roam surroundings high and low, defend against unforeseen threats and solve the mysteries of this unwelcoming place inhabited by curious droids.",
    features: ["Play as a cat", "Cyberpunk atmosphere", "Puzzle platforming", "Meow button", "Haptic feedback"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2022-07-19",
    publisher: "Annapurna Interactive",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 96,
    title: "Gears of War: Reloaded",
    slug: "gears-of-war-reloaded",
    genre: "Third-Person Shooter",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.7,
    image: "https://i.ibb.co/04C1pd5/Gears-Of-War-Reloaded.png",
    badge: null,
    description: "The genre-defining shooter remastered for modern consoles.",
    longDescription: "Experience the game that started it all, fully remastered in 4K with modernized gameplay mechanics. Join Marcus Fenix and Delta Squad as they fight to save humanity from the Locust Horde in this gritty, tactical third-person shooter that defined a generation of cover-based combat.",
    features: ["4K 120fps support", "Cross-play", "Modernized cover system", "Split-screen co-op", "Includes all DLC maps"],
    systemRequirements: "PS5",
    releaseDate: "2025-08-26",
    publisher: "Xbox Game Studios",
    players: "1-8 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 97,
    title: "Wuchang: Fallen Feathers",
    slug: "wuchang-fallen-feathers",
    genre: "Action RPG",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.1,
    image: "https://i.ibb.co/7J36QGsx/Wuchang-Fallen-Feathers.png",
    badge: null,
    description: "A soulslike set in the chaotic late Ming Dynasty of imperial China.",
    longDescription: "Set in the chaotic final years of the Ming Dynasty, Wuchang: Fallen Feathers is an exploration of the hauntingly beautiful landscapes of imperial China and the battle against a mysterious force that transforms reality into a grotesque nightmare. Master a variety of weapons and ancient powers.",
    features: ["Soulslike combat", "Chinese mythology setting", "Weapon transformation", "Dark fantasy atmosphere", "Boss rush mode"],
    systemRequirements: "PS5",
    releaseDate: "2025-07-24",
    publisher: "505 Games",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 98,
    title: "Senua's Saga: Hellblade II",
    slug: "senuas-saga-hellblade-2",
    genre: "Action-Adventure",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.8,
    image: "https://i.ibb.co/3yPxyBvY/hell-Blade-2.png",
    badge: null,
    description: "Senua returns in a brutal journey of survival through the myth and torment of Viking Iceland.",
    longDescription: "Intent on saving those who have fallen victim to the horrors of tyranny, Senua faces a battle of overcoming the darkness within and without. Sink deep into the next chapter of Senua's story, a crafted experience told through cinematic immersion, beautifully realized visuals and encapsulating sound.",
    features: ["Binaural audio", "Photorealistic graphics", "Psychological narrative", "Cinematic combat", "No HUD"],
    systemRequirements: "PS5",
    releaseDate: "2024-05-21",
    publisher: "Xbox Game Studios",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 99,
    title: "Doom: The Dark Ages",
    slug: "doom-the-dark-ages",
    genre: "First-Person Shooter",
    price: 3000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/Vccqdr1M/Doom-Dark-Age.png",
    badge: null,
    description: "The prequel to Doom (2016) and Doom Eternal, set in a medieval war against Hell.",
    longDescription: "Witness the origin of the Slayer's rage. Doom: The Dark Ages is a single-player, action-FPS prequel to the critically acclaimed Doom (2016) and Doom Eternal. Fight through a medieval war against Hell using a new arsenal of super-heavy weaponry in this cinematic origin story.",
    features: ["Shield Saw weapon", "Dragon riding", "Medieval setting", "Destructible demons", "Glory Kills"],
    systemRequirements: "PS5",
    releaseDate: "2025-05-15",
    publisher: "Bethesda Softworks",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 100,
    title: "Ninja Gaiden II: Black",
    slug: "ninja-gaiden-2-black",
    genre: "Action",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.9,
    image: "https://i.ibb.co/wvzhNLC/Ninja-2-Black.png",
    badge: null,
    description: "The definitive version of the legendary high-speed action game.",
    longDescription: "The master ninja Ryu Hayabusa returns in this definitive version of the high-speed action classic. Featuring restored content, rebalanced difficulty, and 4K visuals, players must utilize a vast arsenal of deadly weapons to dismember the Spider Ninja clan and the Fiends.",
    features: ["4K 120Hz support", "Restored gore", "New playable characters", "Mission Mode", "Master Ninja difficulty"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2025-01-23",
    publisher: "Koei Tecmo",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 101,
    title: "Ninja Gaiden 4",
    slug: "ninja-gaiden-4",
    genre: "Action",
    price: 3000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/wZrt5LYV/Ninja-Gaiden4.png",
    badge: null,
    description: "Ryu Hayabusa returns in a new mainline entry with open-zone exploration.",
    longDescription: "The first new mainline entry in over a decade. Ryu Hayabusa and new protagonist Yakumo must stop a resurrection ritual that threatens to merge the demon world with the human realm. Features the series' signature high-speed combat with new open-zone exploration elements.",
    features: ["Dual protagonists", "Open-zone levels", "New weapon types", "Ray-tracing support", "Cross-play co-op"],
    systemRequirements: "PS5",
    releaseDate: "2025-10-21",
    publisher: "Koei Tecmo",
    players: "1-2 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 102,
    title: "Yakuza: Like a Dragon",
    slug: "yakuza-like-a-dragon",
    genre: "RPG",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.4,
    image: "https://i.ibb.co/cK8G6J63/Yakusa-Like-a-Dragon.png",
    badge: null,
    description: "Ichiban Kasuga rises from rock bottom in this turn-based RPG.",
    longDescription: "Ichiban Kasuga, a low-ranking grunt of a low-ranking yakuza family in Tokyo, faces a 18-year prison sentence after taking the fall for a crime he didn't commit. Experience dynamic RPG combat like none other, where the battlefield becomes your weapon.",
    features: ["Turn-based RPG combat", "Job system", "Yokohama setting", "Dragon Kart minigame", "Business management sim"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2020-11-10",
    publisher: "Sega",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 103,
    title: "Like a Dragon: Pirate Yakuza in Hawaii",
    slug: "like-a-dragon-pirate-yakuza",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.5,
    image: "https://i.ibb.co/mVWd4Kwh/Pirate-Yakusa.png",
    badge: null,
    description: "Goro Majima takes to the high seas as a pirate captain.",
    longDescription: "Goro Majima washes up on a remote island in the Pacific with no memory and finds himself captaining a pirate ship. Engage in naval combat, explore the Hawaiian archipelago, and uncover a conspiracy involving the criminal underworld in this over-the-top action spin-off.",
    features: ["Naval combat", "Pirate crew management", "Real-time brawler combat", "Island exploration", "Majima quirkiness"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2025-02-28",
    publisher: "Sega",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 104,
    title: "The First Berserker: Khazan",
    slug: "the-first-berserker-khazan",
    genre: "Action RPG",
    price: 3000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/JwV7HzDQ/First-Berserker-Khazan.png",
    badge: null,
    description: "A hardcore action RPG in the Dungeon Fighter universe.",
    longDescription: "Based on the Dungeon & Fighter universe, this hardcore action RPG follows General Khazan, who was falsely accused of treason and exiled. Survive the relentless pursuit of imperial forces and monsters while unraveling the conspiracy that led to your downfall.",
    features: ["Hardcore action combat", "Cel-shaded 3D graphics", "Weapon mastery system", "Revenge storyline", "Stamina-based battles"],
    systemRequirements: "PS5",
    releaseDate: "2025-03-27",
    publisher: "Nexon",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 105,
    title: "Reanimal",
    slug: "reanimal",
    genre: "Horror Adventure",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/pB6h20WR/Reanimal.png",
    badge: null,
    description: "A terrifying co-op horror adventure from the creators of Little Nightmares.",
    longDescription: "From the creators of Little Nightmares comes a darker, more terrifying journey. A brother and sister go through hell to rescue their missing friends. Exploring a distorted world, they must work together to survive the monstrosities that hunt them in this cooperative horror adventure.",
    features: ["Local & Online Co-op", "Shared camera perspective", "Grotesque monster design", "Environmental puzzles", "Unreal Engine 5"],
    systemRequirements: "PS5",
    releaseDate: "2026-02-13",
    publisher: "THQ Nordic",
    players: "1-2 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 106,
    title: "Doom Eternal",
    slug: "doom-eternal",
    genre: "First-Person Shooter",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.7,
    image: "https://i.ibb.co/svfy15vs/Doom-Eternal.png",
    badge: null,
    description: "Become the Slayer and conquer demons across dimensions to save Earth.",
    longDescription: "Hell's armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you. Experience the ultimate combination of speed and power.",
    features: ["Dash and double jump", "Battlemode multiplayer", "Destructible demons", "Heavy metal soundtrack", "Master Levels"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2020-03-20",
    publisher: "Bethesda Softworks",
    players: "1-3 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 107,
    title: "Ratchet & Clank: Rift Apart",
    slug: "ratchet-and-clank-rift-apart",
    genre: "Platformer",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.8,
    image: "https://i.ibb.co/1GqzrndQ/Ratchet-and-Clank-Rift-Apart.png",
    badge: null,
    description: "Blast your way through an interdimensional adventure with Ratchet and Rivet.",
    longDescription: "Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality. Jump between action-packed worlds and beyond at mind-blowing speeds - complete with dazzling visuals and an insane arsenal - as the intergalactic adventurers blast onto the PS5 console.",
    features: ["Instant dimension loading", "DualSense haptic feedback", "Ray tracing", "New character Rivet", "Crazy weaponry"],
    systemRequirements: "PS5",
    releaseDate: "2021-06-11",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 108,
    title: "Need for Speed Hot Pursuit Remastered",
    slug: "nfs-hot-pursuit-remastered",
    genre: "Racing",
    price: 500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.5,
    image: "https://i.ibb.co/VWPTcQtJ/NFS-Hot-Persuit-Remastered.png",
    badge: null,
    description: "Feel the thrill of the chase and the rush of escape in this classic racer.",
    longDescription: "Unleash a savage sense of speed both as an outlaw and a cop in the world's hottest high-performance cars. Outsmart the heat or take down lawbreakers with the tactical weaponry at your disposal in a heart-pumping, socially competitive racing experience.",
    features: ["Cross-play multiplayer", "Autolog system", "Included DLC", "Enhanced visuals", "Cop vs Racer career"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2020-11-06",
    publisher: "Electronic Arts",
    players: "1-8 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 109,
    title: "The Callisto Protocol",
    slug: "the-callisto-protocol",
    genre: "Survival Horror",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 6.9,
    image: "https://i.ibb.co/PGFpwLHn/The-Callisto-Protocol.png",
    badge: null,
    description: "Survive the horrors of Black Iron Prison on Jupiter's moon.",
    longDescription: "In this narrative-driven, third-person survival horror game set 300 years in the future, the player takes on the role of Jacob Lee, a victim of fate thrown into Black Iron Prison, a maximum-security penitentiary located on Jupiter's moon, Callisto.",
    features: ["Strategic dismemberment", "Gravity weapon (GRP)", "Brutal melee combat", "Atmospheric lighting", "Mutation system"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2022-12-02",
    publisher: "Krafton",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 110,
    title: "Marvel's Guardians of the Galaxy",
    slug: "marvels-guardians-of-the-galaxy",
    genre: "Action-Adventure",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.0,
    image: "https://i.ibb.co/Xr9MQPxR/Marvel-s-Guardian-OF-the-Galaxy.png",
    badge: null,
    description: "Lead the Guardians in this fresh take on the Marvel universe.",
    longDescription: "Fire up Star-Lord's jet boots for a wild ride across the cosmos in this third-person action-adventure game, a fresh take on Marvel's Guardians of the Galaxy. With the unpredictable Guardians at your side, blast your way from one explosive situation to another.",
    features: ["Squad-based commands", "Choice-driven narrative", "Licensed 80s soundtrack", "Huddle up mechanic", "Original story"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-10-26",
    publisher: "Square Enix",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 111,
    title: "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
    slug: "stalker-2",
    genre: "First-Person Shooter",
    price: 2500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.5,
    image: "https://i.ibb.co/20nM1nVL/STALKER-2-Heart-of-Chernobyl.png",
    badge: null,
    description: "Survive the vast, dangerous Chornobyl Exclusion Zone.",
    longDescription: "Discover the vast Chornobyl Exclusion Zone full of dangerous enemies, deadly anomalies and powerful artifacts. Unveil your own epic story as you make your way to the Heart of Chornobyl. Make your choices wisely, as they will determine your fate in the end.",
    features: ["Non-linear story", "A-Life 2.0 system", "Survival mechanics", "Unreal Engine 5", "Dynamic weather"],
    systemRequirements: "PS5",
    releaseDate: "2025-11-20",
    publisher: "GSC Game World",
    players: "1 player",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 112,
    title: "Stellar Blade",
    slug: "stellar-blade",
    genre: "Action-Adventure",
    price: 3500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.2,
    image: "https://i.ibb.co/q3NmBqNR/Stellar-Blade.png",
    badge: null,
    description: "Reclaim Earth from the Naytiba in this stylish action game.",
    longDescription: "Save humanity from extinction in this electrifying story-driven action adventure. Earth has been abandoned, ravaged by powerful and strange creatures. Eve, a member of the 7th Airborne Squad, arrives on the desolate remains of our planet with a clear mission: to save humankind.",
    features: ["Fast-paced combat", "DualSense features", "Stunning visuals", "Skill tree progression", "Boss rush mode"],
    systemRequirements: "PS5",
    releaseDate: "2024-04-26",
    publisher: "Sony Interactive Entertainment",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 113,
    title: "Little Nightmares II",
    slug: "little-nightmares-2",
    genre: "Puzzle-Platformer",
    price: 1500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.2,
    image: "https://i.ibb.co/HDvMWGTF/Little-Nightmares-2.png",
    badge: null,
    description: "Return to a world of charming horror as Mono and Six.",
    longDescription: "A suspense adventure game in which you play as Mono, a young boy trapped in a world that has been distorted by the humming transmission of a distant tower. With Six, the girl in a yellow raincoat, as his guide, Mono sets out to discover the dark secrets of The Signal Tower.",
    features: ["Co-op AI companion", "Atmospheric horror", "Puzzle solving", "Unique boss encounters", "Distorted world design"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2021-02-11",
    publisher: "Bandai Namco",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 114,
    title: "No Man's Sky",
    slug: "no-mans-sky",
    genre: "Survival",
    price: 2000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 7.7,
    image: "https://i.ibb.co/fVhmshck/No-man-Sky.png",
    badge: null,
    description: "Explore an infinite procedurally generated universe.",
    longDescription: "Inspired by the adventure and imagination that we love from classic science-fiction, No Man's Sky presents you with a galaxy to explore, filled with unique planets and lifeforms, and constant danger and action. Every star is the light of a distant sun, each orbited by planets filled with life.",
    features: ["Procedurally generated galaxy", "Base building", "Space combat", "Cross-play", "VR support"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2016-08-09",
    publisher: "Hello Games",
    players: "1-32 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 115,
    title: "Saros",
    slug: "saros",
    genre: "Action Roguelike",
    price: 4000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/kVbccftj/Soros.png",
    badge: null,
    description: "A haunting sci-fi shooter from Housemarque.",
    longDescription: "A haunting, dark, sci-fi adventure from the creators of Returnal. Beneath the shadow of an ominous eclipse, play as a Soltari enforcer on the shape-shifting world of Carcosa. Master a high-tech arsenal in a fluid dance of dodges, shields, and parries.",
    features: ["Roguelike progression", "Bullet hell combat", "Second Chance mechanic", "Co-op multiplayer", "3D Audio soundscapes"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2026-04-29",
    publisher: "Sony Interactive Entertainment",
    players: "1-2 players",
    onlinePlay: true,
    discount: 0
  },
  {
    id: 116,
    title: "Phantom Blade Zero",
    slug: "phantom-blade-zero",
    genre: "Action RPG",
    price: 4000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/XZJ1B0hz/Phantom-Blade.png",
    badge: null,
    description: "Kung-Fu Punk action with lightning fast combat.",
    longDescription: "Soul, an elite assassin serving an elusive but powerful organization known simply as 'The Order,' is framed for the murder of the Order's patriarch. He has 66 days to hunt down the mastermind. Experience Kung-Fu Punk action with lightning-fast moves and a dark, moody world.",
    features: ["Kung-Fu Punk style", "Semi-open world", "Combo-based combat", "Unreal Engine 5", "Multiple weapon styles"],
    systemRequirements: "PS5",
    releaseDate: "2026-09-09",
    publisher: "S-Game",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 117,
    title: "007: First Light",
    slug: "007-first-light",
    genre: "Action-Adventure",
    price: 3500.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/Kc7SJbYN/007-First-Light.png",
    badge: null,
    description: "The origin story of James Bond by IO Interactive.",
    longDescription: "Discover the origin story of James Bond in this original title from the creators of Hitman. Step into the shoes of a young, resourceful Agent 007 as he earns his 00 status in a gripping espionage thriller that blends stealth, action, and cinematic storytelling.",
    features: ["Stealth mechanics", "Gadget utilization", "Exotic locations", "Original narrative", "Third-person action"],
    systemRequirements: "PS5",
    releaseDate: "2026-05-27",
    publisher: "IO Interactive",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 118,
    title: "Crimson Desert",
    slug: "crimson-desert",
    genre: "Open World RPG",
    price: 4000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: null,
    image: "https://i.ibb.co/1f4h77Lk/crimson-Desert.png",
    badge: null,
    description: "An epic saga of mercenaries in the continent of Pywel.",
    longDescription: "Embark on a journey as Kliff, a mercenary leader fighting for survival in the war-torn continent of Pywel. Experience a vast open world with deep storytelling, intense action combat, and a level of freedom that allows you to shape your own destiny.",
    features: ["Open world exploration", "Mercenary system", "Combo-heavy combat", "Mythical beasts", "BlackSpace Engine"],
    systemRequirements: "PS5",
    releaseDate: "2026-03-19",
    publisher: "Pearl Abyss",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  },
  {
    id: 119,
    title: "Metro Exodus",
    slug: "metro-exodus",
    genre: "First-Person Shooter",
    price: 1000.00,
    rentalPeriodDays: 30,
    originalPrice: null,
    rating: 8.2,
    image: "https://i.ibb.co/SDFXG676/Metro-Exodus.png",
    badge: null,
    description: "Flee the ruins of Moscow in an epic continental journey.",
    longDescription: "Flee the shattered ruins of dead Moscow and embark on an epic, continental journey across post-apocalyptic Russia in the greatest Metro adventure yet. Explore the Russian wilderness in vast, non-linear levels and follow a thrilling story-line that spans an entire year through spring, summer and autumn to the depths of nuclear winter.",
    features: ["Sandbox survival", "Weapon customization", "Day/night cycle", "Dynamic weather", "Narrative-driven"],
    systemRequirements: "PS4, PS5",
    releaseDate: "2019-02-15",
    publisher: "Deep Silver",
    players: "1 player",
    onlinePlay: false,
    discount: 0
  }

];

// Helper Functions
function getUniqueGenres() {
    return [...new Set(gamesDatabase.map(game => game.genre))].sort();
}

function filterGames(filters) {
    return gamesDatabase.filter(game => {
        if (filters.genre && filters.genre !== 'all' && game.genre !== filters.genre) {
            return false;
        }
        
        if (filters.priceRange) {
            const range = filters.priceRange;
            if (game.price < range.min || game.price > range.max) {
                return false;
            }
        }
        
        if (filters.minRating && game.rating && game.rating < filters.minRating) {
            return false;
        }
        
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            return game.title.toLowerCase().includes(searchLower) ||
                   game.description.toLowerCase().includes(searchLower);
        }
        
        if (filters.onlinePlay !== undefined && game.onlinePlay !== filters.onlinePlay) {
            return false;
        }
        
        if (filters.rentalPeriod !== undefined && filters.rentalPeriod !== '') {
            if (game.rentalPeriodDays !== parseInt(filters.rentalPeriod)) {
                return false;
            }
        }
        
        return true;
    });
}

function sortGames(games, sortBy) {
    const sorted = [...games];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        case 'newest':
            return sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        case 'title':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return sorted;
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Get game by ID
 */
function getGameById(id) {
    return gamesDatabase.find(game => game.id === parseInt(id));
}

/**
 * Get game by slug
 */
function getGameBySlug(slug) {
    return gamesDatabase.find(game => game.slug === slug);
}

/**
 * Format rental period days into readable text
 */
function formatRentalPeriod(days) {
    if (days === 0 || days === null) return '🔓 Permanent Access';
    if (days === 7) return '⏰ 7 Days (1 Week)';
    if (days === 14) return '⏰ 14 Days (2 Weeks)';
    if (days === 30) return '⏰ 30 Days (1 Month)';
    if (days === 60) return '⏰ 60 Days (2 Months)';
    if (days === 90) return '⏰ 90 Days (3 Months)';
    return `⏰ ${days} Days Rental`;
}

/**
 * Get related games based on genre
 */
function getRelatedGames(gameId, count = 4) {
    const currentGame = getGameById(gameId);
    if (!currentGame) return [];
    
    // Get games from same genre, excluding current game
    const relatedGames = gamesDatabase
        .filter(game => 
            game.id !== parseInt(gameId) && 
            game.genre === currentGame.genre
        )
        .slice(0, count);
    
    // If not enough games in same genre, add other games
    if (relatedGames.length < count) {
        const additionalGames = gamesDatabase
            .filter(game => 
                game.id !== parseInt(gameId) && 
                !relatedGames.includes(game)
            )
            .slice(0, count - relatedGames.length);
        
        relatedGames.push(...additionalGames);
    }
    
    return relatedGames;
}

/**
 * Get unique genres from database
 */
function getUniqueGenres() {
    const genres = new Set();
    gamesDatabase.forEach(game => {
        if (game.genre) {
            genres.add(game.genre);
        }
    });
    return Array.from(genres).sort();
}

/**
 * Filter games based on criteria
 */
function filterGames(filters) {
    let filtered = [...gamesDatabase];
    
    // Search filter
    if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase().trim();
        filtered = filtered.filter(game => 
            game.title.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm) ||
            game.genre.toLowerCase().includes(searchTerm)
        );
    }
    
    // Genre filter
    if (filters.genre && filters.genre !== 'all') {
        filtered = filtered.filter(game => game.genre === filters.genre);
    }
    
    // Price range filter
    if (filters.priceRange) {
        filtered = filtered.filter(game => {
            const price = game.price;
            switch(filters.priceRange) {
                case 'Under Rs1000':
                    return price < 1000;
                case 'Rs1000 - Under Rs2000':
                    return price >= 1000 && price < 2000;
                case 'Rs2000 - Under Rs2500':
                    return price >= 2000 && price < 2500;
                case 'Above Rs2500':
                    return price >= 2500;
                default:
                    return true;
            }
        });
    }
    
    // Online play filter
    if (filters.onlinePlay !== undefined) {
        filtered = filtered.filter(game => game.onlinePlay === filters.onlinePlay);
    }
    
    // On sale filter
    if (filters.onSale) {
        filtered = filtered.filter(game => game.badge === 'Sale' || game.originalPrice);
    }
    
    return filtered;
}

/**
 * Sort games by various criteria
 */
function sortGames(games, sortBy) {
    const sorted = [...games];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
            
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
            
        case 'newest':
            return sorted.sort((a, b) => 
                new Date(b.releaseDate) - new Date(a.releaseDate)
            );
            
        case 'rating':
            return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            
        case 'title':
            return sorted.sort((a, b) => 
                a.title.localeCompare(b.title)
            );
            
        case 'discount':
            return sorted.sort((a, b) => 
                (b.discount || 0) - (a.discount || 0)
            );
            
        case 'featured':
        default:
            return sorted;
    }
}

// Make functions globally available
if (typeof window !== 'undefined') {
    window.formatRentalPeriod = formatRentalPeriod;
    window.getGameById = getGameById;
    window.getGameBySlug = getGameBySlug;
    window.getRelatedGames = getRelatedGames;
    window.getUniqueGenres = getUniqueGenres;
    window.filterGames = filterGames;
    window.sortGames = sortGames;
    window.gamesDatabase = gamesDatabase;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Format rental period days into readable text
 */
function formatRentalPeriod(days) {
  if (!days) return 'Rental period not specified';
  
  if (days === 30) return '1 Month Rental';
  if (days === 60) return '2 Months Rental';
  if (days === 90) return '3 Months Rental';
  if (days === 365) return '1 Year Rental';
  
  return `${days} Days Rental`;
}

/**
 * Get game by ID
 */
function getGameById(id) {
  return gamesDatabase.find(game => game.id === parseInt(id));
}

/**
 * Get related games based on genre
 */
function getRelatedGames(gameId, count = 4) {
  const currentGame = getGameById(gameId);
  if (!currentGame) return [];
  
  // Get games from same genre, excluding current game
  const relatedGames = gamesDatabase
    .filter(game => 
      game.id !== gameId && 
      game.genre === currentGame.genre
    )
    .slice(0, count);
  
  // If not enough games in same genre, add other games
  if (relatedGames.length < count) {
    const additionalGames = gamesDatabase
      .filter(game => 
        game.id !== gameId && 
        !relatedGames.includes(game)
      )
      .slice(0, count - relatedGames.length);
    
    relatedGames.push(...additionalGames);
  }
  
  return relatedGames;
}

/**
 * Get unique genres from database
 */
function getUniqueGenres() {
  const genres = new Set();
  gamesDatabase.forEach(game => {
    if (game.genre) {
      genres.add(game.genre);
    }
  });
  return Array.from(genres).sort();
}

/**
 * Filter games based on criteria
 */
function filterGames(filters) {
  let filtered = [...gamesDatabase];
  
  // Search filter
  if (filters.search && filters.search.trim() !== '') {
    const searchTerm = filters.search.toLowerCase().trim();
    filtered = filtered.filter(game => 
      game.title.toLowerCase().includes(searchTerm) ||
      game.description.toLowerCase().includes(searchTerm) ||
      game.genre.toLowerCase().includes(searchTerm)
    );
  }
  
  // Genre filter
  if (filters.genre && filters.genre !== 'all') {
    filtered = filtered.filter(game => game.genre === filters.genre);
  }
  
  // Price range filter
  if (filters.priceRange) {
    filtered = filtered.filter(game => {
      const price = game.price;
      switch(filters.priceRange) {
        case 'Under Rs1000':
          return price < 1000;
        case 'Rs1000 - Under Rs2000':
          return price >= 1000 && price < 2000;
        case 'Rs2000 - Under Rs2500':
          return price >= 2000 && price < 2500;
        case 'Above Rs2500':
          return price >= 2500;
        default:
          return true;
      }
    });
  }
  
  // Online play filter
  if (filters.onlinePlay !== undefined) {
    filtered = filtered.filter(game => game.onlinePlay === filters.onlinePlay);
  }
  
  // On sale filter
  if (filters.onSale) {
    filtered = filtered.filter(game => game.badge === 'Sale' || game.originalPrice);
  }
  
  return filtered;
}

/**
 * Sort games by various criteria
 */
function sortGames(games, sortBy) {
  const sorted = [...games];
  
  switch(sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
      
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
      
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.releaseDate) - new Date(a.releaseDate)
      );
      
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      
    case 'title':
      return sorted.sort((a, b) => 
        a.title.localeCompare(b.title)
      );
      
    case 'discount':
      return sorted.sort((a, b) => 
        (b.discount || 0) - (a.discount || 0)
      );
      
    case 'featured':
    default:
      return sorted;
  }
}

// Make functions globally available
if (typeof window !== 'undefined') {
  window.formatRentalPeriod = formatRentalPeriod;
  window.getGameById = getGameById;
  window.getRelatedGames = getRelatedGames;
  window.getUniqueGenres = getUniqueGenres;
  window.filterGames = filterGames;
  window.sortGames = sortGames;
}
