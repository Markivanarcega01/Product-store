import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error.message);
    return res
      .status(404)
      .json({ success: false, message: "cannot access the products list" });
  }
};

const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(`Error in creating product: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "Missing Id" });
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: "Missing Id" });
  }

  try {
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(error.message);
    return res
      .status(404)
      .json({ success: false, message: "product not found" });
  }
};

export { getProducts, createProduct, updateProduct, deleteProduct };
