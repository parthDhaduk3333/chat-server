import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    } ,
    recevierId : {
        type:Schema.Types.ObjectId,
        ref:'User'
    } ,
    text : {
        type:String,
        required:true,
    }
},{timestamps:true})

const Message = mongoose.model('Message',messageSchema,'Messages')

export default Message;