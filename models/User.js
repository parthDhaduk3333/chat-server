import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type:String,
        required:true,
    } ,
    email : {
        type:String,
        required:true,
    } ,
    password : {
        type:String,
        required:true,
    } ,
    city : {
        type:String,
        required:true,
    },
    online : {
        type:Boolean,
        required:true,
        default:false
    }
})

const User = mongoose.model('User',userSchema,'users');

export default User