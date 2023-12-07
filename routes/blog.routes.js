const express=require("express")
const{BlogModel}=require("../model/blog.model")
const {auth}=require("../middleware/auth.middleware")

const blogRouter=express.Router();
blogRouter.use(express.json())

blogRouter.use(auth)


blogRouter.get("/",async(req,res)=>{

    try {
        const blog=await BlogModel.find({username:req.body.username})
        res.status(200).send(blog)

        
    } catch (error) {
        res.status(400).send(error)
    }
})


blogRouter.post("/create",async(req,res)=>{

    try {
        const blog=new BlogModel(req.body)
        await blog.save();
        res.status(200).send({"msg":"new blog hs been created","new_blog":blog})

        
    } catch (error) {
        res.status(400).send(error)
    }
})


blogRouter.patch("/update/:blogId",async(req,res)=>{

    const{blogId}=req.params;
    const blog=await BlogModel.findOne({_id:blogId})

    try {
        if(req.body.userId==blog.userId){
            await BlogModel.findByIdAndUpdate({_id:blogId},req.body);
            res.status(200).send({"msg":`The blog with id ${blogId} has been updated`})
        }
        else{
            res.status(200).send({"msg":"you are not authorized"})
        }

        
    } catch (error) {
        res.status(400).send(error)
    }
})


blogRouter.delete("/delete/:blogId",async(req,res)=>{

    const{blogId}=req.params;
    const blog=await BlogModel.findOne({_id:blogId})

    try {
        if(req.body.userId==blog.userId){
            await BlogModel.findByIdAndDelete({_id:blogId});
            res.status(200).send({"msg":`The blog with id ${blogId} has been deleted`})
        }
        else{
            res.status(200).send({"msg":"you are not authorized"})
        }

        
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports={
    blogRouter
}