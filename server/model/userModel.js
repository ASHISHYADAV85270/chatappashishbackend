import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    useremail: {
        type: String,
        required: true,
        unique: true,
    },
    userpassword: {
        type: String,
        required: true,
        unique: true,
        select: false,
    },
    isAvataImageSet: {
        type: Boolean,
        default: false,
    },
    avataImage: {
        type: String,
        default: "",
    }

});


export const userModel = mongoose.model("chatappdata", userSchema);