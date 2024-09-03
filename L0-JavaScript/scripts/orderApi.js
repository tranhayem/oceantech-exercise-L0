import { ordersUrl } from "./constants.js";
import { Utils } from "./utils.js";

export const getOrders = async () => {
  return await Utils.fetchData(ordersUrl);
};

export const addOrder = async (order) => {
  return await Utils.fetchData(ordersUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
};

export const deleteOrder = async (orderId) => {
  return await Utils.fetchData(`${ordersUrl}/${orderId}`, { method: "DELETE" });
};
