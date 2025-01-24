// // import Razorpay from "razorpay";
// // import crypto from "crypto";
// // import orderModel from "../models/orderModel.js";

// // const razorpayInstance = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID, 
// //   key_secret: process.env.RAZORPAY_KEY_SECRET, 
// // });

// // export const placeOrder = async (req, res) => {
// //   try {
// //     const { userId, items, amount, address } = req.body;

// //     if (!userId || !items || !amount || !address) {
// //       return res.status(400).json({ message: "All fields are required." });
// //     }

// //     const options = {
// //       amount: amount * 100, 
// //       currency: "INR",
// //       receipt: `receipt_${new Date().getTime()}`,
// //     };

// //     const razorpayOrder = await razorpayInstance.orders.create(options);

// //     const newOrder = new orderModel({
// //       userId,
// //       items,
// //       amount,
// //       address,
// //       status: "Payment Pending",
// //       payment: false,
// //     });

// //     const savedOrder = await newOrder.save();

// //     res.status(200).json({
// //       message: "Order placed successfully.",
// //       orderId: savedOrder._id,
// //       razorpayOrderId: razorpayOrder.id,
// //       amount: options.amount,
// //       currency: options.currency,
// //     });
// //   } catch (error) {
// //     console.error("Error placing order:", error);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // export const verifyPayment = async (req, res) => {
// //   try {
// //     const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

// //     const generatedSignature = crypto
// //       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
// //       .update(`${razorpayOrderId}|${razorpayPaymentId}`)
// //       .digest("hex");

// //     if (generatedSignature !== razorpaySignature) {
// //       return res.status(400).json({ message: "Invalid payment signature." });
// //     }

// //     const order = await orderModel.findById(orderId);
// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found." });
// //     }

// //     order.payment = true;
// //     order.status = "Payment Successful";
// //     await order.save();

// //     res.status(200).json({ message: "Payment verified and order updated successfully." });
// //   } catch (error) {
// //     console.error("Error verifying payment:", error);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };
// import express from "express";
// import crypto from "crypto";
// import axios from "axios";

// const router = express.Router();

// // Environment variables (replace with your actual credentials)
// const { PHONEPE_MERCHANT_ID, PHONEPE_SALT_KEY, PHONEPE_SALT_INDEX } = process.env;

// // Generate Payment Request
// router.post("/", async (req, res) => {
//   const { amount } = req.body; // Amount in INR (e.g., 100.00)

//   const payload = {
//     merchantId: PHONEPE_MERCHANT_ID,
//     transactionId: `TXN_${Date.now()}`, // Unique transaction ID
//     amount: amount * 100, // Convert to paisa (required by PhonePe)
//     merchantUserId: "user123", // User ID
//     redirectUrl: "http://localhost:3000/payment/success", // Redirect on success
//     callbackUrl: "http://localhost:4000/api/order/callback", // Webhook for status
//   };

//   const payloadString = JSON.stringify(payload);
//   const checksum = crypto
//     .createHmac("sha256", PHONEPE_SALT_KEY)
//     .update(payloadString)
//     .digest("base64");

//   try {
//     const response = await axios.post(
//       "https://api.phonepe.com/apis/hermes/pg/v1/pay",
//       payloadString,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-VERIFY": `${checksum}###${PHONEPE_SALT_INDEX}`,
//         },
//       }
//     );

//     if (response.data.success) {
//       res.json({ paymentUrl: response.data.data.paymentUrl });
//     } else {
//       res.status(400).json({ error: response.data.message });
//     }
//   } catch (error) {
//     console.error("Error initiating payment:", error);
//     res.status(500).json({ error: "Payment initiation failed" });
//   }
// });

// // Payment Callback
// router.post("/callback", (req, res) => {
//   const receivedData = req.body;

//   // TODO: Verify checksum and update order status in the database
//   console.log("Payment Callback Received:", receivedData);

//   res.sendStatus(200); // Acknowledge receipt of the callback
// });

// export default router;
