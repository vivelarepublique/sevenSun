import { sevenSun } from '../dist/bundle.js';

let button1 = document.getElementById('button1');
let input1 = document.getElementById('input1');
let result1 = document.getElementById('result1');

let button2 = document.getElementById('button2');
let input2 = document.getElementById('input2');
let result2 = document.getElementById('result2');

button1.addEventListener('click', () => {
    result1.innerHTML = sevenSun.toHEX(input1.value);
});

button2.addEventListener('click', () => {
    result2.innerHTML = sevenSun.toRGB(input2.value);
});
