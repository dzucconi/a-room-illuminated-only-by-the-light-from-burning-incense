import parameters from 'queryparams';
import text from './text';
import rand from './lib/rand';
import timeout from './lib/timeout';
import keyboard from './lib/keyboard';
import notify from './lib/notify';
import * as sounds from './lib/sounds';

window.parameters = parameters;

const DOM = {
  app: document.getElementById('app'),
  keyboard: document.getElementById('keyboard'),
};

const STATE = {
  cursor: 0,
};

const step = message => {
  const letter = message[STATE.cursor];
  const pause = rand(0, 50);

  timeout(() => {
    if (STATE.cursor === message.length + 1) {
      STATE.cursor = 0;

      return step(message);
    }

    notify(STATE.cursor);

    sounds.tock.play();
    DOM.keyboard.innerHTML = keyboard(letter);

    STATE.cursor++;

    step(message);
  }, letter.match(/\s|,|\.|\?$/) ? (pause * 5) : pause);
};

export default () => {
  const { message } = parameters({
    message: text,
  });

  DOM.app.innerHTML = message
    .split('')
    .concat([' '])
    .map((x, i) => `<span id='idx_${i}'>${x}</span>`)
    .join('');

  step(message);
};
