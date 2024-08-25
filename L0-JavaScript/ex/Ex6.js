export const showCart = () => {
  const cart = JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];
  cart.forEach((item) => {
    const product = listData.find((p) => p.id === item.idSP);
    if (product) {
      console.log(
        `Product: ${product.name}, Quantity: ${item.soLuong}, Price: ${product.price}`
      );
    }
  });

  const totalQuantity = cart.calculateTotal("soLuong");
  const totalPrice = cart.reduce((total, item) => {
    const product = listData.find((p) => p.id === item.idSP);
    return total + (product ? product.price * item.soLuong : 0);
  }, 0);

  console.log(`Total Quantity: ${totalQuantity}, Total Price: ${totalPrice}`);
};
