const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required:true
    } ,
    email: {
        type: String,
        required: true
    }
},{
    versionKey: false, 
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
    }
    
}    
});

module.exports = mongoose.model('user', userSchema);
