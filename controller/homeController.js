import Message from "../models/Messages"
import User from "../models/User"

class HomeController {
    async Home(req, res, next) {
        return res.json({ success: 0, msg: "login Failed" })
    }
    async loginSuccess(req, res, next) {
        return res.json({ success: 1, user: req.user, msg: "login Successfully" })
    }
    async logincheck(req, res, next) {
        if (req.isAuthenticated()) {
            return res.json({ success: 1, user: req.user })
        }
        return res.json({ success: 0 })
    }
    async register(req, res, next) {
        const { email, name, password, city } = req.body
        try {
            if (email && password) {
                const user = await User.create({ email, password, name, city });
                return next()
            }
        } catch (err) {
            return res.json({ success: 0, msg: "Register failed" })
        }
    }
    async userlist(req, res, next) {
        try {
            const users = await User.find({})
            return res.json({ success: 1, users })
        } catch (err) {
            return res.json({ success: 0, msg: err.message })
        }
    }
    async find(req, res, next) {
        const { id } = req.params;
        console.log(id)
        try {
            const user = await User.findById(id)
            return res.json({ success: 1, user })
        } catch (err) {
            return res.json({ success: 0, msg: "something went wrong" })
        }
    }
    async getMessages(req, res, next) {
        const { senderId, recevierId } = req.body
        try {
            const messages = await Message.find({})
            return res.json({success:1,messages})
        } catch (err) {
            return res.json({success:0,msg:"something went wrong"})
        }
    }
}

export default new HomeController();