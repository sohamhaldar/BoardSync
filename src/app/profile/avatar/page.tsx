'use client';
import Avatar from '@/components/Avatar';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

function Page() {
  const{data:session,update}=useSession();
  return (
    <div className='h-screen w-screen bg-custom-gradient-2'>
        <div className='h-full w-full bg-white/25 flex justify-center items-center'>
          <div className='md:h-[80%] md:w-[40%] h-[60%] w-[75%] flex justify-center items-center'>
            <Avatar/>
          </div>
            
        </div>

    </div>
  )
}

export default Page