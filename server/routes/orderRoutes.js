const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controller/orderController')
router.post('/booknow',authMiddleware.authUser ,orderController.createOrder);
router.post('/verify-payment', authMiddleware.authUser, orderController.verifyPayment)
router.post('/order-details/:id',authMiddleware.authUser,orderController.getOrderbyId)
router.get('/myorders',authMiddleware.authUser,orderController.getMyOrders);
router.post('/cancel',authMiddleware.authUser,orderController.cancelOrder)
module.exports = router;