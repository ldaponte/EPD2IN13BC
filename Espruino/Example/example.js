var font_table = {
    '%': new Uint8Array([
      0x00, //        
      0x20, //   #    
      0x50, //  # #   
      0x20, //   #    
      0x0C, //     ## 
      0x70, //  ###   
      0x08, //     #  
      0x14, //    # # 
      0x08, //     #  
      0x00, //        
      0x00, //        
      0x00 // 
    ]),
    ' ': new Uint8Array([
      0x00, //        
      0x00, //        
      0x00, //        
      0x00, //        
      0x00, //        
      0x00, //        
      0x00, //        
      0x00, //        
      0x00, //        
      0x00, //        
      0x00, //        
      0x00  //  
    ]),
    '0': new Uint8Array([
      0x00, //        
      0x38, //   ###  
      0x44, //  #   # 
      0x44, //  #   # 
      0x44, //  #   # 
      0x44, //  #   # 
      0x44, //  #   # 
      0x44, //  #   # 
      0x38, //   ###  
      0x00, //        
      0x00, //        
      0x00  //  
    ]),
    '1': new Uint8Array([
      0x00, //        
      0x30, //   ##   
      0x10, //    #   
      0x10, //    #   
      0x10, //    #   
      0x10, //    #   
      0x10, //    #   
      0x10, //    #   
      0x7C, //  ##### 
      0x00, //        
      0x00, //        
      0x00  //  
    ]),
    '2': new Uint8Array([
      0x00, //        
      0x38, //   ###  
      0x44, //  #   # 
      0x04, //      # 
      0x08, //     #  
      0x10, //    #   
      0x20, //   #    
      0x44, //  #   # 
      0x7C, //  ##### 
      0x00, //        
      0x00, //        
      0x00  //  
    ]),
    '3': new Uint8Array([
      0x00, //        
      0x38, //   ###  
      0x44, //  #   # 
      0x04, //      # 
      0x18, //    ##  
      0x04, //      # 
      0x04, //      # 
      0x44, //  #   # 
      0x38, //   ###  
      0x00, //        
      0x00, //        
      0x00  //
    ]),
    '4': new Uint8Array([
      0x00, //        
      0x0C, //     ## 
      0x14, //    # # 
      0x14, //    # # 
      0x24, //   #  # 
      0x44, //  #   # 
      0x7E, //  ######
      0x04, //      # 
      0x0E, //     ###
      0x00, //        
      0x00, //        
      0x00  //      
    ]),
    '5': new Uint8Array([
      0x00, //        
      0x3C, //   #### 
      0x20, //   #    
      0x20, //   #    
      0x38, //   ###  
      0x04, //      # 
      0x04, //      # 
      0x44, //  #   # 
      0x38, //   ###  
      0x00, //        
      0x00, //        
      0x00  //       
    ]),
    '6': new Uint8Array([
      0x00, //        
      0x1C, //    ### 
      0x20, //   #    
      0x40, //  #     
      0x78, //  ####  
      0x44, //  #   # 
      0x44, //  #   # 
      0x44, //  #   # 
      0x38, //   ###  
      0x00, //        
      0x00, //        
      0x00  //     
    ]),
    '7': new Uint8Array([
      0x00, //        
      0x7C, //  ##### 
      0x44, //  #   # 
      0x04, //      # 
      0x08, //     #  
      0x08, //     #  
      0x08, //     #  
      0x10, //    #   
      0x10, //    #   
      0x00, //        
      0x00, //        
      0x00  //     
    ]),
    '8': new Uint8Array([
      0x00, //        
      0x38, //   ###  
      0x44, //  #   # 
      0x44, //  #   # 
      0x38, //   ###  
      0x44, //  #   # 
      0x44, //  #   # 
      0x44, //  #   # 
      0x38, //   ###  
      0x00, //        
      0x00, //        
      0x00  //      
    ]),
    '9': new Uint8Array([
      0x00, //        
      0x38, //   ###  
      0x44, //  #   # 
      0x44, //  #   # 
      0x44, //  #   # 
      0x3C, //   #### 
      0x04, //      # 
      0x08, //     #  
      0x70, //  ###   
      0x00, //        
      0x00, //        
      0x00  //      
    ]),
    'a': new Uint8Array([
      0x00, //        
      0x00, //        
      0x00, //        
      0x38, //   ###  
      0x44, //  #   # 
      0x3C, //   #### 
      0x44, //  #   # 
      0x44, //  #   # 
      0x3E, //   #####
      0x00, //        
      0x00, //        
      0x00  //     
    ]),
    'b': new Uint8Array([
      0x00, //        
      0xC0, // ##     
      0x40, //  #     
      0x58, //  # ##  
      0x64, //  ##  # 
      0x44, //  #   # 
      0x44, //  #   # 
      0x44, //  #   # 
      0xF8, // #####  
      0x00, //        
      0x00, //        
      0x00  //      
    ]),
    'e': new Uint8Array([
      0x00, //        
      0x00, //        
      0x00, //        
      0x38, //   ###  
      0x44, //  #   # 
      0x7C, //  ##### 
      0x40, //  #     
      0x40, //  #     
      0x3C, //   #### 
      0x00, //        
      0x00, //        
      0x00  //      
    ]),
    'r': new Uint8Array([
      0x00, //        
      0x00, //        
      0x00, //        
      0x6C, //  ## ## 
      0x30, //   ##   
      0x20, //   #    
      0x20, //   #    
      0x20, //   #    
      0x7C, //  ##### 
      0x00, //        
      0x00, //        
      0x00  //      
    ]),
    't': new Uint8Array([
      0x00, //        
      0x00, //        
      0x20, //   #    
      0x7C, //  ##### 
      0x20, //   #    
      0x20, //   #    
      0x20, //   #    
      0x22, //   #   #
      0x1C, //    ### 
      0x00, //        
      0x00, //        
      0x00  //     
    ]),
    'y': new Uint8Array([
      0x00, //        
      0x00, //        
      0x00, //        
      0xEE, // ### ###
      0x44, //  #   # 
      0x24, //   #  # 
      0x28, //   # #  
      0x18, //    ##  
      0x10, //    #   
      0x10, //    #   
      0x78, //  ####  
      0x00  //    
    ])
  };
  
  
  function run() {
  
    var spi = SPI1;
  
    spi.setup({
        mosi: D1,
        sck:  D2
    });
  
    var display = require("https://raw.githubusercontent.com/ldaponte/EPD2IN13BC/main/Espruino/Driver/EPD2IN13BC.js").connect({
        resetPin : D30,
        dcPin : D29,
        csPin : D28,
        busyPin : D31
    }, spi);
  
    print("version: ", display.driverVersion);
    display.init();
  
    display.paint_clear(display.C.UNCOLORED);
    display.paint_drawStringAt(8, 2, "beer 27%", font_table, display.C.COLORED);
    display.paint_drawStringAt(8, 24, "battery 93%", font_table, display.C.COLORED);
    display.setPartialWindowBlack(0, 8, display.C.PAINT_WIDTH, display.C.PAINT_HEIGHT);
    
    display.displayFrame();
  
    display.sleep(); 
  }
  
  setTimeout(run, 1000);
  