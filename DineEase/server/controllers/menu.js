const Item = require("../models/item");
const Order = require("../models/orders");
const Table = require("../models/table");

exports.getMenu = (req, res, next) => {
  console.log("getMenu");
  //get everything from the menu collection mongodb
  //return it as json
  Item.find().then((items) => {
    res.status(200).json({ items: items });
  });
};

exports.postOrder = async (req, res, next) => {
  console.log("postOrder");
  const order = req.body;
  console.log({ order });
  const newOrder = new Order({
    items: order.items,
    extras: order.extras,
    total: order.total,
    status: "pending",
    date: new Date(),
  });
  const savedOrder = await newOrder.save();
  res.status(200).json({ order: savedOrder });
};

exports.getOrders = async (req, res, next) => {
  console.log("getOrders");
  const orders = await Order.find();
  res.status(200).json({ orders: orders });
};

exports.getTables = async (req, res, next) => {
  console.log("getTables");
  const tables = await Table.find();
  res.status(200).json({ tables: tables });
};

exports.getTodayOrders = async (req, res, next) => {
  console.log("getTodayOrders");
  const orders = await Order.find();
  console.log(orders);
  res.status(200).json({ orders: orders });
};

exports.addItems = async (req, res, next) => {
  console.log("addItems");
  const items = req.body;
  console.log({ items });
  const newItems = new Item({
    name: items.name,
    price: items.price,
    description: items.description,
    image: items.image,
  });
  const savedItems = await newItems.save();
  res.status(200).json({ items: savedItems });
};

exports.getPendingOrder = async (req, res, next) => {
  console.log("getPendingOrder");
  const order = await Order.find({
    status: "pending",
  });
  res.status(200).json({ order: order });
};

exports.completeOrder = async (req, res, next) => {
  console.log("completeOrder");
  const id = req.params.id;
  console.log({ id });
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status: "completed" },
    { new: true }
  );
  res.status(200).json({ order: updatedOrder });
};
