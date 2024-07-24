'use client';
import React,{useState} from 'react'
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
function Members({data,workspaceId,onMemberRemoved}:{
    data:any,
    workspaceId:string,
    onMemberRemoved:any
}) {
    const [isOpen, setIsOpen] = useState(false);
    
      const removeMember = async () => {
        try {
          await onMemberRemoved(data.id._id);
          setIsOpen(false);
        } catch (error) {
          console.error('Error removing member:', error);
          // Handle error (e.g., show error message)
        }
      };
    
    const content = (
        <PopoverContent className='bg-slate-100 hover:bg-slate-300 hover:cursor-pointer' onClick={()=>setIsOpen(false)}>
          <div className="px-1 py-2" onClick={removeMember}>
            <div className="text-small font-bold text-slate-700">Remove Member</div>
          </div>
        </PopoverContent>
      );
    
  return (
    
            <div className='h-44 w-40 flex flex-col justify-center items-center'>
                <div className='h-[70%] w-[70%] rounded-2xl overflow-hidden relative'>
                    <Avatar radius='lg' src={data.id?.avatar}  showFallback name={data.id?.username} style={{
                            backgroundColor:data.id?.fallBackColour
                        }} className='h-full w-full absolute' fallback={
                        <div className='h-full w-full z-1 flex justify-end items-end' >
                            <h1 className='text-5xl'>{data.id?.username[0]}</h1>
                        </div>
                    }/>
                    <div className='h-full w-full bg-black/30 absolute z-1 flex justify-end items-end'>
                        <Popover placement="bottom-start" color="secondary" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                            <PopoverTrigger>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-teal-50 hover:text-teal-100 hover:cursor-pointer">
                                <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                            </svg>
                            </PopoverTrigger>
                            {content}
                        </Popover>
                        
                    </div>
                </div>
                
                <p className='text-lg font-bold truncate text-slate-800 mt-1 max-w-[90%]'>{data.id?.username}</p>
                <p className='font-semibold truncate text-gray-600'>{data.position}</p>

            </div>
        
  )
}

export default Members