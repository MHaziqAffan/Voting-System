const electioncontroller = require("../controllers/electioncontroller.js");
const verifytoken=require("../controllers/middlewares/verifytoken.js")
const express = require("express");
const router = express.Router();

router.get('/getallelections',electioncontroller.fetchelections)
router.post("/createelection",verifytoken, electioncontroller.createelection);
module.exports=router