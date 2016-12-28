import { Howl } from 'howler';
import parameters from 'queryparams';
import rand from './lib/rand';
import timeout from './lib/timeout';
import keyboard from './lib/keyboard';

window.parameters = parameters;

const DOM = {
  app: document.getElementById('app'),
  keyboard: document.getElementById('keyboard'),
};

const STATE = {
  cursor: 0,
};

const tock = new Howl({
  src: ['sounds/tock.wav'],
  volume: 0.25,
});

export default () => {
  const { message } = parameters({ message: '“Making” is always a compromised, ambiguous affair.' });

  const letters = message.split('').concat([' ']);

  DOM.app.innerHTML = letters.map((x, i) => `<span id='idx_${i}'>${x}</span>`).join('');

  const notify = frame => {
    const highlight = document.getElementById(`idx_${frame}`);
    if (highlight) highlight.className = 'highlight';

    const toggled = document.getElementById(`idx_${frame - 1}`);
    if (toggled) toggled.className = '';

    return highlight.innerText;
  };

  const step = () => {
    timeout(() => {
      if (STATE.cursor === message.length + 1) {
        STATE.cursor = 0;

        return step();
      }

      const letter = notify(STATE.cursor);

      tock.play();
      DOM.keyboard.innerHTML = keyboard(letter);

      STATE.cursor++;

      step();
    }, rand(10, 50));
  };

  step();
};
