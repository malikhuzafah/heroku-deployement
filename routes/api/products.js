const express = require("express");
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
const auth = require("../../middlewares/auth");
var { Product } = require("../../models/product");
const admin = require("../../middlewares/admin");

router.get("/", async (req, res) => {
  console.log(req.user);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let products = await Product.find().skip(skipRecords).limit(perPage);
  let total = await Product.countDocuments();
  return res.send({ products, total });
});

router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product with given id ID not present");
    return res.send(product);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

router.put("/:id", validateProduct, auth, admin, async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  return res.send(product);
});

router.delete("/:id", auth, admin, async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});

router.post("/", validateProduct, auth, async (req, res) => {
  let product = new Product(req.body);
  await product.save();
  return res.send(product);
});

module.exports = router;
