var fs = require('fs');
var wpi = require('wiring-pi');
wpi.setup('sys');

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

const testPinBcm = 17;
const fsDev = '/sys/devices/virtual/gpio/gpio' + testPinBcm;

var value = '1';

suite.add('Read [FS]', function(deferred) {
  fs.readFile(fsDev + "/value", function(){ deferred.resolve(); });
}, { 'defer': true, 'setup': function(){ wpi.pinMode(17, wpi.INPUT); } })

suite.add('Read [WPi]', function(deferred) {
  wpi.digitalRead(testPinBcm);
  deferred.resolve();
}, { 'defer': true, 'setup': function(){ wpi.pinMode(17, wpi.INPUT); } })

suite.add('Write 1/0 alternating [FS]', function(deferred) {
  value = (value === '1' ? '0' : '1');
  fs.writeFile(fsDev + "/value", value, "utf8", function(){ deferred.resolve(); });
}, { 'defer': true, 'setup': function(){ wpi.pinMode(17, wpi.OUTPUT); var value = '1'; } })

suite.add('Write 1/0 alternating [WPi]', function(deferred) {
  value = (value === 1 ? 0 : 1);
  wpi.digitalWrite(testPinBcm, value);
  deferred.resolve();
}, { 'defer': true, 'setup': function(){ wpi.pinMode(17, wpi.OUTPUT); var value = 1; } })

.on('cycle', function(event) {
  console.log(String(event.target));
})

// -r-u-n- -a-s-y-n-c- no, don't, because I don't know what that does
.run({ 'async': false });
