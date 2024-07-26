import dbConnect from "@/lib/dbConnect";
import { User } from "@/model";
import Workspace from "@/model/workspaceModel";
import { Schema } from "mongoose";

export async function getWorkspacesById(_id:string) {
    await dbConnect();
    console.log('id:',_id);
    
    if (!_id) {
        return JSON.stringify({
            success: false,
            message: 'No user found',
        })
    }
    
    try {
        const user=await User.find({});
        const workspaces = await Workspace.find(
            {
                $or: [
                  { owner: _id },
                  { members:{
                    $elemMatch:{
                        id:_id
                    }
                  } }
                ]
              })
              .populate("members.id","_id username email fallBackColour avatar");
        if (!workspaces.length) {
            return JSON.stringify({
                success: false,
                message: 'No Workspaces found',
            });
        }

        return JSON.stringify({
            success: true,
            message: 'Workspaces retrieved successfully',
            data: workspaces
        });
    } catch (error:any) {
        return JSON.stringify({
            success: false,
            message: 'An error occurred',
            error: error.message
        });
    }
}
