let pendingOrders;

const getPendingOrders = async () => {
  await fetch(`${api_path}pendingOrders`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      pendingOrders = data.order;
    })
    .catch((err) => {
      console.log(err);
    });
};

const completeOrder = async (id) => {
  await fetch(`${api_path}completeOrder/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("accordionExample").innerHTML = "";
      main();
    })
    .catch((err) => {
      console.log(err);
    });
};

(main = async () => {
  await getPendingOrders();
  console.log(pendingOrders);
  const table = document.getElementById("accordionExample");
  table.innerHTML = "";
  let total = 0;
  pendingOrders.forEach((order) => {
    let orderItem = `<div class="accordion-item w-100">
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
    orderItem += `<button class="btn btn-success mt-1" onclick="completeOrder('${order._id}')">Complete</button></ul>
        </div>
        </div>
        </div>`;
    table.innerHTML += orderItem;
    total += parseInt(order.total);
  });
  document.getElementById("todayTotal").innerHTML = `$${total}`;
})();

const refresh = () => {
  if (window.location.pathname.includes("kitchen.html")) {
    document.getElementById("accordionExample").innerHTML = "";
    main();
  }
};
setInterval(refresh, 15000);
