const express= require('express');
const morgan= require('morgan');
require('dotenv').config();
const port= process.env.PORT || 3000;
const app=express();
const mongoose=require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('MongoDB connected'))
.catch(err =>{
    console.error('MongoDB connection error:',err);
    process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
const AppError = require('./utilis/AppError');

const eventsRoutes=require('./routes/events');
const userRoutes=require('./routes/users');
const assignmentRoutes=require('./routes/assignments');

app.use('/events', eventsRoutes);
app.use('/users',userRoutes);
app.use('/assignments',assignmentRoutes);

app.get('/',(req,res)=>{
    res.send("EventEase is running!");
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});

app.use((req,res)=>{
    return next(new AppError("Route Not Found",404));
})

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success:false,
        message: err.message || 'Something went wrong!',
    });
});

