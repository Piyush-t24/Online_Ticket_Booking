const orderModel = require('../db/models/orderModel');

module.exports.createOrder = async (obj) => {
    if (!obj) {
        return { error: 'Please provide all the details' };
    }
    try {
        const order = await orderModel.create(obj);
        return order;
    } catch (error) {
        throw new Error("unable to create order");
    }
}

module.exports.updateOrderStatus = async (rzpid, sts) => {
    if (!rzpid || !sts) {
        return { error: 'Please provide both order number and status' };
    }
    try {
        const updatedOrder = await orderModel.findOneAndUpdate(
            { orderNum: rzpid },
            { Paymentstatus: sts },
            { new: true }
        );
        return updatedOrder;
    } catch (error) {
        throw new Error("unable to update order status");
    }
}
module.exports.getOrderById = async (id)=>{
    if(!id){
        throw new Error("ID dne");
        
    }
    try{
        const order = await orderModel.findById({_id: id});
        if(!order){
            throw new Error("order doesnot exist");
        }
        console.log(order)
        return order;
    }catch(e){
        throw e;
        
    }
}
module.exports.getOrderByUserId = async (_id)=>{
    if(!_id){
        throw new Error("ID dne");
        
    }
    try {
        const orders = await orderModel.find({ userId: _id }).select("tickets _id venueId slotId receiptId amount typeOfOrder orderNum paymentstatus")
        .populate("slotId","slots date") 
        .populate("venueId","location workingHours name phNo email");
        if (!orders.length) {
            throw new Error("No orders found for this user");
        }
        return orders;
    } catch (error) {
        throw error;
    }
}
module.exports.cancelOrder = async (orderId)=>{

}