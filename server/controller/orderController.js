const razorpayInstance = require("../controller/razorpay");
const crypto = require("crypto");
const orderService = require("../services/orderService");
const userModel = require("../db/models/userModel");
const venueService = require("../services/venueService");
const slotting = require("../services/slotting");
const slotModel = require("../db/models/slotModel");
const mongoose = require("mongoose");
function generateUniqueId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let id = "";

  // Generate the first 4 letters
  for (let i = 0; i < 4; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate the next 3 numbers
  for (let i = 0; i < 3; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  // Generate the last letter
  id += letters.charAt(Math.floor(Math.random() * letters.length));

  return id;
}
module.exports.createOrder = async (req, res) => {
  const { venueId, slotId, tickets } = req.body;
  const email = req.user.email;
  let totalSum = 0;
  console.log(tickets);
  Object.values(tickets).forEach((value) => {
    totalSum += value;
  });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Get user details
    const user = await userModel
      .findOne({ email })
      .select("_id")
      .session(session);
    if (!user) {
      throw new Error("User not found.");
    }

    // Get venue details
    const venue = await venueService.getVenuebyId(venueId);
    if (!venue) {
      throw new Error("Venue not found.");
    }

    // Calculate the total amount
    const amount =
      (tickets.indianAdult || 0) * venue.fare.indianAdult +
      (tickets.indianChild || 0) * venue.fare.indianChild +
      (tickets.foreignAdult || 0) * venue.fare.foreignAdult +
      (tickets.foreignChild || 0) * venue.fare.foreignChild;

    // Check slot availability
    const available = await slotting.checkAvailabilty(slotId);
    if (!available) {
      throw new Error("No slot available.");
    }

    // Reserve slot temporarily
    const slot = await slotModel.findOneAndUpdate(
      { _id: slotId },
      { $inc: { currentBookings: totalSum } },
      { new: true, session }
    );

    if (!slot || slot.currentBookings > slot.maxCapacity) {
      throw new Error("Slot overbooked.");
    }

    const orderNumber = generateUniqueId();
    let order;

    if (amount === 0) {
      const freeOrder = {
        userId: user._id,
        venueId: venueId,
        slotId: slotId,
        tickets: tickets,
        orderNum: orderNumber,
        amount: amount,
        Paymentstatus: "free", // Set status as 'created'
        typeOfOrder: "free",
      };

      order = await orderService.createOrder(freeOrder);
      await session.commitTransaction();
      session.endSession();
      return res.status(201).json({ message: "Order Created", order });
    } else {
      const options = {
        amount: amount * 100, // Convert amount to smallest currency unit (paise)
        currency: "INR",
        receipt: orderNumber,
        payment_capture: 1,
      };

      const razorpayOrder = await razorpayInstance.orders.create(options);

      const newOrder = {
        userId: user._id,
        venueId: venueId,
        slotId: slotId,
        tickets: tickets,
        orderNum: razorpayOrder.id,
        amount: amount,
        receiptId: razorpayOrder.receipt,
        Paymentstatus: "payment pending", // Initial status as 'created'
        typeOfOrder: "not-free",
      };

      const order = await orderService.createOrder(newOrder);
      console.log(order);
      await session.commitTransaction();
      session.endSession();

      return res.json({
        razorpay_order_id: razorpayOrder.id,
        userId: user._id,
        venueId,
        amount,
        _id: order._id,
      });
    }
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    // Payment is verified, now update the order status in the database
    const order = await orderService.updateOrderStatus(
      razorpay_order_id,
      "paid || confirmed"
    );

    if (order) {
      res.json({ success: true, message: "Payment Verified. Order Created." });
    } else {
      res.status(400).json({ success: false, message: "Order not found." });
    }
  } else {
    res
      .status(400)
      .json({ success: false, message: "Payment Verification Failed." });
  }
};
module.exports.getOrderbyId = async (req, res) => {
  const order_id = req.params.id;
  console.log(order_id);
  if (!order_id) {
    res.status(400).json("NO ID PROVIDED");
  }
  try {
    const order = await orderService.getOrderById(order_id);

    res.status(200).json({ order });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
module.exports.getMyOrders = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  try {
    const orders = await orderService.getOrderByUserId(userId);
    if (!orders) {
      res.status(400).json({ message: "Unable to get the details" });
    }
    res.status(200).json({ orders });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
module.exports.cancelOrder = async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.body;
  if (!userId || !orderId) res.status(400).json({ message: "invalid request" });
  try {
    const order = await orderService.getOrderById(orderId);
    if (order.userId === userId) {
      //order service.cancel order
    }
  } catch (error) {
    throw error;
  }
};
