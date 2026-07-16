import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    name:{
        type:String ,
        required :[true , "Course name is required"],
        trim : true
    },
    level:{
        type : String,
        required :[true, "Select course level"],
        enum: ['Beginner', 'Intermediate', 'Advanced']

    },
    description :{
        type:String,
        required :[true, "course decription is required"]
    },
    image :{
        type : String,
        required :[true, 'course image is required']
    }
},{timestamps : true});


export default mongoose.model('Course' , CourseSchema);