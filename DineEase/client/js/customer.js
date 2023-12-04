const selectedItem = {
  name: "",
  price: 0,
  quantity: 0,
  total: 0,
  id: "",
};

const selectedItems = [];
let menu = [];
let table = [];
let selectedtable = 0;
const getMenu = async () => {
  await fetch(`${api_path}menu`)
    .then((res) => res.json())
    .then((data) => {
      menu = data.items;
      console.log(menu);
    })
    .catch((err) => {
      console.log(err);
    });
};

const increment = (id) => {
  console.log(id);
  selectedItems.forEach((item) => {
    if (item.id === id) {
      item.quantity++;
      item.total = item.quantity * item.price;
      document.getElementById(`${id}-count`).innerText = item.quantity;
    }
  });
};

const decrement = (id) => {
  selectedItems.forEach((item) => {
    if (item.id === id) {
      item.quantity--;
      item.total = item.quantity * item.price;
      document.getElementById(`${id}-count`).innerText = item.quantity;
    }
  });
};

const getTable = () => {
  fetch(`${api_path}table`)
    .then((res) => res.json())
    .then((data) => {
      table = data.table;
      console.log(data);
    });
};

const generateBill = () => {
  const bill = [];
  selectedItems.forEach((item) => {
    if (item.quantity > 0) {
      bill.push(item);
    }
  });
  //limit total to 2 decimal places
  const total = bill.reduce((acc, item) => acc + item.total, 0);
  document.getElementById("billBody").innerHTML = "";
  bill.forEach((item) => {
    const billItem = `<tr>
        <th scope="row">${item.name}</th>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>$${item.total}</td>
      </tr>`;
    document.getElementById("billBody").innerHTML += billItem;
  });
  const afterTax = total + total * 0.1;
  document.getElementById("subTotal").innerText = `$${total.toFixed(2)}`;
  document.getElementById("total").innerText = `$${afterTax.toFixed(2)}`;
};

const saveBill = () => {
  const bill = [];
  selectedItems.forEach((item) => {
    if (item.quantity > 0) {
      bill.push(item);
    }
  });
  const total = bill.reduce((acc, item) => acc + item.total, 0);
  const afterTax = total + total * 0.1;
  console.log(bill, total, afterTax);
  const data = {
    items: bill,
    total,
  };
  if (bill.length > 0) {
    fetch(`${api_path}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
      // alert("Bill Saved");
      // socket.emit("newOrder", {
      //   data,
      // });
      // location.reload();
      refresh();
    });
  } else {
    alert("Please select items");
  }
};

(main = async () => {
  await getMenu();
  menu.forEach((item) => {
    const menuItem = `<div class="card m-2" style="width: 10rem">
    <img
      src="../images/${item.image}"
      class="card-img-top"
      style="width: 100% !important; height: 10rem !important;"
    />
    <div class="card-body">
      <div class="d-flex justify-content-between mb-2">
        <span class="fs-bolder">${item.name}</span>
        <span class="fs-bolder">$${item.price}</span>
      </div>
      <div
        class="btn-group w-100"
        role="group"
        aria-label="Basic example"
      >
        <button type="button" class="btn btn-primary" onclick="decrement('${item._id}')">
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
        </button>
        <button type="button" class="btn btn-primary" id="${item._id}-count">0</button>
        <button type="button" class="btn btn-primary" onclick="increment('${item._id}')">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>`;
    document.getElementById("menu").innerHTML += menuItem;
    selectedItems.push({
      name: item.name,
      price: item.price,
      quantity: 0,
      total: 0,
      id: item._id,
    });
  });

  getTable();
  table.forEach((item) => {
    const tab = `<option value="${item.name}">${item.name}</option>`;
    document.getElementById("tableItems").innerHTML += tab;
  });
})();

const refresh = () => {
  document.getElementById("menu").innerHTML = "";
  main();
  document.getElementById("billBody").innerHTML = "";
};
