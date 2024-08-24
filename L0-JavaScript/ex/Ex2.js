import { listData, keyLocalStorageListSP } from "./Ex1";

export const saveDataToLocalStorage = () => {
  if (!Array.isArray(listData)) {
    console.error("listData is not an array");
    return;
  }

  localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
};
