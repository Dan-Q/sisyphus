"use strict";

function dice_initialize() {
  const canvas = $t.id('canvas');
  canvas.style.width = window.innerWidth - 1 + 'px';
  canvas.style.height = window.innerHeight - 1 + 'px';

  $t.dice.use_true_random = false;

  const box = new $t.dice.dice_box(canvas, { w: window.innerWidth, h: window.innerHeight });
  box.animate_selector = false;

  const twoD6 = ()=>$t.dice.parse_notation('2d6');

  function after_roll(notation, result) {
    const roll = (result.reduce(function(s, a) { return s + a; }) + notation.constant);
    if(roll == 2) {
      // back to start
      moveToSquare(1);
    } else {
      moveBy(roll);
    }
  }

  box.bind_throw(document.body, twoD6, (a,b,c)=>c(), after_roll);
}

dice_initialize();

const ol = document.querySelector('ol');
function moveToSquare(sq){
  currentSquare = sq;
  ol.style.transform = `translate3d(${(currentSquare - 1) * -6}em, 200px, 0)`;
  if(currentSquare > 1000){
    setTimeout(()=>moveToSquare(1), 1000);
  }
}
function moveBy(roll){
  moveToSquare(currentSquare + roll);
}
let currentSquare = 1;
moveToSquare(1);
setTimeout(()=>ol.classList.add('animated'), 1000);
