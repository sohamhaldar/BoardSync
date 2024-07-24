import dbConnect from "@/lib/dbConnect";
import { Workspace } from "@/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        await dbConnect();
        const {memberId,workspaceId}=await request.json();
        const workspace = await Workspace.findById(workspaceId);
    
        if (!workspace) {
          return NextResponse.json({
            success: false,
            message: 'Workspace not found',
        }, {
            status: 404
        });
        }
    
        // Check if the member exists in the workspace
        const memberIndex = workspace.members.findIndex(
          (member) => member.id.toString() === memberId
        );
    
        if (memberIndex === -1) {
            return NextResponse.json({
                success: false,
                message: 'Member not found in Workspace',
            }, {
                status: 404
            });
        }
    
        // Remove the member from the workspace
        workspace.members.splice(memberIndex, 1);
    
        await workspace.save();
    
        return NextResponse.json({
            success: true,
            message: 'Memeber removed succcesfuly',
        }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Some error occured',
        }, {
            status: 500
        });
    }
}