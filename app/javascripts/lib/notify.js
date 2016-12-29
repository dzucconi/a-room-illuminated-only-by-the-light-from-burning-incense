import className from './class_name';

export default frame => {
  className(frame + 1, 'highlight--1');
  className(frame + 2, 'highlight--2');

  const highlight = className(frame, 'highlight');

  className(frame - 1, 'highlight--1');
  className(frame - 2, 'highlight--2');
  className(frame - 3, '');

  return highlight.innerText;
};
