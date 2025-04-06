const express=require('express');
const router=express.Router();
const AppError=require('../utilis/AppError');
const User=require('../models/user');


router.get('/',async(req,res,next)=>{
  try{
    const users=await User.find();
    res.json({success:true,data:users});
  }catch(err){
    next(err);
  }
});

router.get('/:id',async(req,res,next)=>{
    try{
        const user=await User.findOne({id:req.params.id});
        if(!user)return next(new AppError("User not found",404));
        res.json({success:true,data:user});
    }catch(err){
        next(err);
    }
    
});

router.post('/', async (req, res, next) => {
    try {
        const { id, name, email } = req.body;
        if (!id || !name || !email) {
            return next(new AppError("Missing required fields!", 400));
        }

        const existingUser = await User.findOne({ id });
        if (existingUser) {
            return next(new AppError("User already exists with this ID!", 400));
        }

        const newUser = new User({ id, name, email });
        await newUser.save();

        res.status(201).json({ message: "User added", user: newUser });
    } catch (err) {
        next(err);
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const user = await User.findOne({ id: req.params.id });

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        if (name) user.name = name;
        if (email) user.email = email;
        await user.save();

        res.json({ message: "User updated", user });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await User.findOneAndDelete({ id: req.params.id });

        if (!deletedUser) {
            return next(new AppError("User not found", 404));
        }

        const users = await User.find();
        res.json({ message: "User deleted", users });
    } catch (err) {
        next(err);
    }
});


module.exports = router;
