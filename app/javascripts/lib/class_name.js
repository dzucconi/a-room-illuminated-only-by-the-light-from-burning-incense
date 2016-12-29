export default (idx, klass) => {
  const el = document.getElementById(`idx_${idx}`);
  if (el) el.className = klass;
  return el;
};
