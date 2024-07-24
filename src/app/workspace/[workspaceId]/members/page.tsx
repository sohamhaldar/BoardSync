import MemberLayout from '@/components/MemberLayout';
import React from 'react';

async function getWorkspaceData(workspaceId: string) {
  const response = await fetch(`http://localhost:3000/api/workspaces/byid?_id=${workspaceId}`, { cache: 'no-cache' });
  if (!response.ok) {
    const data=await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

async function Page({ params}: { params: { workspaceId: string } }) {
  const workspaceId = params.workspaceId;
  const data=await getWorkspaceData(workspaceId);
  return (
    <MemberLayout workspaceId={workspaceId} data={data} />
  )
}

export default Page