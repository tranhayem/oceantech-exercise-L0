import { getOrders, deleteOrder } from "./Ex13.js";
import { showToast } from "./toast.js";

const renderOrders = async () => {
  const ordersTableBody = document.getElementById("orders-table-body");
  const orders = await getOrders();

  if (!orders || orders.length === 0) {
    ordersTableBody.innerHTML =
      "<tr><td colspan='7' class='text-center'>No orders found.</td></tr>";
    return;
  }

  ordersTableBody.innerHTML = orders
    .map((order) => {
      const totalQuantity = order.cartItems.reduce(
        (sum, item) => sum + item.soLuong,
        0
      );
      const totalPrice = order.cartItems
        .reduce((sum, item) => sum + item.price * item.soLuong, 0)
        .toFixed(2);

      return `
      <tr>
        <td>
          ${order.id}
          <div class="dropdown">
            <button class="btn btn-link dropdown-toggle text-decoration-none" type="button"
              id="dropdownMenuButton-${order.id}"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Details
            </button>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton-${
              order.id
            }">
              <li class="dropdown-item">
                Địa chỉ: ${order.user.address}.
              </li>

              <li class="dropdown-item">
                Lời nhắc: ${
                  order.user.message ? order.user.message : "Không có lời nhắc."
                } 
              </li>

              ${order.cartItems
                .map(
                  (item) => `
                <li class="dropdown-item">
                  <div class="order-item">
                    <img src="${item.imageUrl}"
                      alt="${item.name}" width="60px"
                      class="m-2 bg-body-secondary p-1 object-fit-cover">
                    <div class="d-inline-block align-middle">
                      <div class="fw-bold">${item.name}</div>
                      <div>Quantity: ${item.soLuong}</div>
                      <div>Price: $${item.price}</div>
                    </div>
                  </div>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        </td>
        <td>${order.user.fullName}</td>
        <td>${order.purchaseDate}</td>
        <td>${order.cartItems.length}</td>
        <td>${totalQuantity}</td>
        <td>$${totalPrice}</td>
        <td>
          <button class="btn btn-outline-danger btn-sm delete-order-btn" data-id="${
            order.id
          }">
            <i class="fas fa-times"></i>
          </button>
        </td>
      </tr>
    `;
    })
    .join("");

  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  document.querySelectorAll(".delete-order-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const orderId = button.dataset.id;
      const confirmed = confirm("Are you sure you want to delete this order?");
      if (confirmed) {
        await deleteOrder(orderId);
        showToast("Success", "Order deleted successfully.", "success");
        renderOrders();
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", renderOrders);
