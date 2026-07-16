import mongoose from 'mongoose';

const connect = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully!");
    } catch(error) {
        console.error("Database connection error details:", error);
        process.exit(1);
    }
};

export default connect;