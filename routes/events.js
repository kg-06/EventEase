const express=require('express');
const router=express.Router();

let events=[];

router.get('/',(req,res)=>{
    res.json(events);
});

router.get('/:id',(req,res)=>{
    const event=events.find(e=>e.id==req.params.id);
    event?res.json(event):res.status(404).json({message:"Event not found"});
});

router.post('/',(req,res)=>{
    const{id,name,date}=req.query;
    if(!id||!name||!date){
        return res.status(400).json({message:"Missing required fields"});
    }
    const existingEvent=events.find(e=>e.id==id);
    if(existingEvent){
        return res.status(400).json({message:"Event already exist at this id!"});
    }
    events.push({id,name,date});
    res.json({message:"Event added",events});
});

router.put('/:id',(req,res)=>{
    let event=events.find(e=>e.id==req.params.id);
    if(!event)return res.status(404).json({message:"Event not found"});

    const {name,date}=req.query;
    if(name) event.name=name;
    if(date) event.date=date;

    res.json({message:"Event updated!",event});
});

router.delete('/:id',(req,res)=>{
    events=events.filter(e=>e.id!=req.params.id);
    res.json({message:"Event deleted",events});
});

const getEvents = () => events;
module.exports={router,getEvents};
