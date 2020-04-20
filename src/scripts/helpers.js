// Helper function that calculates the score based on the game time and number of attempts
function score (time, attempts, penalization = { time: 1, attempts: 5 }) {
  const attemptPenalization = attempts * (penalization.attempts / 100); // Attemps penalize more so random picks are not rewarded
  const timePenalization = time * (penalization.time / 100); // Time penalizes less so thinking is rewarded
  return 2 * Math.round(Math.log(attemptPenalization + 1.01)**(-1) + Math.log(timePenalization + 1.01)**(-1));
}

// Helper function that shuffles items in an array
function shuffle (items) {
  // Shuffling algorithm based on the Fisher-Yates algorithm (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
  const shuffled = [...items];
  const total = items.length;
  for (let k = 0; k < total; k ++) {
    const index = Math.round(Math.random() * k);
    const tmp = shuffled[index];
    shuffled[index] = shuffled[k];
    shuffled[k] = tmp;
  }
  return shuffled;
}

// Helper function that gets the transitionEnd event name based on the browser
function getOnTransitionEndName() {
  const transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd"
   };
  const bodyStyle = document.body.style;
  for(let transition in transitions) {
    if(bodyStyle[transition] != undefined) {
      window.__browserTransitionEnd__ = transitions[transition];
    }
  }
}

export { score, shuffle, getOnTransitionEndName };
