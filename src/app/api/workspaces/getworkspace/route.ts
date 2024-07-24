import dbConnect from "@/lib/dbConnect";
import { User } from "@/model";
import Workspace from "@/model/workspaceModel";
import { Schema } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const workspaceId = searchParams.get('workspaceId');
    console.log('id:',workspaceId);
    
    // if (!_id) {
    //     return NextResponse.json({
    //         success: false,
    //         message: 'No user found',
    //     }, {
    //         status: 400
    //     });
    // }
    
    try {
        const user=await User.find({});
        const workspaces = await Workspace.findById(workspaceId).populate('owner');
        // console.log(JSON.stringify(workspaces.members));
        if (!workspaces) {
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
            data: JSON.parse(JSON.stringify(workspaces))
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
