const constituencycontroller=require('../controllers/constituencycontroller.js')
const express=require("express")
const verifytoken=require("../controllers/middlewares/verifytoken.js")

const router=express.Router()

router.post('/addconstituency',verifytoken,constituencycontroller.addconstituency)
router.get('/getallconstituency',constituencycontroller.getall)
module.exports=router