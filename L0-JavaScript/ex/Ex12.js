export const saveToLocalStorage = (key, value = []) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to save data to localStorage:", error);
  }
};

export const getFromLocalStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error("Failed to get data from localStorage:", error);
    return defaultValue;
  }
};
