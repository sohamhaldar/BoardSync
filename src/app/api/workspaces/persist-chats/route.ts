import dbConnect from "@/lib/dbConnect";
import { Workspace } from "@/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        await dbConnect();
        const {workspaceId,chats}=await request.json();

        if (!workspaceId || !Array.isArray(chats)) {
            return NextResponse.json({
                success: false,
                message: 'Invalid Input',
            }, {
                status: 400
            });
        }
        
        const updatedWorkspace = await Workspace.findByIdAndUpdate(
            workspaceId,
            { $push: { chats: { $each: chats } } },
            { new: true, runValidators: true }
        );
        if (!updatedWorkspace) {
            
            return NextResponse.json({
                success: false,
                message: 'Workspace not found',
            }, {
                status: 404
            });
        }
        console.log('Updated Workspace:', JSON.stringify(updatedWorkspace, null, 2));
        return NextResponse.json({
            success: true,
            message: 'Chats persisted succesfully',
            data:updatedWorkspace
        }, {
            status: 200
        });
          
        
    }catch(error){
        return NextResponse.json({
            success: false,
            message: 'Some error occured',
            error:error
        }, {
            status: 500
        });
    }
}