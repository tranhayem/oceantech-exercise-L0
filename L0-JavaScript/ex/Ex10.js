const existingIDs = new Set();

const generateRandomID = (() => {
  const createID = () => {
    const id = Math.random().toString(36).substr(2, 9);
    return existingIDs.has(id) ? createID() : id;
  };

  return () => {
    const newID = createID();
    existingIDs.add(newID);
    return newID;
  };
})();

const checkID = (id) => {
  return existingIDs.has(id) ? "ID already exists." : "Valid ID.";
};
