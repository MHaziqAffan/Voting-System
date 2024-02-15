const express =require('express')
const cors =require('cors')
const app=express()
const UserRouter=require('./routes/UserRouter')
const CanidateRouter=require('./routes/CanidateRouter.js')
const PartyRouter=require('./routes/PartyRouter.js')
const ElectionRouter=require('./routes/ElectionRouter.js')
const ConstituencyRouter=require('./routes/ConstituencyRouter.js')
const VoteRouter=require('./routes/VoteRouter.js')
const fileupload=require('express-fileupload')
var corOptions={
    origin:'https://localhost:8081'
}

//middlewares
app.use(cors())
app.use(fileupload({useTempFiles:true}))
app.use(express.json())
// app.use(express.urlencoded({extended:false}))
app.use('/user',UserRouter)
app.use('/canidate',CanidateRouter)
app.use('/party',PartyRouter)
app.use('/constituency',ConstituencyRouter)
app.use('/election',ElectionRouter)
app.use('/vote',VoteRouter)

const PORT =process.env.PORT||8080

app.listen(PORT,()=>{console.log(`port connected with port ${PORT}`)})
console.log("----------------------------------------------------")
console.log("Hi Haziq Finally you are connected to our DataBase")
console.log("----------------------------------------------------")
