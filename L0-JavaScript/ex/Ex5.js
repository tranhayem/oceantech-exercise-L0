Array.prototype.calculateTotal = function (key) {
  return this.reduce((total, item) => total + (item[key] || 0), 0);
};

const cart = JSON.parse(localStorage.getItem(keyLocalStorageItemCart)) || [];
const totalQuantity = cart.calculateTotal("soLuong");
const totalPrice = cart.reduce((total, item) => {
  const product = listData.find((p) => p.id === item.idSP);
  return total + (product ? product.price * item.soLuong : 0);
}, 0);

console.log(`Total Quantity: ${totalQuantity}, Total Price: ${totalPrice}`);
