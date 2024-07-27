import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from 'bcrypt';
import randomcolor from 'randomcolor';

interface UserType extends Document {
    username: string;
    email: string;
    password: string;
    avatar: string;
    otp:string;
    otpExpiry:Date;
    isVerified:boolean;
    fallBackColour:string;
    isAvatarSet:boolean;
    AuthId?:string;
}

const userSchema: Schema<UserType> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Please use a valid email"],
        index: true    
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    otp:{
        type:String,
        required:[true,'OTP is required']     
    },
    otpExpiry:{
        type:Date,
        required:[true,'OTP expiry is required']
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    fallBackColour:{
        type:String,
        default:randomcolor({
            format:"hex"
        })
    },
    isAvatarSet:{
        type:Boolean,
        default:false
    },
    AuthId:{
        type:String
    }
    
},{timestamps:true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User: Model<UserType> = mongoose.models.User||mongoose.model<UserType>("User", userSchema);

export default User;
