 import userModel from "../models/userModel.js "

 //add item user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "userId and itemId are required" });
        }

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};  // If cartData doesn't exist, initialize it.

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ success: true, message: "Item added to cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



 //remove items from user cart
 const removeFromCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Removed From Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }
 }

 //fetchuser  cart data
 const getCart =async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

    }
 }

 export {addToCart, removeFromCart, getCart}
