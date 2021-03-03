import { MainBoard } from './app/app.js';
import "./main.scss";

// Initialize

function init() {
    const elmInit = document.getElementById('js-mainBoard');
    if (elmInit) new MainBoard(elmInit);
  }

init();
