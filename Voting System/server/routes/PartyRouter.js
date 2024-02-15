const partycontroller=require('../controllers/partyController.js')
const express=require("express")
const verifytoken=require("../controllers/middlewares/verifytoken.js")

const router=express.Router()

router.post('/addparty',verifytoken,partycontroller.addparty)
router.get('/getallparty',partycontroller.getallparty)
module.exports=router