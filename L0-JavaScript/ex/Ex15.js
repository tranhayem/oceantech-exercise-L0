export const confirmPurchase = async (order) => {
  const existingProduct = listData.find(
    (product) => product.id === order.productId
  );
  if (existingProduct && order.quantity > existingProduct.quantity) {
    console.error("Insufficient quantity");
    return;
  }

  await addOrder(order);
  updateProductQuantity(order.productId, -order.quantity);
  removeProductFromCart(order.productId);
};
