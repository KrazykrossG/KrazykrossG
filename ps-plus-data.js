// ============================================
// PS PLUS SUBSCRIPTION DATABASE - ENHANCED
// Multiple pricing options per tier
// Last updated: February 3, 2026
// ============================================

const psPlusSubscriptions = [
  {
    id: "ps-plus-extra",
    title: "PS Plus Extra (12 Months)",
    tier: "Extra",
    slug: "ps-plus-extra",
    duration: "12 months",
    durationDays: 365,
    image: "https://i.ibb.co/1Y9tv9hT/PS-Plus-Extra-3-D-Icon.png", // Replace with actual image (200x200px recommended)
    badge: null,
    description: "Access 400+ PS5 and PS4 games with online multiplayer and monthly games.",
    longDescription: "PlayStation Plus Extra gives you access to a catalog of up to 400 PS5 and PS4 games. Play popular titles anytime with your subscription. Enjoy online multiplayer, monthly games, exclusive discounts, and 100GB cloud storage for game saves.",
    
    // Multiple pricing options
    pricingOptions: [
      {
        id: "ps-extra-ps5-primary",
        label: "PS5 Primary",
        accountType: "PS5 Primary Account",
        platform: "PS5",
        type: "Primary",
        price: 16500.00,
        description: "Full primary account access on PS5",
        recommended: true
      },
      {
        id: "ps-extra-ps5-secondary",
        label: "PS5 Secondary",
        accountType: "PS5 Secondary Account",
        platform: "PS5",
        type: "Secondary",
        price: 12500.00,
        description: "Secondary account access on PS5"
      },
      {
        id: "ps-extra-ps4-primary",
        label: "PS4 Primary",
        accountType: "PS4 Primary Account",
        platform: "PS4",
        type: "Primary",
        price: 10000.00,
        description: "Primary account access on PS4"
      }
    ],
    
    features: [
      "400+ PS5 & PS4 games",
      "Online multiplayer access",
      "2 monthly games",
      "Exclusive PS Store discounts",
      "100GB cloud storage",
      "Share Play functionality",
      "Game Help (select titles)"
    ],
    
    gamesIncluded: [
      "Spider-Man Miles Morales",
      "Ghost of Tsushima Director's Cut",
      "Returnal",
      "Death Stranding Director's Cut",
      "Demon's Souls",
      "Ratchet & Clank: Rift Apart",
      "Horizon Forbidden West",
      "God of War Ragnarök"
    ],
    
    benefits: {
      onlineMultiplayer: true,
      monthlyGames: 2,
      gameLibrary: 400,
      cloudStorage: "100GB",
      exclusiveDeals: true,
      gameTrials: false,
      classicGames: false,
      cloudStreaming: false
    },
    
    activationMethod: "Account credentials provided via email",
    supportLevel: "Standard",
    instantDelivery: true
  },
  
  {
    id: "ps-plus-deluxe",
    title: "PS Plus Deluxe (12 Months)",
    tier: "Deluxe",
    slug: "ps-plus-deluxe",
    duration: "12 months",
    durationDays: 365,
    image: "https://i.ibb.co/QvjFwbQK/PS-plus-Deluxe-4.png", // Replace with actual image (200x200px recommended)
    badge: null,
    description: "Ultimate PS Plus with 740+ games, classic titles, game trials, and cloud streaming.",
    longDescription: "PlayStation Plus Deluxe is the ultimate gaming subscription. Get everything from Extra plus access to 340 additional classic games from PS1, PS2, PS3, and PSP eras. Try new games before you buy with game trials, and stream select games directly to your console or PC.",
    
    // Multiple pricing options
    pricingOptions: [
      {
        id: "ps-deluxe-ps5-primary",
        label: "PS5 Primary",
        accountType: "PS5 Primary Account",
        platform: "PS5",
        type: "Primary",
        price: 17500.00,
        description: "Full primary account access on PS5",
        recommended: true
      },
      {
        id: "ps-deluxe-ps5-secondary",
        label: "PS5 Secondary",
        accountType: "PS5 Secondary Account",
        platform: "PS5",
        type: "Secondary",
        price: 13500.00,
        description: "Secondary account access on PS5"
      },
      {
        id: "ps-deluxe-ps4-primary",
        label: "PS4 Primary",
        accountType: "PS4 Primary Account",
        platform: "PS4",
        type: "Primary",
        price: 11000.00,
        description: "Primary account access on PS4"
      }
    ],
    
    features: [
      "740+ games (400 + 340 classics)",
      "All PS Plus Extra benefits",
      "Classic PS1, PS2, PS3 & PSP games",
      "Game trials (up to 5 hours)",
      "Cloud streaming (select titles)",
      "Time-limited game trials",
      "Premium customer support"
    ],
    
    gamesIncluded: [
      "All PS Plus Extra games",
      "God of War (2005)",
      "Jak and Daxter series",
      "Sly Cooper series",
      "Tekken 2",
      "Resident Evil Director's Cut",
      "Final Fantasy VII",
      "Metal Gear Solid",
      "Plus 340+ classic titles"
    ],
    
    benefits: {
      onlineMultiplayer: true,
      monthlyGames: 2,
      gameLibrary: 740,
      cloudStorage: "100GB",
      exclusiveDeals: true,
      gameTrials: true,
      classicGames: 340,
      cloudStreaming: true
    },
    
    activationMethod: "Account credentials provided via email",
    supportLevel: "Premium",
    instantDelivery: true
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get subscription by ID
function getPsPlusById(id) {
  return psPlusSubscriptions.find(sub => sub.id === id);
}

// Get all subscriptions
function getAllPsPlus() {
  return psPlusSubscriptions;
}

// Get specific pricing option
function getPsPlusPricingOption(subId, optionId) {
  const subscription = getPsPlusById(subId);
  if (!subscription) return null;
  
  return subscription.pricingOptions.find(opt => opt.id === optionId);
}

// Get lowest price for a subscription
function getLowestPrice(subId) {
  const subscription = getPsPlusById(subId);
  if (!subscription || !subscription.pricingOptions.length) return 0;
  
  return Math.min(...subscription.pricingOptions.map(opt => opt.price));
}

// Get highest price for a subscription
function getHighestPrice(subId) {
  const subscription = getPsPlusById(subId);
  if (!subscription || !subscription.pricingOptions.length) return 0;
  
  return Math.max(...subscription.pricingOptions.map(opt => opt.price));
}

console.log('✅ PS Plus subscriptions loaded:', psPlusSubscriptions.length);
console.log('💡 Total pricing options:', psPlusSubscriptions.reduce((sum, sub) => sum + sub.pricingOptions.length, 0));
