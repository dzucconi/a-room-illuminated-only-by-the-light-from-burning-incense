import parameters from 'queryparams';
import text from './text';
import rand from './lib/rand';
import timeout from './lib/timeout';
import keyboard from './lib/keyboard';
import notify from './lib/notify';
import * as sounds from './lib/sounds';
import * as is from './lib/is';

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
  const pause = rand(2, 40);

  timeout(() => {
    if (STATE.cursor === message.length + 1) {
      STATE.cursor = 0;

      return step(message);
    }

    const active = notify(STATE.cursor);

    sounds.tock.play();
    DOM.keyboard.innerHTML = keyboard(letter);

    STATE.cursor++;

    if (!is.visible(active)) {
      window.scroll(0, active.getBoundingClientRect().top);
    }

    step(message);
  }, letter && letter.match(/\s|,|\.|\?$/) ? (pause * 5) : pause);
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
