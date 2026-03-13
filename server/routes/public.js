const express = require("express");
const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

// List restaurants
router.get("/restaurants", async (req, res) => {
  const data = await Restaurant.find();
  res.json(data);
});

// Menu of a restaurant
router.get("/menu/:id", async (req, res) => {
  const menu = await MenuItem.find({
    restaurant: req.params.id,
    available: true
  });
  res.json(menu);
});

module.exports = router;
