const usercontroller=require('../controllers/UserController.js')
const express=require("express")
const verifytoken=require("../controllers/middlewares/verifytoken.js")
const router=express.Router()

router.post('/signup',usercontroller.adduser) 
router.get('/findall',usercontroller.getallusers)
router.post('/login',usercontroller.login)
router.get('/findone/:id',usercontroller.getasingleuser)
router.get('/fetchconstituencyid/:id',usercontroller.fetchconstituencyid)



module.exports=router