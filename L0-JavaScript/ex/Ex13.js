const ordersUrl = "http://localhost:3000/orders"; // Địa chỉ API

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};

export const getOrders = async () => {
  try {
    const response = await fetch(ordersUrl);
    return await handleResponse(response);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
};

export const addOrder = async (order) => {
  try {
    const response = await fetch(ordersUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const newOrder = await handleResponse(response);
    return newOrder;
  } catch (error) {
    console.error("Failed to add order:", error);
    return null;
  }
};

export const updateOrder = async (orderId, updatedOrder) => {
  try {
    const response = await fetch(`${ordersUrl}/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });
    const order = await handleResponse(response);
    return order;
  } catch (error) {
    console.error("Failed to update order:", error);
  }
};

// Xóa đơn hàng
export const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`${ordersUrl}/${orderId}`, {
      method: "DELETE",
    });
    await handleResponse(response);
  } catch (error) {
    console.error("Failed to delete order:", error);
  }
};
