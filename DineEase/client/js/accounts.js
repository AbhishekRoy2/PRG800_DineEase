let todayOrders;

const getTodayOrders = async () => {
  await fetch(`${api_path}todayOrders`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      todayOrders = data.orders;
    })
    .catch((err) => {
      console.log(err);
    });
};

const addItem = () => {
  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;
  fetch(`${api_path}menu`, {
    method: "POST",
    body: JSON.stringify({
      name,
      price,
      description,
      image,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //   alert("Item Added");
      //   window.location.reload();
    })
    .catch((err) => console.log(err));
};

(main = async () => {
  await getTodayOrders();
  console.log(todayOrders);
  const table = document.getElementById("accordionExample");
  table.innerHTML = "";
  let total = 0;
  todayOrders.forEach((order) => {
    let orderItem = `<div class="accordion-item">
    <h2 class="accordion-header" id="flush-${order._id}-heading">
      <button
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-${order._id}-data"
        aria-expanded="false"
        aria-controls="flush-${order._id}-data"
      >
        <span class="text-primary fw-bolder">BILL ID</span> : ${order._id} ,
        <span class="text-primary fw-bolder">Total</span> : $${parseInt(
          order.total
        ).toFixed(2)}
        <a class="text-success ms-4" onclick="updateStatus('${order._id}')">
          ${order.status}
        </a>
      </button>
    </h2>
    <div
      id="flush-${order._id}-data"
      class="accordion-collapse collapse"
      aria-labelledby="flush-${order._id}-heading"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        <!-- list of item name price and quantity -->
        <ul>`;
    order.items.forEach((item) => {
      orderItem += `<li
        class="d-flex justify-content-between text-center border mv-2 mh-1 p-1"
      >
        <span>${item.name}</span><span>${item.quantity}</span><span>$${item.price}</span>
      </li>`;
    });
    orderItem += `</ul>
      </div>
      </div>
      </div>`;
    table.innerHTML += orderItem;
    total += parseInt(order.total);
  });
  document.getElementById("todayTotal").innerHTML = `$${total}`;
})();
