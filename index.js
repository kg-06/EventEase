const express= require('express');
const morgan= require('morgan');
require('dotenv').config();
const port= process.env.PORT || 3000;
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

const {router:eventsRoutes}=require('./routes/events');
const {router:userRoutes}=require('./routes/users');
const assignmentRoutes=require('./routes/assignments');

app.use('/events', eventsRoutes);
app.use('/users',userRoutes);
app.use('/assignments',assignmentRoutes);

app.get('/',(req,res)=>{
    res.send("EventEase is running!");
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success:false,
        message: err.message || 'Something went wrong!',
    });
});

