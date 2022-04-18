const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomtype:{ type: String, required: true},
    from:{type:Date,required:true},
    to:{type:Date,required:true},
    breakfast:{type:String,required:true},
    airconditioner:{type:Boolean,required:true,default:false},
    wakeupservice:{type:Boolean,required:true,default:false}
});

module.exports = mongoose.model('Room', roomSchema);
