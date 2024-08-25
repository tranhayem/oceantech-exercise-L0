import { keyLocalStorageListSP } from "./Ex1";

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem(keyLocalStorageListSP);

  if (!data) {
    console.error("No data found in localStorage");
    return [];
  }

  try {
    const parsedData = JSON.parse(data);
    if (!Array.isArray(parsedData)) {
      throw new Error("Data is not an array");
    }
    return parsedData;
  } catch (error) {
    console.error("Error parsing data from localStorage:", error);
    return [];
  }
};

export const renderData = () => {
  const listData = getDataFromLocalStorage();
  listData.forEach((item) => {
    console.log(
      `ID: ${item.id}, Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`
    );
  });
};
