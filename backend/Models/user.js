const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    fullName : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true
    },
    tel : {
        type: Number,
        required : true,
        trim: true
    },
    password: {
        type: String,
        required : true,
        trim: true
    },
    confirmPassword: {
        type:String,
        required: true,
        trim:true
    },
    role :{
        type:String,
        enum : ["patient", "doctor", "admin"],
        default : "patient",
    },
    // Doctor specific fields
    department: {
        type: String,
        trim: true
    },
    experience: {
        type: String,
        trim: true
    },
    availableTime: {
        type: String,
        trim: true
    },
    // Patient specific fields
    dateOfBirth: {
        type: Date
    }

},
    {timestamps : true}
);

module.exports = mongoose.model("user", userSchema);