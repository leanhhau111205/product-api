const Product = require('../models/productModel');

// @desc    Lấy danh sách tất cả sản phẩm
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy chi tiết 1 sản phẩm theo pid
// @route   GET /api/products/:pid
const getProductByPid = async (req, res) => {
  try {
    const product = await Product.findOne({ pid: req.params.pid });
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Tạo mới sản phẩm
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;

    const existingProduct = await Product.findOne({ pid });
    if (existingProduct) {
      return res.status(400).json({ message: 'Mã sản phẩm (pid) đã tồn tại' });
    }

    const newProduct = await Product.create({ pid, pname, price, quantity });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Cập nhật sản phẩm theo pid
// @route   PUT /api/products/:pid
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { pid: req.params.pid },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Xóa sản phẩm theo pid
// @route   DELETE /api/products/:pid
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ pid: req.params.pid });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa' });
    }
    res.status(200).json({ message: 'Xóa sản phẩm thành công', pid: req.params.pid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductByPid,
  createProduct,
  updateProduct,
  deleteProduct,
};