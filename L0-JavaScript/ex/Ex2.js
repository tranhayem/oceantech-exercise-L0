import { listData, keyLocalStorageListSP } from "./Ex1.js";

export const saveDataToLocalStorage = () => {
  if (!Array.isArray(listData)) {
    console.error("listData is not an array");

    return;
  }

  if (listData.length === 0) {
    return;
  }

  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
};

saveDataToLocalStorage();
