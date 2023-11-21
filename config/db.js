import mongoose from 'mongoose';
import { MONGOOSE_CONNECT } from '.';
mongoose.connect(MONGOOSE_CONNECT)

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Something went wrong in database connection"))
db.once('open',() => {
    console.log("Database connected")
})

export default db;