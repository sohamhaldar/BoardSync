import dbConnect from "@/lib/dbConnect";
import { uploadImage } from "@/lib/uploadImage";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

type CloudinaryResponse = {
    url: string,
    secure_url: string
}

export async function POST(Request: NextRequest) {
    await dbConnect();
    const formData = await Request.formData();
    console.log(formData);
    
    const image = formData.get('avatar') as File | undefined;
    const username = formData.get('username') as string;
    console.log(username);
    
    if (!username) {
        return NextResponse.json({
            success: false,
            message: 'Username not present',
        }, {
            status: 400
        });
    }
    
    const isUserPresent = await User.findOne({
        username,
        isVerified: true,
    });

    if (!isUserPresent) {
        return NextResponse.json({
            success: false,
            message: 'User not found or not verified',
        }, {
            status: 404
        });
    }

    if (!image) {
        return NextResponse.json({
            success: false,
            message: 'Avatar image not found in form data',
        }, {
            status: 400
        });
    }

    const data: CloudinaryResponse = await uploadImage(image, 'BoardSync/users_avatar') as CloudinaryResponse;
    
    isUserPresent.avatar = data.url;
    isUserPresent.isAvatarSet=true;
    await isUserPresent.save();

    return NextResponse.json({
        message: 'Image uploaded successfully',
        url:data.url,
        secure_url:data.secure_url
    }, {
        status: 201
    });
}
