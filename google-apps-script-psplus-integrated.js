// ============================================
// KRAZYKROSS GAMES - GOOGLE APPS SCRIPT
// Stock Management & Order Processing System
// WITH PS PLUS SUBSCRIPTIONS SUPPORT
// ============================================

// CONFIGURATION
const CONFIG = {
  // Sheet names
  STOCK_SHEET: 'Stock',
  PSPLUS_STOCK_SHEET: 'PSPlus_Stock',
  ORDERS_SHEET: 'Orders',
  SETTINGS_SHEET: 'Settings',
  
  // Stock thresholds
  LOW_STOCK_THRESHOLD: 1,
  DEFAULT_STOCK: 3,
  PSPLUS_DEFAULT_STOCK: 10,
  PSPLUS_LOW_STOCK: 3,
  
  // Email settings
  ADMIN_EMAIL: 'krazykrossg@gmail.com'
};

// ============================================
// CORS HELPER FUNCTION
// ============================================

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
  
  // Create Stock Sheet (Games)
  createStockSheet(ss);
  
  // Create PS Plus Stock Sheet
  createPsPlusStockSheet(ss);
  
  // Create Orders Sheet
  createOrdersSheet(ss);
  
  // Create Settings Sheet
  createSettingsSheet(ss);
  
  SpreadsheetApp.getUi().alert('✅ All sheets initialized successfully!');
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
  sheet.setColumnWidth(1, 80);
  sheet.setColumnWidth(2, 300);
  sheet.setColumnWidth(3, 100);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 100);
  sheet.setColumnWidth(6, 100);
  sheet.setColumnWidth(7, 120);
  sheet.setColumnWidth(8, 150);
  
  sheet.setFrozenRows(1);
}

function createPsPlusStockSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.PSPLUS_STOCK_SHEET);
  
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.PSPLUS_STOCK_SHEET);
  }
  
  // Clear existing data
  sheet.clear();
  
  // Set headers
  const headers = [
    'Option ID',
    'Subscription ID',
    'Tier',
    'Label',
    'Account Type',
    'Platform',
    'Type',
    'Price',
    'Total Stock',
    'Available',
    'Sold',
    'Min Stock',
    'Status',
    'Last Updated'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#9b59b6')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  
  // Set column widths
  sheet.setColumnWidth(1, 180);  // Option ID
  sheet.setColumnWidth(2, 150);  // Subscription ID
  sheet.setColumnWidth(3, 80);   // Tier
  sheet.setColumnWidth(4, 120);  // Label
  sheet.setColumnWidth(5, 180);  // Account Type
  sheet.setColumnWidth(6, 80);   // Platform
  sheet.setColumnWidth(7, 100);  // Type
  sheet.setColumnWidth(8, 100);  // Price
  sheet.setColumnWidth(9, 100);  // Total Stock
  sheet.setColumnWidth(10, 100); // Available
  sheet.setColumnWidth(11, 80);  // Sold
  sheet.setColumnWidth(12, 100); // Min Stock
  sheet.setColumnWidth(13, 120); // Status
  sheet.setColumnWidth(14, 150); // Last Updated
  
  sheet.setFrozenRows(1);
  
  // Add initial PS Plus data
  initializePsPlusData(sheet);
}

function initializePsPlusData(sheet) {
  const psPlusData = [
    // PS Plus Extra
    ['ps-extra-ps5-primary', 'ps-plus-extra', 'Extra', 'PS5 Primary', 'PS5 Primary Account', 'PS5', 'Primary', 16500, CONFIG.PSPLUS_DEFAULT_STOCK, CONFIG.PSPLUS_DEFAULT_STOCK, 0, CONFIG.PSPLUS_LOW_STOCK, 'In Stock', new Date()],
    ['ps-extra-ps5-secondary', 'ps-plus-extra', 'Extra', 'PS5 Secondary', 'PS5 Secondary Account', 'PS5', 'Secondary', 12500, CONFIG.PSPLUS_DEFAULT_STOCK, CONFIG.PSPLUS_DEFAULT_STOCK, 0, CONFIG.PSPLUS_LOW_STOCK, 'In Stock', new Date()],
    ['ps-extra-ps4-primary', 'ps-plus-extra', 'Extra', 'PS4 Primary', 'PS4 Primary Account', 'PS4', 'Primary', 10000, CONFIG.PSPLUS_DEFAULT_STOCK, CONFIG.PSPLUS_DEFAULT_STOCK, 0, CONFIG.PSPLUS_LOW_STOCK, 'In Stock', new Date()],
    
    // PS Plus Deluxe
    ['ps-deluxe-ps5-primary', 'ps-plus-deluxe', 'Deluxe', 'PS5 Primary', 'PS5 Primary Account', 'PS5', 'Primary', 17500, CONFIG.PSPLUS_DEFAULT_STOCK, CONFIG.PSPLUS_DEFAULT_STOCK, 0, CONFIG.PSPLUS_LOW_STOCK, 'In Stock', new Date()],
    ['ps-deluxe-ps5-secondary', 'ps-plus-deluxe', 'Deluxe', 'PS5 Secondary', 'PS5 Secondary Account', 'PS5', 'Secondary', 13500, CONFIG.PSPLUS_DEFAULT_STOCK, CONFIG.PSPLUS_DEFAULT_STOCK, 0, CONFIG.PSPLUS_LOW_STOCK, 'In Stock', new Date()],
    ['ps-deluxe-ps4-primary', 'ps-plus-deluxe', 'Deluxe', 'PS4 Primary', 'PS4 Primary Account', 'PS4', 'Primary', 11000, CONFIG.PSPLUS_DEFAULT_STOCK, CONFIG.PSPLUS_DEFAULT_STOCK, 0, CONFIG.PSPLUS_LOW_STOCK, 'In Stock', new Date()]
  ];
  
  sheet.getRange(2, 1, psPlusData.length, psPlusData[0].length).setValues(psPlusData);
  
  Logger.log('✅ Initialized ' + psPlusData.length + ' PS Plus pricing options');
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
    'Customer Email',
    'Customer Name',
    'Items',
    'Total Amount',
    'Status',
    'Payment Method',
    'Notes'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#27ae60')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 400);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 100);
  sheet.setColumnWidth(8, 150);
  sheet.setColumnWidth(9, 300);
  
  sheet.setFrozenRows(1);
}

function createSettingsSheet(ss) {
  let sheet = ss.getSheetByName(CONFIG.SETTINGS_SHEET);
  
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SETTINGS_SHEET);
  }
  
  sheet.clear();
  
  const headers = ['Setting', 'Value'];
  sheet.getRange(1, 1, 1, 2).setValues([headers]);
  
  const settings = [
    ['Admin Email', CONFIG.ADMIN_EMAIL],
    ['Low Stock Alert', 'Enabled'],
    ['Auto Email Notifications', 'Enabled']
  ];
  
  sheet.getRange(2, 1, settings.length, 2).setValues(settings);
  
  sheet.getRange(1, 1, 1, 2)
    .setBackground('#34495e')
    .setFontColor('#ffffff')
    .setFontWeight('bold');
  
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 250);
}

// ============================================
// API ENDPOINTS
// ============================================

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getStock') {
      return getStockAPI(e);
    } else if (action === 'checkStock') {
      return checkStockAPI(e);
    } else if (action === 'getPsPlusStock') {
      return getPsPlusStockAPI(e);
    } else if (action === 'checkPsPlusStock') {
      return checkPsPlusStockAPI(e);
    } else {
      return createCORSResponse({
        error: 'Invalid action',
        availableActions: ['getStock', 'checkStock', 'getPsPlusStock', 'checkPsPlusStock']
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

function doPost(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'updateStock') {
      return updateStockAPI(e);
    } else if (action === 'processOrder') {
      return processOrderAPI(e);
    } else if (action === 'returnGame') {
      return returnGameAPI(e);
    } else if (action === 'updatePsPlusStock') {
      return updatePsPlusStockAPI(e);
    } else if (action === 'processPsPlusOrder') {
      return processPsPlusOrderAPI(e);
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
// PS PLUS STOCK API FUNCTIONS
// ============================================

function getPsPlusStockAPI(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.PSPLUS_STOCK_SHEET);
    
    if (!sheet) {
      return createCORSResponse({
        success: false,
        error: 'PS Plus stock sheet not found'
      });
    }
    
    const data = sheet.getDataRange().getValues();
    const stock = {};
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const optionId = row[0];
      
      stock[optionId] = {
        optionId: optionId,
        subId: row[1],
        tier: row[2],
        label: row[3],
        accountType: row[4],
        platform: row[5],
        type: row[6],
        price: row[7],
        totalStock: row[8],
        available: row[9],
        sold: row[10],
        minStock: row[11],
        status: row[12],
        lastUpdated: row[13]
      };
    }
    
    return createCORSResponse({
      success: true,
      stock: stock,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    Logger.log('❌ Error in getPsPlusStockAPI: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

function checkPsPlusStockAPI(e) {
  try {
    const optionId = e.parameter.optionId;
    const quantity = parseInt(e.parameter.quantity) || 1;
    
    if (!optionId) {
      return createCORSResponse({
        success: false,
        error: 'Option ID is required'
      });
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.PSPLUS_STOCK_SHEET);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === optionId) {
        const available = data[i][9];
        const minStock = data[i][11];
        
        return createCORSResponse({
          success: true,
          optionId: optionId,
          tier: data[i][2],
          label: data[i][3],
          available: available,
          inStock: available >= quantity,
          isLowStock: available > 0 && available <= minStock,
          isOutOfStock: available === 0
        });
      }
    }
    
    return createCORSResponse({
      success: false,
      error: 'PS Plus option not found'
    });
    
  } catch (error) {
    Logger.log('❌ Error in checkPsPlusStockAPI: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

function updatePsPlusStockAPI(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const optionId = data.optionId;
    const quantity = parseInt(data.quantity) || 1;
    const operation = data.operation; // 'reduce' or 'increase'
    
    if (!optionId || !operation) {
      return createCORSResponse({
        success: false,
        error: 'Option ID and operation are required'
      });
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.PSPLUS_STOCK_SHEET);
    const sheetData = sheet.getDataRange().getValues();
    
    for (let i = 1; i < sheetData.length; i++) {
      if (sheetData[i][0] === optionId) {
        const available = sheetData[i][9];
        const sold = sheetData[i][10];
        
        let newAvailable = available;
        let newSold = sold;
        
        if (operation === 'reduce') {
          if (available < quantity) {
            return createCORSResponse({
              success: false,
              error: 'Not enough stock available'
            });
          }
          newAvailable = available - quantity;
          newSold = sold + quantity;
        } else if (operation === 'increase') {
          newAvailable = available + quantity;
          newSold = Math.max(0, sold - quantity);
        }
        
        // Update stock
        sheet.getRange(i + 1, 10).setValue(newAvailable); // Available
        sheet.getRange(i + 1, 11).setValue(newSold);      // Sold
        sheet.getRange(i + 1, 14).setValue(new Date());   // Last Updated
        
        // Update status
        const minStock = sheetData[i][11];
        let status = 'In Stock';
        if (newAvailable === 0) {
          status = 'Out of Stock';
        } else if (newAvailable <= minStock) {
          status = 'Low Stock';
        }
        sheet.getRange(i + 1, 13).setValue(status);
        
        Logger.log('✅ PS Plus stock updated: ' + optionId + ' - Available: ' + newAvailable);
        
        return createCORSResponse({
          success: true,
          optionId: optionId,
          available: newAvailable,
          sold: newSold,
          status: status
        });
      }
    }
    
    return createCORSResponse({
      success: false,
      error: 'PS Plus option not found'
    });
    
  } catch (error) {
    Logger.log('❌ Error in updatePsPlusStockAPI: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

function processPsPlusOrderAPI(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const orderId = data.orderId;
    const customerEmail = data.customerEmail;
    const customerName = data.customerName;
    const items = data.items; // Array of PS Plus option IDs
    const totalAmount = data.totalAmount;
    
    if (!orderId || !items || items.length === 0) {
      return createCORSResponse({
        success: false,
        error: 'Order ID and items are required'
      });
    }
    
    // Reduce stock for each item
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.PSPLUS_STOCK_SHEET);
    
    for (let item of items) {
      const result = reduceSpecificPsPlusStock(sheet, item.optionId, 1);
      
      if (!result.success) {
        return createCORSResponse({
          success: false,
          error: 'Failed to process order: ' + result.error
        });
      }
    }
    
    // Record order
    recordOrder(orderId, customerEmail, customerName, items, totalAmount, 'PS Plus Subscription');
    
    Logger.log('✅ PS Plus order processed: ' + orderId);
    
    return createCORSResponse({
      success: true,
      orderId: orderId,
      message: 'Order processed successfully'
    });
    
  } catch (error) {
    Logger.log('❌ Error in processPsPlusOrderAPI: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

function reduceSpecificPsPlusStock(sheet, optionId, quantity) {
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === optionId) {
      const available = data[i][9];
      
      if (available < quantity) {
        return {
          success: false,
          error: 'Not enough stock for ' + optionId
        };
      }
      
      const newAvailable = available - quantity;
      const newSold = data[i][10] + quantity;
      
      sheet.getRange(i + 1, 10).setValue(newAvailable);
      sheet.getRange(i + 1, 11).setValue(newSold);
      sheet.getRange(i + 1, 14).setValue(new Date());
      
      // Update status
      const minStock = data[i][11];
      let status = 'In Stock';
      if (newAvailable === 0) {
        status = 'Out of Stock';
      } else if (newAvailable <= minStock) {
        status = 'Low Stock';
      }
      sheet.getRange(i + 1, 13).setValue(status);
      
      return {
        success: true,
        available: newAvailable
      };
    }
  }
  
  return {
    success: false,
    error: 'PS Plus option not found: ' + optionId
  };
}

// ============================================
// GAME STOCK API FUNCTIONS (EXISTING)
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
    const gameId = e.parameter.gameId;
    const quantity = parseInt(e.parameter.quantity) || 1;
    
    if (!gameId) {
      return createCORSResponse({
        success: false,
        error: 'Game ID is required'
      });
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == gameId) {
        const available = data[i][3];
        const minStock = data[i][5];
        
        return createCORSResponse({
          success: true,
          gameId: gameId,
          title: data[i][1],
          available: available,
          inStock: available >= quantity,
          isLowStock: available > 0 && available <= minStock,
          isOutOfStock: available === 0
        });
      }
    }
    
    return createCORSResponse({
      success: false,
      error: 'Game not found'
    });
    
  } catch (error) {
    Logger.log('❌ Error in checkStockAPI: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

function updateStockAPI(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const gameId = data.gameId;
    const quantity = parseInt(data.quantity) || 1;
    const operation = data.operation;
    
    if (!gameId || !operation) {
      return createCORSResponse({
        success: false,
        error: 'Game ID and operation are required'
      });
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
    const sheetData = sheet.getDataRange().getValues();
    
    for (let i = 1; i < sheetData.length; i++) {
      if (sheetData[i][0] == gameId) {
        const available = sheetData[i][3];
        const rented = sheetData[i][4];
        
        let newAvailable = available;
        let newRented = rented;
        
        if (operation === 'reduce') {
          if (available < quantity) {
            return createCORSResponse({
              success: false,
              error: 'Not enough stock available'
            });
          }
          newAvailable = available - quantity;
          newRented = rented + quantity;
        } else if (operation === 'increase') {
          newAvailable = available + quantity;
          newRented = Math.max(0, rented - quantity);
        }
        
        sheet.getRange(i + 1, 4).setValue(newAvailable);
        sheet.getRange(i + 1, 5).setValue(newRented);
        sheet.getRange(i + 1, 8).setValue(new Date());
        
        const minStock = sheetData[i][5];
        let status = 'In Stock';
        if (newAvailable === 0) {
          status = 'Out of Stock';
        } else if (newAvailable <= minStock) {
          status = 'Low Stock';
        }
        sheet.getRange(i + 1, 7).setValue(status);
        
        Logger.log('✅ Game stock updated: ' + gameId + ' - Available: ' + newAvailable);
        
        return createCORSResponse({
          success: true,
          gameId: gameId,
          available: newAvailable,
          rented: newRented,
          status: status
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
    const data = JSON.parse(e.postData.contents);
    const orderId = data.orderId;
    const customerEmail = data.customerEmail;
    const customerName = data.customerName;
    const items = data.items;
    const totalAmount = data.totalAmount;
    
    if (!orderId || !items || items.length === 0) {
      return createCORSResponse({
        success: false,
        error: 'Order ID and items are required'
      });
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
    
    for (let item of items) {
      const result = reduceSpecificGameStock(sheet, item.gameId, 1);
      
      if (!result.success) {
        return createCORSResponse({
          success: false,
          error: 'Failed to process order: ' + result.error
        });
      }
    }
    
    recordOrder(orderId, customerEmail, customerName, items, totalAmount, 'Game Rental');
    
    Logger.log('✅ Game order processed: ' + orderId);
    
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

function reduceSpecificGameStock(sheet, gameId, quantity) {
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == gameId) {
      const available = data[i][3];
      
      if (available < quantity) {
        return {
          success: false,
          error: 'Not enough stock for game ID ' + gameId
        };
      }
      
      const newAvailable = available - quantity;
      const newRented = data[i][4] + quantity;
      
      sheet.getRange(i + 1, 4).setValue(newAvailable);
      sheet.getRange(i + 1, 5).setValue(newRented);
      sheet.getRange(i + 1, 8).setValue(new Date());
      
      const minStock = data[i][5];
      let status = 'In Stock';
      if (newAvailable === 0) {
        status = 'Out of Stock';
      } else if (newAvailable <= minStock) {
        status = 'Low Stock';
      }
      sheet.getRange(i + 1, 7).setValue(status);
      
      return {
        success: true,
        available: newAvailable
      };
    }
  }
  
  return {
    success: false,
    error: 'Game not found: ' + gameId
  };
}

function returnGameAPI(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const gameId = data.gameId;
    const quantity = parseInt(data.quantity) || 1;
    
    if (!gameId) {
      return createCORSResponse({
        success: false,
        error: 'Game ID is required'
      });
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
    const sheetData = sheet.getDataRange().getValues();
    
    for (let i = 1; i < sheetData.length; i++) {
      if (sheetData[i][0] == gameId) {
        const available = sheetData[i][3];
        const rented = sheetData[i][4];
        
        const newAvailable = available + quantity;
        const newRented = Math.max(0, rented - quantity);
        
        sheet.getRange(i + 1, 4).setValue(newAvailable);
        sheet.getRange(i + 1, 5).setValue(newRented);
        sheet.getRange(i + 1, 8).setValue(new Date());
        
        const minStock = sheetData[i][5];
        let status = 'In Stock';
        if (newAvailable === 0) {
          status = 'Out of Stock';
        } else if (newAvailable <= minStock) {
          status = 'Low Stock';
        }
        sheet.getRange(i + 1, 7).setValue(status);
        
        Logger.log('✅ Game returned: ' + gameId + ' - Available: ' + newAvailable);
        
        return createCORSResponse({
          success: true,
          gameId: gameId,
          available: newAvailable,
          rented: newRented
        });
      }
    }
    
    return createCORSResponse({
      success: false,
      error: 'Game not found'
    });
    
  } catch (error) {
    Logger.log('❌ Error in returnGameAPI: ' + error.toString());
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function recordOrder(orderId, email, name, items, total, type) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.ORDERS_SHEET);
  
  const itemsStr = items.map(item => item.title || item.optionId).join(', ');
  
  sheet.appendRow([
    orderId,
    new Date(),
    email,
    name,
    itemsStr,
    total,
    'Completed',
    type,
    ''
  ]);
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
// ADMIN FUNCTIONS
// ============================================

function createCustomMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📦 Krazykross Games')
    .addItem('🔧 Setup All Sheets', 'setupSheets')
    .addItem('🎮 Initialize PS Plus Data', 'reinitializePsPlusData')
    .addItem('📥 Import Games', 'importGamesFromJSON')
    .addItem('🔄 Sync Stock', 'syncAllStock')
    .addItem('📧 Test Email', 'testEmail')
    .addItem('📊 Generate Report', 'generateStockReport')
    .addToUi();
}

function onOpen() {
  createCustomMenu();
}

function reinitializePsPlusData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.PSPLUS_STOCK_SHEET);
  
  if (sheet) {
    // Clear data (keep headers)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
    }
    
    // Re-initialize
    initializePsPlusData(sheet);
    
    SpreadsheetApp.getUi().alert('✅ PS Plus data reinitialized!');
  } else {
    SpreadsheetApp.getUi().alert('❌ PS Plus stock sheet not found. Run Setup All Sheets first.');
  }
}

function syncAllStock() {
  SpreadsheetApp.getUi().alert('Stock sync complete! Use the API to sync with website.');
}

function testEmail() {
  const adminEmail = getSetting('Admin Email');
  GmailApp.sendEmail(adminEmail, 'Test Email', 'This is a test email from Krazykross Games stock system.');
  SpreadsheetApp.getUi().alert('Test email sent to ' + adminEmail);
}

function generateStockReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Game stock
  const gameSheet = ss.getSheetByName(CONFIG.STOCK_SHEET);
  const gameData = gameSheet.getDataRange().getValues();
  
  let totalGames = gameData.length - 1;
  let totalGameStock = 0;
  let totalRented = 0;
  let lowStockGames = 0;
  let outOfStockGames = 0;
  
  for (let i = 1; i < gameData.length; i++) {
    totalGameStock += gameData[i][2];
    totalRented += gameData[i][4];
    
    if (gameData[i][3] === 0) {
      outOfStockGames++;
    } else if (gameData[i][3] <= gameData[i][5]) {
      lowStockGames++;
    }
  }
  
  // PS Plus stock
  const psPlusSheet = ss.getSheetByName(CONFIG.PSPLUS_STOCK_SHEET);
  const psPlusData = psPlusSheet.getDataRange().getValues();
  
  let totalPsPlus = psPlusData.length - 1;
  let totalPsPlusStock = 0;
  let totalPsPlusSold = 0;
  let lowStockPsPlus = 0;
  let outOfStockPsPlus = 0;
  
  for (let i = 1; i < psPlusData.length; i++) {
    totalPsPlusStock += psPlusData[i][8];
    totalPsPlusSold += psPlusData[i][10];
    
    if (psPlusData[i][9] === 0) {
      outOfStockPsPlus++;
    } else if (psPlusData[i][9] <= psPlusData[i][11]) {
      lowStockPsPlus++;
    }
  }
  
  const report = `
📊 KRAZYKROSS GAMES STOCK REPORT
Generated: ${new Date().toLocaleString()}

🎮 GAME RENTALS:
━━━━━━━━━━━━━━━━━━━━
📚 Total Games: ${totalGames}
📦 Total Stock: ${totalGameStock}
🎯 Currently Rented: ${totalRented}
⚠️ Low Stock Items: ${lowStockGames}
❌ Out of Stock Items: ${outOfStockGames}
✅ Utilization: ${totalGameStock > 0 ? ((totalRented / totalGameStock) * 100).toFixed(1) : 0}%

🎮 PS PLUS SUBSCRIPTIONS:
━━━━━━━━━━━━━━━━━━━━
📚 Total Options: ${totalPsPlus}
📦 Total Stock: ${totalPsPlusStock}
💰 Sold: ${totalPsPlusSold}
⚠️ Low Stock Options: ${lowStockPsPlus}
❌ Out of Stock Options: ${outOfStockPsPlus}
✅ Sales Rate: ${totalPsPlusStock > 0 ? ((totalPsPlusSold / totalPsPlusStock) * 100).toFixed(1) : 0}%
  `;
  
  SpreadsheetApp.getUi().alert(report);
}
