const express= require('express');
const app=express();
const PORT=3000;

app.use(express.json());

const {router:eventsRoutes}=require('./routes/events');
const {router:userRoutes}=require('./routes/users');
const assignmentRoutes=require('./routes/assignments');

app.use('/events', eventsRoutes);
app.use('/users',userRoutes);
app.use('/assignments',assignmentRoutes);

app.get('/',(req,res)=>{
    res.send("EventEase is running!");
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success:false,
        message: err.message || 'Something went wrong!',
    });
});

