import dbConnect from "@/lib/dbConnect";
import { User } from "@/model";
import Workspace from "@/model/workspaceModel";
import { Schema } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('_id');
    console.log('id:',_id);
    
    if (!_id) {
        return NextResponse.json({
            success: false,
            message: 'No user found',
        }, {
            status: 400
        });
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
            return NextResponse.json({
                success: false,
                message: 'No Workspaces found',
            }, {
                status: 400
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Workspaces retrieved successfully',
            data: workspaces
        }, {
            status: 200
        });
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: 'An error occurred',
            error: error.message
        }, {
            status: 500
        });
    }
}
