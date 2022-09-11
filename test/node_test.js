const { sevenSun } = require('../dist/bundle.js');

let hex = sevenSun.toHEX('rgb(0,145,138)');
let rgb = sevenSun.toRGB('#00918a');

console.log(hex, rgb);
