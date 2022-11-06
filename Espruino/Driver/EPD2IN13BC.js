
function EPD2IN13BC (config, spi) {
  this.driverVersion = "v1.02";
  this.resetPin = config.resetPin;
  this.dcPin = config.dcPin;
  this.csPin = config.csPin;
  this.busyPin = config.busyPin;
  this.spi = spi;
  this.image = new Uint8Array(1024);
}

/* 212 is actual DISPLAY_HEIGHT but playing with smaller numbers 
to improve performance when we're not using the entire display */
EPD2IN13BC.prototype.C = {
  LOW : false,
  HIGH : true,
  BOOSTER_SOFT_START : 0x06,
  POWER_ON  : 0x04,
  PANEL_SETTING : 0x00,
  VCOM_AND_DATA_INTERVAL_SETTING : 0x50,
  RESOLUTION_SETTING : 0x61,
  DATA_START_TRANSMISSION_1  : 0x10,
  DATA_START_TRANSMISSION_2  : 0x13,
  PARTIAL_IN  : 0x91,
  PARTIAL_WINDOW : 0x90,
  PARTIAL_OUT  : 0x92,
  DISPLAY_REFRESH  : 0x12,
  POWER_OFF  :  0x02,
  DEEP_SLEEP   :  0x07,
  COLORED  :   0,
  UNCOLORED :  1,

  DISPLAY_WIDTH : 104,
  DISPLAY_HEIGHT : 48, //212

  PAINT_WIDTH: 128,
  PAINT_HEIGHT : 18,

  FONT_WIDTH : 7,
  FONT_HEIGHT : 12
};

/* paint region smaller than display size
Due to memory contraints, we paint a section of the display at a time using a smaller paint width & height
than the display width & height
*/

/* optimize - is calling getTime faster than using getTime from Date object? */
EPD2IN13BC.prototype.delay = function(miliseconds) {
  var currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) {
  }
};

EPD2IN13BC.prototype.waitBusy = function() {
  while(digitalRead(this.busyPin) == 0) {
    this.delay(100);
  }
};

EPD2IN13BC.prototype.sendCommand = function(command) {
  digitalWrite(this.dcPin, this.C.LOW);
  digitalWrite(this.csPin, this.C.LOW);
  this.spi.write(command);
  digitalWrite(this.csPin, this.C.HIGH);
};

EPD2IN13BC.prototype.sendData = function(data) {
  digitalWrite(this.dcPin, this.C.HIGH);
  digitalWrite(this.csPin, this.C.LOW);
  this.spi.write(data);
  digitalWrite(this.csPin, this.C.HIGH);
};

EPD2IN13BC.prototype.clearFrame = function() {
  this.sendCommand(this.C.DATA_START_TRANSMISSION_1);
  this.delay(2);
  for(i = 0; i < this.C.DISPLAY_WIDTH * this.C.DISPLAY_HEIGHT / 8; i++) { 
    this.sendData(0xFF);
  }
  this.delay(2);
  this.sendCommand(this.C.DATA_START_TRANSMISSION_2);
  this.delay(2);
  for(i = 0; i < this.C.DISPLAY_WIDTH * this.C.DISPLAY_HEIGHT / 8; i++) {
    this.sendData(0xFF);
  }
  this.delay(2);
};

/* if colored = 0 and we've never set any bits in paint area then we don't need
to call this function since the image buffer is automatically initialized to 0x00 */
/*
EPD2IN13BC.prototype.paint_clear = function(colored) {
  if (colored) {
    this.image.fill(0xFF);
  } else {
    this.image.fill(0x00);
  }
};
*/

EPD2IN13BC.prototype.paint_clear = function(colored) {
  for (var x = 0; x < this.C.WIDTH; x++) {
    for(var y = 0; y < this.C.HEIGHT; y++) {
      this.paint_drawAbsolutePixel(x, y, colored);
    }
  }
};

EPD2IN13BC.prototype.sleep = function() {
  this.sendCommand(this.C.POWER_OFF);
  this.waitBusy();
  this.sendCommand(this.C.DEEP_SLEEP);
  this.sendData(0xA5);     // check code
};

EPD2IN13BC.prototype.paint_drawPixel = function(x, y, colored) {

  if(x < 0 || x >= this.C.WIDTH || y < 0 || y >= this.C.PAINT_HEIGHT) {
      return;
  }
  this.paint_drawAbsolutePixel(x, y, colored);
};

EPD2IN13BC.prototype.paint_drawCharAt = function(x, y, ascii_char, font, colored) {
  var i = 0;
  var j = 0;

  var offset = 0;
  var font_char = font[ascii_char];

  for (j = 0; j < this.C.FONT_HEIGHT; j++) {
      for (i = 0; i < this.C.FONT_WIDTH; i++) {
          if (font_char[offset] & (0x80 >> (i % 8))) {
              this.paint_drawPixel(x + i, y + j, colored);
          }
          if (i % 8 == 7) {
              offset++;
          }
      }
      if (this.C.FONT_WIDTH % 8 != 0) {
          offset++;
      }
  }
};

EPD2IN13BC.prototype.paint_drawStringAt = function(x, y, text, font, colored) {

  var refcolumn = x;
  var text_elements = text.split("");

  /* Send the string character by character on EPD */
  for (i = 0; i < text_elements.length; i++) {
    this.paint_drawCharAt(refcolumn, y, text_elements[i], font, colored);
    refcolumn += this.C.FONT_WIDTH;
  }
};

EPD2IN13BC.prototype.paint_drawAbsolutePixel = function(x, y, colored) {
  var val;

  if (x < 0 || x >= this.C.PAINT_WIDTH || y < 0 || y >= this.C.PAINT_HEIGHT) {
      return;
  }

  val = Math.floor((x + y * this.C.PAINT_WIDTH) / 8);

  if (colored) {
      this.image[val] |= 0x80 >> (x % 8);  // set bit 1
  } else {
      this.image[val] &= ~(0x80 >> (x % 8));  // set bit 0
  }
};

EPD2IN13BC.prototype.setPartialWindowBlack = function(x, y, w, l) {

  this.sendCommand(this.C.PARTIAL_IN);
  this.sendCommand(this.C.PARTIAL_WINDOW);
  this.sendData(x & 0xf8);     // x should be the multiple of 8, the last 3 bit will always be ignored
  this.sendData(((x & 0xf8) + w  - 1) | 0x07);
  this.sendData(y >> 8);
  this.sendData(y & 0xff);
  this.sendData((y + l - 1) >> 8);
  this.sendData((y + l - 1) & 0xff);
  this.sendData(0x01);         // Gates scan both inside and outside of the partial window. (default) 
  this.delay(2);
  this.sendCommand(this.C.DATA_START_TRANSMISSION_1);
  if (this.image != null) {
      for(i = 0; i < w  / 8 * l; i++) {
          this.sendData(this.image[i]);
      }
  } else {
      for(i = 0; i < w  / 8 * l; i++) {
          this.sendData(0x00);
      }
  }
  this.delay(2);
  this.sendCommand(this.C.PARTIAL_OUT);
};

EPD2IN13BC.prototype.displayFrame = function() {
  this.sendCommand(this.C.DISPLAY_REFRESH);
  this.waitBusy();
};

EPD2IN13BC.prototype.reset = function() {
  digitalWrite(this.resetPin, this.C.LOW);
  this.delay(200);
  digitalWrite(this.resetPin, this.C.HIGH);
  this.delay(200);
};

EPD2IN13BC.prototype.init = function() {
  pinMode(this.csPin, "output");
  pinMode(this.resetPin, "output");
  pinMode(this.dcPin, "output");
  pinMode(this.busyPin, "input");

  this.reset();

  this.sendCommand(this.C.BOOSTER_SOFT_START);
  this.sendData(0x17);
  this.sendData(0x17);
  this.sendData(0x17);

  this.sendCommand(this.C.POWER_ON);

  this.waitBusy();

  this.sendCommand(this.C.PANEL_SETTING);
  this.sendData(0x8F);

  this.sendCommand(this.C.VCOM_AND_DATA_INTERVAL_SETTING);
  this.sendData(0x37);

  this.sendCommand(this.C.RESOLUTION_SETTING);
  this.sendData(this.C.DISPLAY_WIDTH);
  this.sendData(0x00);
  this.sendData(this.C.DISPLAY_HEIGHT);

  this.clearFrame();
};

exports.connect = function (config, spi) {
  return new EPD2IN13BC(config, spi);
};
