# EPD2IN13BC
E-Paper Espruino Driver Port Project

- Waveshare user manual: https://www.waveshare.com/w/upload/1/13/2.13inch_e-Paper_D_user_manual_en.pdf

- Waveshare driver on GitHub: https://github.com/waveshare/e-Paper/tree/master/Arduino/epd2in13bc

My goal was to get this particular revison of the Waveshare 2.13 e-paper display working on a Puck.js device with very basic functionality.  Please expand functionality as needed.

This display is three color - black, white, and red but only black and white are implemented in this driver so far

Three color e-paper is very slow and you will see a lot of flashing when displayFrame() is called - this
appears to be normal.  Had I known this I would have chosen the black and white display.

Waveshare 2.13 inch e-paper display V2.1 to Puck.js pinouts

| Puck Pin | Display Pin |
|--------- | ----------- |
| 3V | VCC |         
| GND | GND |
| D1 | DIN |
| D2 | CLK |
| D28 | CS |
| D29 | DC |
| D30 | RST |
| D31 | BUSY |
