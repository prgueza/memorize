import '../styles/index.scss';
import { getOnTransitionEndName } from './helpers';
import Game from './game.js';
import Card from './card.js';

// Set onTransitionEndName
getOnTransitionEndName();

// Base configuration
const configuration = {
  numberOfCards: 16,
  hardcoreMode: false,
};

// Game
let game = null;

// Configuration buttons
const cardsButtonx16 = document.querySelector('button[data-memorize="numberOfCards-16"]');
const cardsButtonx36 = document.querySelector('button[data-memorize="numberOfCards-36"]');
const hardcoreModeOn = document.querySelector('button[data-memorize="hardcoreMode-on"]');
const hardcoreModeOff = document.querySelector('button[data-memorize="hardcoreMode-off"]');

const cardButtons = [cardsButtonx16, cardsButtonx36];
const hardcoreModeButtons = [hardcoreModeOn, hardcoreModeOff];

// Listeners for configuration buttons
const setConfiguration = (option, value) => configuration[option] = value;

cardsButtonx16.addEventListener('click', () => {
  setConfiguration('numberOfCards', 16);
  cardButtons.forEach(button => button.classList.toggle('toggle-btn--active'));
});

cardsButtonx36.addEventListener('click', () => {
  setConfiguration('numberOfCards', 36);
  cardButtons.forEach(button => button.classList.toggle('toggle-btn--active'));
});

hardcoreModeOn.addEventListener('click', () => {
  setConfiguration('hardcoreMode', true);
  hardcoreModeButtons.forEach(button => button.classList.toggle('toggle-btn--active'));
});

hardcoreModeOff.addEventListener('click', () => {
  setConfiguration('hardcoreMode', false);
  hardcoreModeButtons.forEach(button => button.classList.toggle('toggle-btn--active'));
});

// Game control buttons
const startButton = document.querySelector('button[data-memorize="start"]');
const resetButton = document.querySelector('button[data-memorize="reset"]');

// Game control listeners
startButton.addEventListener('click', () => {
  if (game) {
    game = game.reset({ el: '#game', ...configuration });
  } else {
    game = new Game({ el: '#game', ...configuration });
  }
});

resetButton.addEventListener('click', () => {
  configuration.numberOfCards = 16;
  configuration.hardcoreMode = false;
  cardsButtonx16.classList.add('toggle-btn--active');
  cardsButtonx36.classList.remove('toggle-btn--active');
  hardcoreModeOff.classList.add('toggle-btn--active');
  hardcoreModeOn.classList.remove('toggle-btn--active');
  game = game.reset({ el: '#game', ...configuration });
});
