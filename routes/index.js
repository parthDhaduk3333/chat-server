import express from 'express';
import homeController from '../controller/homeController';
import passport from 'passport'
const routes = express.Router();

routes.get("/", homeController.Home)
routes.post('/login', passport.authenticate('local', { failureRedirect: "/" }), homeController.loginSuccess)
routes.get('/logincheck',homeController.logincheck)
routes.post('/register', homeController.register, passport.authenticate('local', { failureRedirect: "/" }), (req, res, next) => res.json({ success: 1, msg: "Register successfully", user:req.user }))
routes.get('/userlist',homeController.userlist)
routes.get('/finduser/:id',homeController.find)
routes.post('/getmessages',homeController.getMessages)

export default routes;