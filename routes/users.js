const express=require('express');
const router=express.Router();

let users=[];

router.get('/',(req,res)=>{
    res.json(users);
});

router.get('/:id',(req,res)=>{
    const user=users.find(u=>u.id==req.params.id);
    user?res.json(user):res.status(404).json({message:"User not found!"});
});

router.post('/',(req,res)=>{
    const {id,name}=req.query;
    if(!id ||!name){
        return res.status(400).json({message:"Missing required fields!"});
    }
    const existingUser=users.find(u=>u.id==id);
    if(existingUser){
        return res.status(400).json({message:"User already exist on this id!"});
    }
    users.push({id,name});
    res.json({message: "User added",users});
});

router.put('/:id',(req,res)=>{
    let user=users.find(u=>u.id==req.params.id);
    const{name}=req.query;

    user.name=name;
    res.json({message:"User updated",user});
});

router.delete('/:id',(req,res)=>{
    users=users.filter(u=>u.id!=req.params.id);
    res.json({message:"User deleted",users});
});

const getUsers = () => users;
module.exports={router, getUsers};

