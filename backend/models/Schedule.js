import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required : true
    },
    instructor :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Instructor',
        required:true
    },
    batchName :{
        type:String,
        required :[true, "Enter Batch Name , its required"],
        trim:true
    },
    date :{
        type:Date,
        required :[true, 'Date required'],
    }
} ,{timestamps :true});


scheduleSchema.index({instructor:1, date:1}, {unique:true});

export default  mongoose.model('Schedule', scheduleSchema);