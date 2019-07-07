const KEYBOARD = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]
];

export default active => {
  return KEYBOARD.map(row => {
    return `
      <div class='Keyboard__row'>
        ${row
          .map(
            key => `
          <span class='Key ${
            key === (active && active.toLowerCase()) ? "Key--active" : ""
          }'>
            ${key}
          </span>
        `
          )
          .join("")}
      </div>
    `;
  }).join("");
};
