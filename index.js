const express=require("express");
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const{blogRouter}=require("./routes/blog.routes")
require("dotenv").config()
const cors=require("cors")





 
const app=express();
app.use(cors());
// app.use(express.json())


app.use("/user",userRouter)
app.use("blogs",blogRouter)




app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Server is connected to DB")
        console.log("Server is running ar port 8080")
        
    } catch (error) {
        console.log("error")
    }
})

