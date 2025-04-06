const express=require('express');
const router=express.Router();
const AppError=require('../utilis/AppError');

let users=[];

router.get('/',(req,res)=>{
    res.json(users);
});

router.get('/:id',(req,res,next)=>{
    const user=users.find(u=>u.id==req.params.id);
    user?res.json(user):next(new AppError("User not found!",404));
});

router.post('/',(req,res,next)=>{
    const {id,name}=req.query;
    if(!id ||!name){
        return next(new AppError("Missing required fields!",400));
    }
    const existingUser=users.find(u=>u.id==id);
    if(existingUser){
        return next(new AppError("User already exist on this id!",400));
    }
    users.push({id,name});
    res.json({message: "User added",users});
});

router.put('/:id',(req,res)=>{
    let user=users.find(u=>u.id==req.params.id);
    if(!user)return next(new AppError("User not found",404));
    const{name}=req.query;

    user.name=name;
    res.json({message:"User updated",user});
});

router.delete('/:id',(req,res)=>{
    let user=users.find(u=>u.id==req.params.id);
    if(!user)return next(new AppError("User not found",404));
    users=users.filter(u=>u.id!=req.params.id);
    res.json({message:"User deleted",users});
});

const getUsers = () => users;
module.exports={router, getUsers};

