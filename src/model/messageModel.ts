import mongoose, { Schema, Document, ObjectId, Model} from "mongoose";

interface MessageType extends Document{
    owner:ObjectId,
    content:string,
    createdAt:Date
}

const messageSchema:Schema<MessageType>=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"    
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
});

const Message:Model<MessageType>=mongoose.models.Message||mongoose.model<MessageType>("Message",messageSchema);

export default Message;