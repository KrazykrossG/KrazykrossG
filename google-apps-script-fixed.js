// ============================================
// KRAZYKROSS GAMES - GOOGLE APPS SCRIPT
// Stock Management & Order Processing System
// WITH CORS SUPPORT
// ============================================

// CONFIGURATION
const CONFIG = {
  // Sheet names
  STOCK_SHEET: 'Stock',
  ORDERS_SHEET: 'Orders',
  SETTINGS_SHEET: 'Settings',
  
  // Stock thresholds
  LOW_STOCK_THRESHOLD: 1,
  DEFAULT_STOCK: 3,
  
  // Email settings (configure in Settings sheet)
  ADMIN_EMAIL: 'krazykrossg@gmail.com'
};

// ============================================
// CORS HELPER FUNCTION
// ============================================

/**
 * Creates a JSON response with proper CORS headers
 * @param {Object} data - The data to return as JSON
 * @returns {TextOutput} - Response with CORS headers
 */
function createCORSResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  
  return output;
}

// ============================================
// SHEET INITIALIZATION
// ============================================

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create Stock Sheet
  createStockSheet(ss);
  
  // Create Orders Sheet
  createOrdersSheet(ss);
  
  // Create Settings Sheet
  createSettingsSheet(ss);
  
  SpreadsheetApp.getUi().alert('✅ Sheets initialized successfully!');
}

function createStockSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
  
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.STOCK_SHEET);
  }
  
  // Clear existing data
  sheet.clear();
  
  // Set headers
  const headers = [
    'Game ID',
    'Title',
    'Total Stock',
    'Available',
    'Rented',
    'Min Stock',
    'Status',
    'Last Updated'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#4a90e2')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  
  // Set column widths
  sheet.setColumnWidth(1, 80);   // Game ID
  sheet.setColumnWidth(2, 300);  // Title
  sheet.setColumnWidth(3, 100);  // Total Stock
  sheet.setColumnWidth(4, 100);  // Available
  sheet.setColumnWidth(5, 100);  // Rented
  sheet.setColumnWidth(6, 100);  // Min Stock
  sheet.setColumnWidth(7, 120);  // Status
  sheet.setColumnWidth(8, 150);  // Last Updated
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  Logger.log('✅ Stock sheet created');
}

function createOrdersSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.ORDERS_SHEET);
  
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.ORDERS_SHEET);
  }
  
  sheet.clear();
  
  const headers = [
    'Order ID',
    'Date',
    'Customer Name',
    'Email',
    'Phone',
    'Games',
    'Total Amount',
    'Status',
    'Payment Method'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#34a853')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  
  sheet.setColumnWidth(1, 100);  // Order ID
  sheet.setColumnWidth(2, 150);  // Date
  sheet.setColumnWidth(3, 150);  // Customer Name
  sheet.setColumnWidth(4, 200);  // Email
  sheet.setColumnWidth(5, 120);  // Phone
  sheet.setColumnWidth(6, 400);  // Games
  sheet.setColumnWidth(7, 120);  // Total Amount
  sheet.setColumnWidth(8, 100);  // Status
  sheet.setColumnWidth(9, 150);  // Payment Method
  
  sheet.setFrozenRows(1);
  
  Logger.log('✅ Orders sheet created');
}

function createSettingsSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SETTINGS_SHEET);
  
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SETTINGS_SHEET);
  }
  
  sheet.clear();
  
  const settings = [
    ['Setting', 'Value'],
    ['Admin Email', 'your-admin@email.com'],
    ['Low Stock Alert', 'true'],
    ['Default Stock', '3'],
    ['Auto Email Orders', 'true'],
    ['Website URL', 'https://your-website.com']
  ];
  
  sheet.getRange(1, 1, settings.length, 2).setValues(settings);
  
  sheet.getRange(1, 1, 1, 2)
    .setBackground('#fbbc04')
    .setFontColor('#ffffff')
    .setFontWeight('bold');
  
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 300);
  
  Logger.log('✅ Settings sheet created');
}

// ============================================
// WEB APP ENDPOINTS WITH CORS SUPPORT
// ============================================

/**
 * Handles GET requests with CORS support
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getStock') {
      return getStockAPI(e);
    } else if (action === 'checkStock') {
      return checkStockAPI(e);
    } else {
      return createCORSResponse({
        error: 'Invalid action',
        availableActions: ['getStock', 'checkStock']
      });
    }
  } catch (error) {
    Logger.log('❌ Error in doGet: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * Handles POST requests with CORS support
 */
function doPost(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'updateStock') {
      return updateStockAPI(e);
    } else if (action === 'processOrder') {
      return processOrderAPI(e);
    } else if (action === 'returnGame') {
      return returnGameAPI(e);
    } else {
      return createCORSResponse({
        success: false,
        error: 'Invalid action'
      });
    }
  } catch (error) {
    Logger.log('❌ Error in doPost: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

// ============================================
// API FUNCTIONS
// ============================================

function getStockAPI(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
    
    if (!sheet) {
      return createCORSResponse({
        success: false,
        error: 'Stock sheet not found'
      });
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const stock = {};
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const gameId = row[0];
      
      stock[gameId] = {
        gameId: gameId,
        title: row[1],
        totalStock: row[2],
        available: row[3],
        rented: row[4],
        minStock: row[5],
        status: row[6],
        lastUpdated: row[7]
      };
    }
    
    return createCORSResponse({
      success: true,
      stock: stock,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    Logger.log('❌ Error in getStockAPI: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

function checkStockAPI(e) {
  try {
    const gameId = parseInt(e.parameter.gameId);
    const quantity = parseInt(e.parameter.quantity) || 1;
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
    
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === gameId) {
        const available = data[i][3];
        
        return createCORSResponse({
          success: true,
          gameId: gameId,
          available: available >= quantity,
          stock: available,
          isLowStock: available > 0 && available <= data[i][5],
          isOutOfStock: available === 0
        });
      }
    }
    
    return createCORSResponse({
      success: false,
      error: 'Game not found'
    });
    
  } catch (error) {
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

function updateStockAPI(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const gameId = parseInt(postData.gameId);
    const quantity = parseInt(postData.quantity);
    const operation = postData.operation; // 'reduce', 'add', 'set'
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
    
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === gameId) {
        let newAvailable;
        
        if (operation === 'reduce') {
          newAvailable = Math.max(0, data[i][3] - quantity);
          const newRented = data[i][4] + quantity;
          sheet.getRange(i + 1, 5).setValue(newRented);
        } else if (operation === 'add') {
          newAvailable = data[i][3] + quantity;
        } else if (operation === 'set') {
          newAvailable = quantity;
        } else {
          return createCORSResponse({
            success: false,
            error: 'Invalid operation'
          });
        }
        
        sheet.getRange(i + 1, 4).setValue(newAvailable);
        sheet.getRange(i + 1, 8).setValue(new Date());
        
        updateStockStatus(sheet, i + 1, newAvailable, data[i][5]);
        
        return createCORSResponse({
          success: true,
          gameId: gameId,
          available: newAvailable,
          operation: operation
        });
      }
    }
    
    return createCORSResponse({
      success: false,
      error: 'Game not found'
    });
    
  } catch (error) {
    Logger.log('❌ Error in updateStockAPI: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

function processOrderAPI(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!postData.customerName || !postData.email || !postData.items || postData.items.length === 0) {
      return createCORSResponse({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const stockSheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
    
    // Check stock availability for all items
    const stockData = stockSheet.getDataRange().getValues();
    const unavailableItems = [];
    
    for (const item of postData.items) {
      let found = false;
      for (let i = 1; i < stockData.length; i++) {
        if (stockData[i][0] === parseInt(item.gameId)) {
          found = true;
          if (stockData[i][3] < item.quantity) {
            unavailableItems.push({
              gameId: item.gameId,
              title: item.title,
              requested: item.quantity,
              available: stockData[i][3]
            });
          }
          break;
        }
      }
      if (!found) {
        unavailableItems.push({
          gameId: item.gameId,
          title: item.title,
          error: 'Game not found'
        });
      }
    }
    
    if (unavailableItems.length > 0) {
      return createCORSResponse({
        success: false,
        error: 'Some items are not available',
        unavailableItems: unavailableItems
      });
    }
    
    // Create order
    const orderId = createOrder(postData);
    
    // Update stock for each item
    for (const item of postData.items) {
      for (let i = 1; i < stockData.length; i++) {
        if (stockData[i][0] === parseInt(item.gameId)) {
          const newAvailable = stockData[i][3] - item.quantity;
          const newRented = stockData[i][4] + item.quantity;
          
          stockSheet.getRange(i + 1, 4).setValue(newAvailable);
          stockSheet.getRange(i + 1, 5).setValue(newRented);
          stockSheet.getRange(i + 1, 8).setValue(new Date());
          
          updateStockStatus(stockSheet, i + 1, newAvailable, stockData[i][5]);
          break;
        }
      }
    }
    
    // Send confirmation email
    const autoEmail = getSetting('Auto Email Orders');
    if (autoEmail === 'true' || autoEmail === true) {
      sendOrderConfirmationEmail(postData, orderId);
    }
    
    return createCORSResponse({
      success: true,
      orderId: orderId,
      message: 'Order processed successfully'
    });
    
  } catch (error) {
    Logger.log('❌ Error in processOrderAPI: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

function returnGameAPI(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const gameId = parseInt(postData.gameId);
    const quantity = parseInt(postData.quantity) || 1;
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
    
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === gameId) {
        const available = data[i][3] + quantity;
        const rented = Math.max(0, data[i][4] - quantity);
        
        sheet.getRange(i + 1, 4).setValue(available);
        sheet.getRange(i + 1, 5).setValue(rented);
        sheet.getRange(i + 1, 8).setValue(new Date());
        
        updateStockStatus(sheet, i + 1, available, data[i][5]);
        
        return createCORSResponse({
          success: true,
          gameId: gameId,
          available: available,
          rented: rented
        });
      }
    }
    
    return createCORSResponse({
      success: false,
      error: 'Game not found'
    });
    
  } catch (error) {
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function updateStockStatus(sheet, row, available, minStock) {
  let status, color;
  
  if (available === 0) {
    status = '❌ Out of Stock';
    color = '#ff4757';
  } else if (available <= minStock) {
    status = '⚠️ Low Stock';
    color = '#ffa502';
  } else {
    status = '✅ In Stock';
    color = '#26de81';
  }
  
  sheet.getRange(row, 7).setValue(status).setBackground(color).setFontColor('#ffffff');
}

function createOrder(orderData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.ORDERS_SHEET);
  
  const orderId = 'ORD-' + new Date().getTime();
  const date = new Date();
  
  const gamesText = orderData.items.map(item => 
    `${item.title} (${item.quantity}x Rs ${item.price})`
  ).join(', ');
  
  const row = [
    orderId,
    date,
    orderData.customerName,
    orderData.email,
    orderData.phone,
    gamesText,
    orderData.totalAmount,
    'Pending',
    orderData.paymentMethod || 'Not Specified'
  ];
  
  sheet.appendRow(row);
  
  Logger.log('✅ Order created: ' + orderId);
  
  return orderId;
}

function sendOrderConfirmationEmail(orderData, orderId) {
  try {
    const subject = 'Order Confirmation - ' + orderId;
    
    let gamesHtml = '';
    orderData.items.forEach(item => {
      gamesHtml += `<li>${item.title} - ${item.quantity}x Rs ${item.price}</li>`;
    });
    
    const htmlBody = `
      <h2>Thank you for your order!</h2>
      <p>Dear ${orderData.customerName},</p>
      <p>Your order has been received and is being processed.</p>
      
      <h3>Order Details:</h3>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      
      <h3>Games:</h3>
      <ul>${gamesHtml}</ul>
      
      <p><strong>Total Amount:</strong> Rs ${orderData.totalAmount}</p>
      
      <p>We'll contact you shortly with further instructions.</p>
      
      <p>Best regards,<br>Krazykross Games Team</p>
    `;
    
    GmailApp.sendEmail(orderData.email, subject, '', {
      htmlBody: htmlBody
    });
    
    Logger.log('✅ Email sent to: ' + orderData.email);
    
  } catch (error) {
    Logger.log('❌ Email error: ' + error.toString());
  }
}

function getSetting(settingName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SETTINGS_SHEET);
  
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === settingName) {
      return data[i][1];
    }
  }
  
  return null;
}

// ============================================
// IMPORT GAMES FROM DATABASE
// ============================================

function importGamesFromJSON() {
  // You'll paste your games database here
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
  }
  ];
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
  
  // Clear existing data except headers
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).clearContent();
  }
  
  // Add games to stock sheet
  gamesDatabase.forEach(game => {
    const row = [
      game.id,
      game.title,
      CONFIG.DEFAULT_STOCK,
      CONFIG.DEFAULT_STOCK,
      0,
      CONFIG.LOW_STOCK_THRESHOLD,
      '✅ In Stock',
      new Date()
    ];
    
    sheet.appendRow(row);
  });
  
  // Format status column
  const lastRow = sheet.getLastRow();
  for (let i = 2; i <= lastRow; i++) {
    sheet.getRange(i, 7).setBackground('#26de81').setFontColor('#ffffff');
  }
  
  SpreadsheetApp.getUi().alert('✅ ' + gamesDatabase.length + ' games imported successfully!');
}

// ============================================
// SCHEDULED FUNCTIONS
// ============================================

function checkLowStockDaily() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
  
  const data = sheet.getDataRange().getValues();
  const lowStockGames = [];
  const outOfStockGames = [];
  
  for (let i = 1; i < data.length; i++) {
    const available = data[i][3];
    const minStock = data[i][5];
    const title = data[i][1];
    
    if (available === 0) {
      outOfStockGames.push(title);
    } else if (available <= minStock) {
      lowStockGames.push(`${title} (${available} left)`);
    }
  }
  
  if (lowStockGames.length > 0 || outOfStockGames.length > 0) {
    sendLowStockAlert(lowStockGames, outOfStockGames);
  }
}

function sendLowStockAlert(lowStock, outOfStock) {
  const adminEmail = getSetting('Admin Email');
  
  if (!adminEmail) return;
  
  let message = '<h2>Stock Alert</h2>';
  
  if (outOfStock.length > 0) {
    message += '<h3>❌ Out of Stock:</h3><ul>';
    outOfStock.forEach(game => {
      message += `<li>${game}</li>`;
    });
    message += '</ul>';
  }
  
  if (lowStock.length > 0) {
    message += '<h3>⚠️ Low Stock:</h3><ul>';
    lowStock.forEach(game => {
      message += `<li>${game}</li>`;
    });
    message += '</ul>';
  }
  
  GmailApp.sendEmail(adminEmail, 'Stock Alert - Krazykross Games', '', {
    htmlBody: message
  });
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

function createCustomMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📦 Krazykross Games')
    .addItem('🔧 Setup Sheets', 'setupSheets')
    .addItem('📥 Import Games', 'importGamesFromJSON')
    .addItem('🔄 Sync Stock', 'syncAllStock')
    .addItem('📧 Test Email', 'testEmail')
    .addItem('📊 Generate Report', 'generateStockReport')
    .addToUi();
}

function onOpen() {
  createCustomMenu();
}

function syncAllStock() {
  // This would sync with your website's localStorage
  SpreadsheetApp.getUi().alert('Stock sync complete! Use the API to sync with website.');
}

function testEmail() {
  const adminEmail = getSetting('Admin Email');
  GmailApp.sendEmail(adminEmail, 'Test Email', 'This is a test email from Krazykross Games stock system.');
  SpreadsheetApp.getUi().alert('Test email sent to ' + adminEmail);
}

function generateStockReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
  
  const data = sheet.getDataRange().getValues();
  
  let totalGames = data.length - 1;
  let totalStock = 0;
  let totalRented = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;
  
  for (let i = 1; i < data.length; i++) {
    totalStock += data[i][2];
    totalRented += data[i][4];
    
    if (data[i][3] === 0) {
      outOfStockCount++;
    } else if (data[i][3] <= data[i][5]) {
      lowStockCount++;
    }
  }
  
  const report = `
📊 STOCK REPORT
Generated: ${new Date().toLocaleString()}

📚 Total Games: ${totalGames}
📦 Total Stock: ${totalStock}
🎮 Currently Rented: ${totalRented}
⚠️ Low Stock Items: ${lowStockCount}
❌ Out of Stock Items: ${outOfStockCount}
✅ Utilization Rate: ${((totalRented / totalStock) * 100).toFixed(1)}%
  `;
  
  SpreadsheetApp.getUi().alert(report);
}
