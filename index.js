import express from 'express';
import { APP_PORT, SESSION_SECRET } from './config';
import routes from './routes';
import './config/db';
import './middlewares/passport'
import passport from 'passport';
import session from 'express-session';
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io';
import Actions from '../client/src/Actions';
import Message from './models/Messages';
import User from './models/User';
import Socket from './models/Sockets';
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(session({
    name: "user",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    credentials: true,
    origin: ['http://192.168.29.218:3000', 'http://localhost:3000'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const users = {};
const msgs = []
io.on('connection', (socket) => {
    console.log('New Client Connected')
    socket.on(Actions.JOIN, ({ recevierId }) => {
        const join = async () => {
            try {
                await Socket.create({ user: recevierId, socketId: socket.id })
                await User.findByIdAndUpdate(recevierId,{online:true})
            } catch (err) {
                console.log("something went wrong in socket create", err.message)
            }
        }
        join()
        socket.broadcast.emit(Actions.JOINED,{})
        // User.findByIdAndUpdate(resiverId,{online:true})
    })
    socket.on(Actions.MSG, (data) => {
        const message = async () => {
            await Message.create(data)
            const messages = await Message.find({ senderId: data.senderId, recevierId: data.recevierId })
            const sockets = await Socket.findOne({ user: data.recevierId })
            console.log(sockets)
            socket.to(sockets.socketId).emit(Actions.MSG, messages)
        }
        message();
    })
    // socket.on(Actions.TYPE, ({ senderId, recevierId }) => {
    //     socket.to(users[resiverId]).emit(Actions.TYPE,{senderId,recevierId})
    // })
    socket.on('disconnecting', () => {
        socket.broadcast.emit(Actions.JOINED, {})
        const leave = async () => {
            try {
                const deleted = await Socket.findOneAndDelete({ socketId: socket.id })
                await User.findByIdAndUpdate(deleted.user,{online:false})
            } catch (err) {
                console.log("something went wrong in removeing data from socket")
            }
        }
        leave()
    })
})
server.listen(APP_PORT, () => {
    console.log(`Your server is runnig on port ${APP_PORT}`);
})