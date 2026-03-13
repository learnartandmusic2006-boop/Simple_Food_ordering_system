const express = require("express");
const auth = require("../middleware/auth");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");

const router = express.Router();

// Place order
router.post("/order", auth, async (req, res) => {
  const { items } = req.body;

  const fullItems = await Promise.all(
    items.map(async (it) => {
      const m = await MenuItem.findById(it.menuItem);
      return { menuItem: m._id, qty: it.qty, price: m.price };
    })
  );

  const total = fullItems.reduce((sum, x) => sum + x.price * x.qty, 0);

  const order = new Order({
    customer: req.user._id,
    restaurant: fullItems[0] ? (await MenuItem.findById(fullItems[0].menuItem)).restaurant : null,
    items: fullItems,
    total
  });

  await order.save();
  res.json(order);
});

// Customer: view own orders
router.get("/orders", auth, async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).populate(
    "items.menuItem"
  );
  res.json(orders);
});

module.exports = router;
