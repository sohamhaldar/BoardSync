import dbConnect from "@/lib/dbConnect";
import { uploadImage } from "@/lib/uploadImage";
import Workspace from "@/model/workspaceModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type CloudinaryResponse = {
    url: string,
    secure_url: string
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const formData = await request.formData();
        const image = formData.get('workspaceImage') as File | null;
        const _id = formData.get('_id') as string;
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;

        // Input validation
        if (!_id || !name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let workspaceImage = '';

        if (image) {
            const data: CloudinaryResponse = await uploadImage(image, 'BoardSync/Workspaces') as CloudinaryResponse;
            workspaceImage = data.url;
        }

        const ownerId = new mongoose.Types.ObjectId(_id);

        const newWorkspace = new Workspace({
            name,
            description,
            owner: ownerId,
            workspaceImg: workspaceImage,
            members: [{ id: ownerId, position: 'owner' }]
        });

        console.log('New workspace before saving:', JSON.stringify(newWorkspace, null, 2));

        await newWorkspace.save();

        return NextResponse.json({
            message: 'Workspace created successfully',
            data: newWorkspace
        }, {
            status: 201
        });
    } catch (error:any) {
        console.error('Error creating workspace:', error);
        return NextResponse.json({ error: 'Failed to create workspace', details: error.message }, { status: 500 });
    }
}