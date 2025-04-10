import mongoose from "mongoose";
const coursePurchaseSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Type.ObjectId,
        ref:'Course',
        required:true
    },
    UserId:{
        type:mongoose.Schema.Type.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'completed', 'failed'],
        default:'pending'
    },
    paymentId:{
        type:String,
        required:true
    }

},{timestamps:true});

export const CoursePurchase = mongoose.model('CoursePurchase', coursePurchaseSchema);