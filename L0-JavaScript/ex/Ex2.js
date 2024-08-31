import { keyLocalStorageListSP, listData } from "./Ex1.js";

export const saveDataToLocalStorage = (key, value) => {
  if (Array.isArray(value)) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    console.error("Data is not an array.");
  }
};

saveDataToLocalStorage(keyLocalStorageListSP, listData);
