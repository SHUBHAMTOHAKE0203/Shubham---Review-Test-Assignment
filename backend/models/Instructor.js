import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema ({
    name :{
        type: String,
        required :[true, "Instructor name is require"],
        trim: true
    },
    email :{
        type :String,
        required :[true, "Email is required"],
        unique :true,
        trim : true,
        lowercase:true
    }
} , {timestamps : true});


export default mongoose.model('Instructor', instructorSchema);