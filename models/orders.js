const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    plants:[{
        plantId :{
            type: mongoose.Types.ObjectId,
            ref:'Plants',
            required:true },
        qty:{
            type:Number,
            required:true
        }
    }],
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    totalCost:Number,
    date:String
});

module.exports = mongoose.model('Orders',orderSchema);