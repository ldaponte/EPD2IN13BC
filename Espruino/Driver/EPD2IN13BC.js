var timers = [];
var debug = true;

function timerStart(functionName) {
  if(debug) {
    timers.push(new Date().getTime());
    print("calling: " + functionName);
  }
}

function timerElapsed(functionName) {
  if(debug) {
    print("call complete: " + functionName, new Date().getTime() - timers.pop());
  }
}
function EPD2IN13BC (config, spi) {
  this.driverVersion = "v1.32";
  this.resetPin = config.resetPin;
  this.dcPin = config.dcPin;
  this.csPin = config.csPin;
  this.busyPin = config.busyPin;
  this.spi = spi;
  this.image = new Uint8Array(0);
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
  DISPLAY_HEIGHT : 212,
  FONT_WIDTH : 7,
  FONT_HEIGHT : 12
};

EPD2IN13BC.prototype.setImageBuffer = function(width, height) {
  this.imageWidth = width % 8 ? width + 8 - (width % 8) : width;  //ensure multiple of 8
  this.imageHeight = height;
  this.image = new Uint8Array(this.imageWidth * this.imageHeight / 8);
};

EPD2IN13BC.prototype.setImageWidth = function(width) {
  this.imageWidth = width % 8 ? width + 8 - (width % 8) : width;  //ensure multiple of 8
  if(this.imageWidth * this.imageHeight / 8 > this.image.length) {
    this.image = new Uint8Array(this.imageWidth * this.imageHeight / 8);  //automatically grow the image buffer - contents lost
  }
};

EPD2IN13BC.prototype.setImageHeight = function(height) {
  this.imageHeight = height;
  if(this.imageWidth * this.imageHeight / 8 > this.image.length) {
    this.image = new Uint8Array(this.imageWidth * this.imageHeight / 8);  //automatically grow the image buffer - contents lost
  }
};

EPD2IN13BC.prototype.getImageHeight = function() {
  return this.imageHeight;
}

EPD2IN13BC.prototype.getImageWidth = function() {
  return this.imageWidth;
}

EPD2IN13BC.prototype.getDisplayHeight = function() {
  return this.C.DISPLAY_HEIGHT;
}

EPD2IN13BC.prototype.getDisplayWidth = function() {
  return this.C.DISPLAY_WIDTH;
}

EPD2IN13BC.prototype.delay = function(miliseconds) {
  var currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) {
  }
};

EPD2IN13BC.prototype.waitBusy = function() {
  timerStart("waitBusy");
  while(digitalRead(this.busyPin) == 0) {
    this.delay(100);
  }
  timerElapsed("waitBusy");
};

EPD2IN13BC.prototype.sendCommand = function(command) {
  //timerStart("sendCommand");  //About 3ms
  digitalWrite(this.dcPin, this.C.LOW);
  digitalWrite(this.csPin, this.C.LOW);
  this.spi.write(command);
  digitalWrite(this.csPin, this.C.HIGH);
  //timerElapsed("sendCommand");
};

EPD2IN13BC.prototype.sendData = function(data) {
  //timerStart("sendData");  //About 3ms
  digitalWrite(this.dcPin, this.C.HIGH);
  digitalWrite(this.csPin, this.C.LOW);
  this.spi.write(data);
  digitalWrite(this.csPin, this.C.HIGH);
  //timerElapsed("sendData");
};

EPD2IN13BC.prototype.clearFrame = function() {
  timerStart("clearFrame");
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
  timerElapsed("clearFrame");
};

/* if colored = 0 and we've never set any bits in paint area then we don't need
to call this function since the image buffer is automatically initialized to 0x00 */
EPD2IN13BC.prototype.paintClear = function(colored) {
  timerStart("paintClear");
  if (colored) {
    this.image.fill(0xFF);
  } else {
    this.image.fill(0x00);
  }
  timerElapsed("paintClear");
};

EPD2IN13BC.prototype.sleep = function() {
  timerStart("sleep");
  this.sendCommand(this.C.POWER_OFF);
  this.waitBusy();
  this.sendCommand(this.C.DEEP_SLEEP);
  this.sendData(0xA5);     // check code
  timerElapsed("sleep");
};

EPD2IN13BC.prototype.paintDrawPixel = function(x, y, colored) {
  //timerStart("paintDrawPixel");  //About 8ms

  if(x < 0 || x >= this.imageWidth || y < 0 || y >= this.imageHeight) {
      return;
  }
  this.paintDrawAbsolutePixel(x, y, colored);
  //timerElapsed("paintDrawPixel");
};

EPD2IN13BC.prototype.paintDrawCharAt = function(x, y, ascii_char, font, colored) {
  timerStart("paintDrawCharAt");
  var i = 0;
  var j = 0;

  var offset = 0;
  var font_char = font[ascii_char];

  for (j = 0; j < this.C.FONT_HEIGHT; j++) {
      for (i = 0; i < this.C.FONT_WIDTH; i++) {
          if (font_char[offset] & (0x80 >> (i % 8))) {
              this.paintDrawPixel(x + i, y + j, colored);
          }
          if (i % 8 == 7) {
              offset++;
          }
      }
      if (this.C.FONT_WIDTH % 8 != 0) {
          offset++;
      }
  }
  timerElapsed("paintDrawCharAt");
};

EPD2IN13BC.prototype.paintDrawStringAt = function(x, y, text, font, colored) {
  timerStart("paintDrawStringAt");
  var refcolumn = x;
  var text_elements = text.split("");

  /* Send the string character by character on EPD */
  for (i = 0; i < text_elements.length; i++) {
    this.paintDrawCharAt(refcolumn, y, text_elements[i], font, colored);
    refcolumn += this.C.FONT_WIDTH;
  }
  timerElapsed("paintDrawStringAt");
};

EPD2IN13BC.prototype.paintDrawAbsolutePixel = function(x, y, colored) {
  //timerStart("paintDrawAbsolutePixel");  //About 3.5ms
  var val;

  if (x < 0 || x >= this.imageWidth || y < 0 || y >= this.imageHeight) {
      return;
  }

  val = Math.floor((x + y * this.imageWidth) / 8);

  if (colored) {
      this.image[val] |= 0x80 >> (x % 8);
  } else {
      this.image[val] &= ~(0x80 >> (x % 8));
  }
  //timerElapsed("paintDrawAbsolutePixel");
};

EPD2IN13BC.prototype.setPartialWindowBlack = function(x, y, w, l) {
  timerStart("setPartialWindowBlack");
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
  timerElapsed("setPartialWindowBlack");
};

EPD2IN13BC.prototype.displayFrame = function() {
  timerStart("displayFrame");
  this.sendCommand(this.C.DISPLAY_REFRESH);
  this.waitBusy();
  timerElapsed("displayFrame");
};

EPD2IN13BC.prototype.reset = function() {
  timerStart("reset");
  digitalWrite(this.resetPin, this.C.LOW);
  this.delay(200);
  digitalWrite(this.resetPin, this.C.HIGH);
  this.delay(200);
  timerElapsed("reset");
};

EPD2IN13BC.prototype.init = function() {
  timerStart("init");
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
  timerElapsed("init");
};

exports.connect = function (config, spi) {
  return new EPD2IN13BC(config, spi);
};
