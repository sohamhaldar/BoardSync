import mongoose, { Schema, Document, ObjectId, Model } from "mongoose";

interface memberType {
    id: ObjectId,
    position: string
}

interface chatMessageType {
    workspaceId: string,
    username: string,
    avatar: string,
    message: string,
    fallBackColour: string
}

interface workspaceType extends Document {
    name: string,
    description: string,
    owner: ObjectId,
    board: string,
    members: memberType[],
    createdAt: Date,
    workspaceImg: string,
    chats: chatMessageType[]  // Add this line
}

const memberSchema: Schema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    position: {
        type: String,
        required: true
    }
}, { _id: false });

const chatMessageSchema: Schema = new Schema({
    workspaceId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        required: true
    },
    fallBackColour: {
        type: String,
        required: true
    }
}, { _id: false });

const workspaceSchema: Schema<workspaceType> = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    board: {
        type: String
    },
    workspaceImg: {
        type: String
    },
    members: [memberSchema],
    chats: [chatMessageSchema],  // Add this line
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true });

const Workspace: Model<workspaceType> = mongoose.models.Workspace || mongoose.model<workspaceType>('Workspace', workspaceSchema);

export default Workspace;