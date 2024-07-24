'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../../../../../public/logo.png';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface WorkspaceData {
  name: string;
  description: string;
  workspaceImg?: string;
  owner: any;
}

function Page({ params }: { params: { workspaceId: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{ data: WorkspaceData } | null>(null);
  const workspaceId = params.workspaceId;
  const {data:session}=useSession();
  const router=useRouter();

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const response = await fetch(`/api/workspaces/getworkspace?workspaceId=${workspaceId}`);
        const data = await response.json();
        const memberId=session?.user._id;
        console.log(memberId);
        console.log(data);
        const isExist = data.data.members.some((member: any) => {
          if (!member.id || !memberId) return false;
          
          const memberIdStr = member.id.toString().trim();
          const sessionMemberIdStr = memberId.toString().trim();
          
          return memberIdStr === sessionMemberIdStr;
        });
        console.log('IsExist',isExist)
        if(isExist){
          console.log("Exist in workspace");
          router.push(`/workspace/${workspaceId}`);
          
        }
        setData(data);
      } catch (error) {
        console.error('Error fetching workspace data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (session?.user?._id) {
      getWorkspaces();
    }
  }, [workspaceId,session]);

  const handleAcceptInvite = async() => {
    // Implement the logic to accept the invitation
    const memberId=session?.user._id;
    const response=await fetch('/api/workspaces/addmember',{
      method:'POST',
      headers: { 
        "Content-type": "application/json; charset=UTF-8"
      },
      body:JSON.stringify({
        memberId,
        workspaceId
      })
    })
    if(response.ok){
      console.log('Invitation accepted');
      router.push(`/workspace/${workspaceId}`);
    }else{
      console.log('some error occured');
    }
    
  };

  return (
    !isLoading ? (
      <>
        <div className='h-[10vh] w-full bg-gray-100 flex items-center justify-center'>
          <Image src={logo} className='h-[60%] w-auto top-2' alt="logo" />
          <h1 className='mx-2 text-3xl font-bold bg-gradient-to-r from-custom-pink to-violet-500 text-transparent bg-clip-text leading-snug'>BoardSync</h1>
        </div>
        <div className='w-full h-[90vh] bg-custom-gradient-2 relative'>
          <div className='w-full h-full bg-white/35 absolute flex justify-center items-center overflow-auto'>
            <div className='h-auto md:w-[40%] w-[70%] bg-white p-8 rounded-lg shadow-lg'>
              {data && data.data ? (
                <>
                  {data.data.workspaceImg ? (
                    <div className='w-full h-40 relative mb-4'>
                      <Image src={data.data.workspaceImg} layout='fill' objectFit='cover' alt='Workspace Image' className='rounded-t-lg' />
                    </div>
                  ) : (
                    <div className='w-full h-40 bg-gray-200 flex items-center justify-center mb-4 rounded-t-lg'>
                      <p className='text-gray-500'>No image available</p>
                    </div>
                  )}
                  <h2 className='text-2xl font-bold mb-2'>{data.data.name}</h2>
                  <p className='text-gray-600 mb-4'>{data.data.description}</p>
                  <p className='text-sm font-semibold text-gray-800 mb-6'>Owned by: {data.data.owner.username}</p>
                  <button
                    onClick={handleAcceptInvite}
                    className='w-full bg-gradient-to-r from-custom-pink to-violet-500 text-white font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity'
                  >
                    Accept Invitation
                  </button>
                </>
              ) : (
                <p className='text-red-500'>Error loading workspace data. Please try again.</p>
              )}
            </div>
          </div>       
        </div>
      </>
    ) : (
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex justify-center items-center animate-appearance-in">
        <div className="bg-white/30 backdrop-blur-xl h-screen w-full flex justify-center items-center shadow-lg">
          <div className='h-[40%] w-full flex flex-col justify-center items-center'>
            <h1 className='animate-bounce h-[40%] mx-2 md:text-7xl text-5xl font-bold bg-gradient-to-r from-custom-pink to-violet-500 text-transparent bg-clip-text leading-snug'>BoardSync</h1>
            <h1 className='text-slate-50 font-semibold text-2xl'>Setting up the workspace ...</h1>
          </div>
        </div>
      </div>
    )
  );
}

export default Page;