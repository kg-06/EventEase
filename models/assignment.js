const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  eventId: {
    type: Number,
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

module.exports = mongoose.model('Assignment', assignmentSchema);
