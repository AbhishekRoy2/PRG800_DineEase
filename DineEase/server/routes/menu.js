const express = require("express");
const menu = require("../controllers/menu");
const router = express.Router();
const Auth = require("../middleware/is-auth");

router.get("/menu", menu.getMenu);

router.post("/menu", menu.addItems);

router.post("/orders", menu.postOrder);

router.get("/orders", menu.getOrders);

router.get("/todayOrders", menu.getTodayOrders);

router.get("/pendingOrders", menu.getPendingOrder);

router.put("/completeOrder/:id", menu.completeOrder);

module.exports = router;
