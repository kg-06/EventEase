const express=require('express');
const router=express.Router();


let assignments=[];

const usersModule = require('./users');
const eventsModule = require('./events');

router.post('/',(req,res)=>{
    const{userId,eventId}=req.query;
    if(!userId||!eventId){
        return res.status(400).json({message:"Missing userId or eventId !"});
    }
    
    const users = usersModule.getUsers();
    const events = eventsModule.getEvents();

    const userExists=users.some(user=>user.id==userId);
    if(!userExists){
        return res.status(400).json({message:"User ID does not exist!!"});
    }
    const eventExists=events.some(event=>event.id==eventId);
    if(!eventExists){
        return res.status(400).json({message:"Event ID does not exist!!"});
    }

    const existingAssignment=assignments.find(a=>a.userId==userId && a.eventId==eventId);
    if(existingAssignment){
        return res.status(400).json({message:"Assignment already exists.."});
    }

    assignments.push({userId,eventId});
    res.json({message:"Assignment added",assignments})
});

router.get('/',(req,res)=>{
    res.json(assignments);
});

router.get('/organizer/:userId',(req,res)=>{
    const userId=req.params.userId;
    const assignedEvents=assignments.filter(a=>a.userId==userId);

    if(assignedEvents.length==0){
        return res.status(404).json({message:"No events found for this organizer!"});
    }

    res.json(assignedEvents);
});

router.get('/event/:eventId',(req,res)=>{
    const eventId=req.params.eventId;
    const assignedOrganizers=assignments.filter(a=>a.eventId==eventId);

    if(assignedOrganizers.length==0){
        return res.status(404).json({message:"No Organizers found for this event!"});
    }
    res.json(assignedOrganizers);
});

router.delete('/organizer/:userId',(req,res)=>{
    const userId=req.params.userId;
    const intialLength=assignments.length;
    assignments=assignments.filter(a=>a.userId!=userId);

    if(assignments.length===intialLength){
        return res.status(404).json({message:"No assignments found for this user!"});
    }

    res.json({message:"All assignments for this user is deleted",assignments});

});

router.delete('/event/:eventId',(req,res)=>{
    const eventId=req.params.eventId;
    const intialLength=assignments.length;
    assignments=assignments.filter(a=>a.eventId!=eventId);

    if(assignments.length==intialLength){
        return res.status(404).json({message:"No assignments found for this event!"});
    }

    res.json({message:"All assignments for this event are deleted!",assignments});
});

router.delete('/',(req,res)=>{
    const {userId,eventId}=req.query;
    if(!userId||!eventId){
        return res.status(400).json({message:"Missing userId or eventId"});
    }

    const intialLength=assignments.length;
    assignments=assignments.filter(a=>!(a.userId==userId && a.eventId==eventId));

    if(assignments.length==intialLength){
        return res.status(404).json({message:"Assignment not found"});
    }

    res.json({message:"Assignment deleted",assignments});
});

module.exports=router;