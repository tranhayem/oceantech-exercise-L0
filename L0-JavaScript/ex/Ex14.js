export const fetchOrders = async () => {
  try {
    const response = await fetch("http://localhost:3000/orders");
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addOrder = async (order) => {
  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("Failed to add order");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
