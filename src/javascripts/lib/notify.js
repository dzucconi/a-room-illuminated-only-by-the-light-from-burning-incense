import className from "./className";

export default frame => {
  className(frame + 1, "Highlight Highlight--1");
  className(frame + 2, "Highlight Highlight--2");

  const highlight = className(frame, "Highlight");

  className(frame - 1, "Highlight Highlight--1");
  className(frame - 2, "Highlight Highlight--2");
  className(frame - 3, "Lowlight");

  return highlight;
};
