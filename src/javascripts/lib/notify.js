import className from "./className";

export default frame => {
  className(frame + 1, "highlight--1");
  className(frame + 2, "highlight--2");

  const highlight = className(frame, "highlight");

  className(frame - 1, "highlight--1");
  className(frame - 2, "highlight--2");
  className(frame - 3, "letter");

  return highlight;
};
