fs-wiringpi-benchmark
=====================

Quick benchmark for Raspberry Pi GPIO read/write. Compares filesystem writes to eugeneware/wiring-pi native bindings. 

Validity is questionable, because benchmarking is tricky. I’m particularly sceptical because I’m using wiring-pi for sending 433MHz datagrams that have a base length of 330 *micro*seconds – and it’s doing fine. The benchmark implies the average write takes 3 *milli*seconds.

Maybe we’re dealing with timeframes that are too short for Benchmark.js to measure accurately?

Results
-------
```
  Read [FS] x 192 ops/sec ±3.19% (77 runs sampled)
  Read [WPi] x 302 ops/sec ±6.72% (75 runs sampled)
  Write 1/0 alternating [FS] x 240 ops/sec ±2.41% (74 runs sampled)
  Write 1/0 alternating [WPi] x 315 ops/sec ±1.63% (77 runs sampled)
```
