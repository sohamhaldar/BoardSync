"use server"

import Navbar from '@/components/Navbar';
import Workspace from '@/components/Workspace';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { revalidateTag } from 'next/cache';
async function getWorkspaces() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  const _id = session.user._id;
  console.log(_id)
  
  const res = await fetch(`${process.env.CLIENT_URL}/api/workspaces?_id=${_id}`);
  const data = await res.json();

  if (!data.success) {
    return [];
  }

  return data.data;
}

export default async function Page() {
  const workspaces = await getWorkspaces();
  console.log(workspaces);
  

  if (!workspaces) {
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <p className='text-white text-lg'>No workspaces available. Click &quot;New Workspace&quot; to create one.</p>
      </div>
    );
  }

  return (
    <div className='h-screen w-full'>
      <Navbar />
      <div className='h-[90%] w-full bg-custom-gradient p-8 overflow-y-auto'>
        {workspaces.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-white text-lg'>No workspaces available. Click &quot;New Workspace&quot; to create one.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {workspaces.map((workspace:any, index:any) => (
              <Workspace
                key={workspace._id}
                workspaceId={workspace._id}
                name={workspace.name}
                description={workspace.description}
                members={workspace.members}
                workspaceImg={workspace.workspaceImg}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
