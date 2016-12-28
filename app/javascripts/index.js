import { Howl } from 'howler';
import parameters from 'queryparams';
import rand from './lib/rand';
import timeout from './lib/timeout';
import keyboard from './lib/keyboard';
import text from './text';

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

const className = (idx, klass) => {
  const el = document.getElementById(`idx_${idx}`);
  if (el) el.className = klass;
  return el;
};

export default () => {
  const { message } = parameters({ message: text });

  const letters = message.split('').concat([' ']);

  DOM.app.innerHTML = letters.map((x, i) => `<span id='idx_${i}'>${x}</span>`).join('');

  const notify = frame => {
    className(frame + 1, 'highlight--1');
    className(frame + 2, 'highlight--2');

    const highlight = className(frame, 'highlight');

    className(frame - 1, 'highlight--1');
    className(frame - 2, 'highlight--2');
    className(frame - 3, '');

    return highlight.innerText;
  };

  const step = () => {
    const letter = message[STATE.cursor];
    const pause = rand(0, 50);

    timeout(() => {
      if (STATE.cursor === message.length + 1) {
        STATE.cursor = 0;

        return step();
      }

      notify(STATE.cursor);

      tock.play();
      DOM.keyboard.innerHTML = keyboard(letter);

      STATE.cursor++;

      step();
    }, letter.match(/\s|,|\.|\?$/) ? (pause * 5) : pause);
  };

  step();
};
