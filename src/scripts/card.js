class Card {
  constructor (gameEl, id, setCandidate) {
    this._id = id;
    this.status = 'covered';
    this.setCandidate = setCandidate;
    this.gameEl = gameEl;
    this.wrapperEl = null;
    this.cardEl = null;
    this.baseClass = 'card';
    this.coverClass = 'card__cover';
    this.coverClass = 'card__cover';
    this.faceClass = 'card__face';
    this.wrapperClass = 'card__wrapper';
    this.uncoveredClass = 'card--uncovered';
    this.solvedClass = 'card--solved';
    this.init();
  }

  get id () {
    return this._id;
  }

  get isSolved () {
    return this.status === 'solved';
  }

  get isUncovered () {
    return this.status === 'uncovered';
  }

  setStatus (status) {
    this.status = status;
  }

  init () {
    // Create wrapper element (relative context for the card)
    const wrapperEl = document.createElement('div');
    wrapperEl.setAttribute('class', this.wrapperClass);
    // Create card element
    const cardContent =
      `<div class="${this.baseClass}">
        <div class="${this.coverClass}"></div>
        <div class="${this.faceClass}">
          <img src="public/svg/${this.id}.svg" width="100%" height="100%"/>
        </div>
      </div>`;
    // Build html structure
    wrapperEl.innerHTML= cardContent;
    this.wrapperEl = wrapperEl;
    this.cardEl = wrapperEl.querySelector(`.${this.baseClass}`);
    this.cardEl.addEventListener('click', () => this.setCandidate(this));
  }

  transitionEndHandler (resolve) {
    return () => {
      this.cardEl.removeEventListener(window.__browserTransitionEnd__, this.transitionEndHandler);
      resolve();
    };
  }

  solve() {
    this.setStatus('solved');
    this.cardEl.classList.add(this.solvedClass);
  }

  unSolve () {
    this.cardEl.classList.remove(this.solvedClass);
    this.cover();
  }

  async cover (resolve) {
    return new Promise((resolve) => {
      const onTransitionEnd = window.__browserTransitionEnd__;
      this.cardEl.addEventListener(onTransitionEnd, this.transitionEndHandler(resolve));
      this.cardEl.classList.remove(this.uncoveredClass);
      this.setStatus('covered');
    });
  }

  async uncover () {
    return new Promise((resolve) => {
      const onTransitionEnd = window.__browserTransitionEnd__;
      this.cardEl.addEventListener(onTransitionEnd, this.transitionEndHandler(resolve));
      this.cardEl.classList.add(this.uncoveredClass);
      this.setStatus('uncovered');
    });
  }

  render () {
    this.gameEl.append(this.wrapperEl);
    setTimeout(() => this.wrapperEl.style.opacity = 1, 200);
  }
}

export default Card;
