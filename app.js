// import functions and grab DOM elements
import { renderFighter } from './utils.js';
const form = document.querySelector('form');
const defeatedEl = document.querySelector('#defeated');
const fighterHPEl = document.querySelector('#fighter-hp');
const fighterImg = document.querySelector('#fighter-img');
const fightersList = document.querySelector('.fighters');
const fightersEl = document.querySelector('.fighters');
// let state
let lostfighterCount = 0;
let playerHP = 1;
let fighters = [
    { id: 1, name: 'Joel', hp: 1 },
    { id: 2, name: 'Sydnie', hp: 1 },
    { id: 3, name: 'Sam', hp: 1 },
];
let currentId = 1;
// set event listeners 
form.addEventListener('submit', (e) => {
    e.preventDefault();
  //   - User has supplied a name and submitted the form
    const data = new FormData(form);

    const fighterName = data.get('fighter-name');

  //   - Make a new goblin object with that user input

    const newFighter = {
        id: currentId,
        name: fighterName,
        hp: Math.ceil(Math.random() * 5),
    };
    currentId++;

  //   - Add that object to the array of goblins in state
    fighters.push(newFighter);

    displayFighters();
});

function fighterClickHandler(fighterData) {
    if (fighterData.hp <= 0) return;
    if (Math.random() < 0.33) {
        fighterData.hp--;
        alert('you hit ' + fighterData.name);
    } else {
        alert('you tried to hit ' + fighterData.name + ' but missed');
    }
  //  - possibly decrement player HP
    if (Math.random() < 0.5) {
        playerHP--;
        alert(fighterData.name + ' hit you!');
    } else {
        alert(fighterData.name + ' tried to hit you but missed!');
    }

    if (fighterData.hp === 0) {
        lostfighterCount++;
    }

    if (playerHP === 0) {
        fighterImg.classList.add('game-over');
        alert('GAME OVER!!!');
    }
  //     - update the DOM with new fighter, player, and defeated fighter state.
    fighterHPEl.textContent = playerHP;
    defeatedEl.textContent = lostfighterCount;

    const hpEl = document.getElementById(`fighter-hp-${fighterData.id}`);
    hpEl.textContent = fighterData.hp < 0 ? 0 : fighterData.hp;

    const faceEl = document.getElementById(`fighter-face-${fighterData.id}`);
    faceEl.textContent = fighterData.hp > 0 ? '🤕' : '😀';
}


function displayFighters() {
  //   - "update a list"
  //     - clear out the list DOM
    fightersList.textContent = '';

  //     - loop through the goblins
    for (let fighter of fighters) {
      //     - render a new goblin DOM element for each item
        const fighterEl = renderFighter(fighters);
      // - append that element to the HTML
      fighterEl.append(fighters);
      // now that we have a goblin element, we can make each goblin clickable like so
      // this is a DYNAMIC EVENT LISTENER. we make a new event listener for every goblin!
      // an event listener is a property just like anything else. just like text content, just like style. we add it to elements.
      fighterEl.addEventListener('click', () => {
        fighterClickHandler(fighter);
    });
    fightersList.append(fighters);
  
    }
}

displayFighters();
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state
