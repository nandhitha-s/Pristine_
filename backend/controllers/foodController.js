import foodmodel from "../models/foodmodel.js";
import  fs from "fs";

const addFood  = async (req,res)=>{
    let image_filename = `${req.file.filename}`
    const food  = new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"error in adding the food"})
    }
}

const listFood = async (req,res)=>{
    try{
        const foods = await foodmodel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error in listing"})
    }
}

const removeFood = async (req,res)=>{
    try{
        const food = await foodmodel.findById(req.body.id);
        if (!food) {
            
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food removed"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error in removing"})

    }
}
export {addFood , listFood, removeFood}
