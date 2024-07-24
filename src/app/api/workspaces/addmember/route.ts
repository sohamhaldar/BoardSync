import dbConnect from "@/lib/dbConnect";
import Workspace from "@/model/workspaceModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { memberId, workspaceId } = await request.json();

    if (!memberId || !workspaceId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return NextResponse.json(
        {
          success: false,
          message: 'No Workspace found',
        },
        { status: 404 }
      );
    }

    // Check if the member already exists
    const isMemberExist = workspace.members.some(
      (member) => member.id.toString() === memberId
    );

    if (isMemberExist) {
      return NextResponse.json(
        {
          success: false,
          message: 'Member already exists',
        },
        { status: 409 }
      );
    }
    workspace.members.push({ 
        id: memberId, 
        position: 'member' 
      });
    await workspace.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Member added successfully',
        data: workspace,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding member to workspace:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}