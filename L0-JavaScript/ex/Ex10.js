export const generateRandomID = (() => {
  const ids = new Set();

  const createID = () => {
    const id = Math.random().toString(36).substr(2, 9);
    if (ids.has(id)) {
      return createID();
    }
    ids.add(id);
    return id;
  };

  return createID;
})();
