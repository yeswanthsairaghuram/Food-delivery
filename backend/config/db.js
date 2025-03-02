import mongoose from "mongoose";

export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://yaswanthsairaghuram:ePiHhGhkX0OaIgzH@cluster0.oknn4.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}