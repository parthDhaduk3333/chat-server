import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const socketSchema = new Schema({
    user : {
        type:Schema.Types.ObjectId,
        ref:"User",
        unique:true
    } ,
    socketId: {
        type : String,
        required:true,
    }
})

const Socket = mongoose.model('Socket',socketSchema,'Sockets')

export default Socket ;