const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");

const router = express.Router();

// Add menu item
router.post("/menu", auth, role("owner"), async (req, res) => {
  try {
    const item = new MenuItem({
      restaurant: req.user.restaurant,
      name: req.body.name,
      price: req.body.price
    });

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// View orders
router.get("/orders", auth, role("owner"), async (req, res) => {
  const orders = await Order.find({ restaurant: req.user.restaurant }).populate(
    "items.menuItem"
  );
  res.json(orders);
});

// Update order status
router.patch("/orders/:id/status", auth, role("owner"), async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  await order.save();
  res.json(order);
});

module.exports = router;
