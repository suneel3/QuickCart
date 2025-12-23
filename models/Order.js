import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // Clerk userId
  },

  items: [
    {
      product: {
        type: String,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  amount: {
    type: Number,
    required: true,
  },

  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },

  status: {
    type: String,
    default: "Order Placed",
  },

  date: {
    type: Number,
    default: Date.now,
  },
});

const Order =
  mongoose.models.Order || mongoose.model("order", orderSchema);

export default Order;
