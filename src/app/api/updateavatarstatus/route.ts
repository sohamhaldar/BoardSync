import dbConnect from "@/lib/dbConnect";
import { User } from "@/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { _id,avatarStatus} = await request.json();

    if (!_id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }
    
    const user = await User.findByIdAndUpdate(_id, {  
        isAvatarSet: avatarStatus 
      });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'No user found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Avatar status updated successfully',
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error changing status of avatar', error);
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