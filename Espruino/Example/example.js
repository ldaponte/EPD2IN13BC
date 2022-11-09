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
      busyPin : D31,
  }, spi);

  print("version: ", display.driverVersion);

  display.init();

  // The image buffer is a "window" overlayed with the display.
  // The idea is to create an image buffer only large enough to
  // hold what you want to display
  // Call setImageBuffer(pixel_width, pixel_height)
  // pixel_width and pixel_height can be smaller than or equal to 
  // the display pixel width and height
  // The example here sets the image buffer to the width of the display
  // and 18 pixels high which is just enough to hold one line of the 
  // 12 pixel high font plus an additional 6 pixels that can be blank
  // The memory used by the buffer is calculated as (width * height / 8) bytes
  // The example below will create a buffer (104 * 18 / 8) or 234 bytes
  // You could reserve a buffer large enough to print the entire display
  // at once but you will use more memory so it may be better to
  // print portions of the display as needed and use less memory
  display.setImageBuffer(display.getDisplayWidth(), 18);  //Number of buffer pixels wide x pixels heigh
  
  // paintClear() clears all the bits in the image buffer
  display.paintClear(display.C.UNCOLORED);

  // paintDrawStringAt draws the pixels based on the message you 
  // want to print and the font you want to use
  // paintDrawStringAt(start_pixel_column, start_pixel_row, message, font, display.C.COLORED)
  // this example will start the message 8 pixels from the left margin of the image buffer
  // and 2 pixels from the top margin of the image buffer
  display.paintDrawStringAt(8, 2, "beer 27%", font_table, display.C.COLORED);
  
  // setPartialWindowBlack copies the image buffer to the display hardware
  // setPartialWindowBlack(start_pixel_column, start_pixel_row, image_width, image_height)
  // in this example we are displaying the image buffer starting at the display pixel column 0
  // and the display pixel row 8.
  // the text should display starting pixel column 8 (8 + 0) and pixel row 10 (2 + 8)
  display.setPartialWindowBlack(0, 8, display.getImageWidth(), display.getImageHeight());
  
  display.paintClear(display.C.UNCOLORED);
  display.paintDrawStringAt(8, 2, "battery 88%", font_table, display.C.COLORED);
  display.setPartialWindowBlack(0, 24, display.getImageWidth(), display.getImageHeight());
  
  // displayFrame tells the hardware to display what was sent to the display memory by 
  // setPartialWindowBlack
  display.displayFrame();

  // Important to put the display to sleep as soon as possible
  display.sleep(); 
}

setTimeout(run, 1000);
