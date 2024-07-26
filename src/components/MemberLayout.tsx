'use client'

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Members from '@/components/Members';

export default function MemberLayout({ workspaceId,data }: { workspaceId: string ,data:any }) {
  const [workspaceData, setWorkspaceData] = useState(data);

  const handleMemberRemoved = async (memberId: string) => {
    try {
    const updatedData = {
        ...workspaceData,
        data: {
          ...workspaceData.data,
          members: workspaceData.data.members.filter((item: any) => item.id._id !== memberId)
        }
      };
  
      setWorkspaceData(updatedData);
      const response = await fetch(`/api/workspaces/removemember`, {
        method: 'POST',
        headers: { 
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ 
          memberId,
          workspaceId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove member');
      }
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  return (
    <div className='h-full w-full'>
      <Navbar workspaceName={workspaceData.data.name}/>
      <div className='w-full h-[90vh] bg-custom-gradient-2 relative'>
        <div className='w-full h-full bg-white/35 absolute flex justify-center items-center overflow-y-auto'>
          <div className='md:w-[70%] w-[80%] h-full'>
            <div className='w-full h-[10%] flex justify-center items-center gap-2'>
              <h1 className='text-3xl font-bold text-black p-2'>Members</h1>
              <div className='flex justify-center items-center gap-2 bg-white rounded-full pr-2 hover:bg-slate-300 hover:cursor-pointer'>
                <div className='flex flex-col items-center justify-center p-2 bg-slate-200 rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                  </svg>
                </div>
                <p className='font-semibold text-center'>Add Members</p>
              </div>
            </div>
            <div className='h-[90%] w-full flex flex-wrap justify-center items-start gap-y-3 pt-2'>
              {workspaceData.data.members.map((item: any) => (
                <Members 
                  key={item.id._id} 
                  data={item} 
                  workspaceId={workspaceId}
                  onMemberRemoved={() => handleMemberRemoved(item.id._id)}
                />
              ))}
              <div className='w-full h-10'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}