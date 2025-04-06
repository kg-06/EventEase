const express=require('express');
const router=express.Router();


let assignments=[];

const usersModule = require('./users');
const eventsModule = require('./events');
const AppError=require('../utilis/AppError');

router.post('/',(req,res,next)=>{
    const{userId,eventId}=req.query;
    if(!userId||!eventId){
        return next(new AppError("Missing userId or eventId !",400));
    }
    
    const users = usersModule.getUsers();
    const events = eventsModule.getEvents();

    const userExists=users.some(user=>user.id==userId);
    if(!userExists){
        return next(new AppError("User ID does not exist!!",400));
    }
    const eventExists=events.some(event=>event.id==eventId);
    if(!eventExists){
        return next(new AppError("Event ID does not exist!!",400));
    }

    const existingAssignment=assignments.find(a=>a.userId==userId && a.eventId==eventId);
    if(existingAssignment){
        return next(new AppError("Assignment already exists..",400));
    }

    assignments.push({userId,eventId});
    res.json({message:"Assignment added",assignments})
});

router.get('/',(req,res)=>{
    res.json(assignments);
});

router.get('/organizer/:userId',(req,res,next)=>{
    const userId=req.params.userId;
    const assignedEvents=assignments.filter(a=>a.userId==userId);

    if(assignedEvents.length==0){
        return next(new AppError("No events found for this organizer!",404));
    }

    res.json(assignedEvents);
});

router.get('/event/:eventId',(req,res,next)=>{
    const eventId=req.params.eventId;
    const assignedOrganizers=assignments.filter(a=>a.eventId==eventId);

    if(assignedOrganizers.length==0){
        return next(new AppError("No Organizers found for this event!",404));
    }
    res.json(assignedOrganizers);
});

router.delete('/organizer/:userId',(req,res,next)=>{
    const userId=req.params.userId;
    const intialLength=assignments.length;
    assignments=assignments.filter(a=>a.userId!=userId);

    if(assignments.length===intialLength){
        return next(new AppError("No assignments found for this user!",404));
    }

    res.json({message:"All assignments for this user is deleted",assignments});

});

router.delete('/event/:eventId',(req,res,next)=>{
    const eventId=req.params.eventId;
    const intialLength=assignments.length;
    assignments=assignments.filter(a=>a.eventId!=eventId);

    if(assignments.length==intialLength){
        return next(new AppError("No assignments found for this event!",404));
    }

    res.json({message:"All assignments for this event are deleted!",assignments});
});

router.delete('/',(req,res,next)=>{
    const {userId,eventId}=req.query;
    if(!userId||!eventId){
        return next(new AppError("Missing userId or eventId",400));
    }

    const intialLength=assignments.length;
    assignments=assignments.filter(a=>!(a.userId==userId && a.eventId==eventId));

    if(assignments.length==intialLength){
        return next(new AppError("Assignment not found",404));
    }

    res.json({message:"Assignment deleted",assignments});
});

module.exports=router;