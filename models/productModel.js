const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    pid: {
      type: String,
      required: [true, 'Vui lòng nhập mã sản phẩm (pid)'],
      unique: true,
      trim: true,
    },
    pname: {
      type: String,
      required: [true, 'Vui lòng nhập tên sản phẩm (pname)'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Vui lòng nhập giá sản phẩm'],
      min: 0,
    },
    quantity: {
      type: Number,
      required: [true, 'Vui lòng nhập số lượng'],
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);