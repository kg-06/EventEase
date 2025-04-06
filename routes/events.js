const express=require('express');
const router=express.Router();
const AppError=require('../utilis/AppError');

let events=[];

router.get('/',(req,res)=>{
    res.json(events);
});

router.get('/:id',(req,res,next)=>{
    const event=events.find(e=>e.id==req.params.id);
    event?res.json(event):next(new AppError("Event not found",404));
});

router.post('/',(req,res,next)=>{
    const{id,name,date}=req.query;
    if(!id||!name||!date){
        return next(new AppError("Missing required fields",400));
    }
    const existingEvent=events.find(e=>e.id==id);
    if(existingEvent){
        return next(new AppError("Event already exist at this id!",400));
    }
    events.push({id,name,date});
    res.json({message:"Event added",events});
});

router.put('/:id',(req,res,next)=>{
    let event=events.find(e=>e.id==req.params.id);
    if(!event)return next(new AppError("Event not found",404));

    const {name,date}=req.query;
    if(name) event.name=name;
    if(date) event.date=date;

    res.json({message:"Event updated!",event});
});

router.delete('/:id',(req,res,next)=>{
    let event=events.find(e=>e.id==req.params.id);
    if(!event)return next(new AppError("Event not found",404));
    events=events.filter(e=>e.id!=req.params.id);
    res.json({message:"Event deleted",events});
});

const getEvents = () => events;
module.exports={router,getEvents};
