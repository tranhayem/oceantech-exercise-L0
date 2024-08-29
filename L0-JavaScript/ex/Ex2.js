import { listData, keyLocalStorageListSP } from "./Ex1.js";

export const saveDataToLocalStorage = (key, value) => {
  if (Array.isArray(value)) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    console.error("Dữ liệu không phải là mảng");
  }
};

saveDataToLocalStorage(keyLocalStorageListSP, listData);
