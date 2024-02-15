const votecontroller=require('../controllers/votecontroller.js')
const express=require("express")
const verifytoken=require("../controllers/middlewares/verifytoken.js")
const router=express.Router()

router.post('/votedone',verifytoken,votecontroller.addvote)
router.get('/isvotecasted/:id',votecontroller.isvotecasted)
router.get('/electionresult/:id',votecontroller.electionresult)
router.get('/winner/:id',votecontroller.winner)
router.post('/transfer',verifytoken,votecontroller.transfertohistory)
module.exports=router