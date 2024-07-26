// components/WorkspaceCard.js
'use client'
import React from 'react';
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
import { useRouter } from 'next/navigation';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react"
const WorkspaceCard = ({ name, description, members,workspaceImg,workspaceId }:{
    name:string,
    description:string,
    members:any,
    workspaceImg:string,
    workspaceId:string
}) => {
  const router=useRouter();
  const deleteWorkspace=async()=>{
    console.log('clicked');
    const response = await fetch(`/api/deleteworkspace?workspaceId=${workspaceId}`);
    if(response.ok){
      console.log('Workspace deleted succesfully');
      router.refresh();
    }else{
      const data=await response.json();
      console.log(data);
    }
    
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:cursor-pointer transition-shadow duration-200' onClick={()=>router.push(`/workspace/${workspaceId}`)} >
        <div className='h-24 w-full relative rounded-lg overflow-hidden'>
            {
                workspaceImg.length>0?(
                   <img src={workspaceImg} className='h-full w-full object-cover rounded-lg absolute'></img> 
                ):(<div className='h-full w-full absolute bg-fuchsia-700 rounded-lg'/>)
            }
            <div className='h-24 w-full flex justify-end items-end absolute bg-gray-800/40'>
                <h3 className='text-xl font-semibold mb-2 text-slate-50 mr-4'>{name}</h3>
            </div>
            
        </div>
      
      <p className='text-sm font-normal text-gray-600 mb-4 line-clamp-2 px-1'>{description}</p>
      <div className='flex items-center space-x-2'>
        <AvatarGroup total={members.length>5?members.length-5:0} className='w-full flex justify-start'>
        {members.map((member:any, index:any)=> (
          <Avatar radius='full' src={member.id?.avatar} key={index} showFallback name={member.id?.username} style={{
            backgroundColor:member.id?.fallBackColour
        }} className='h-full w-auto absolute flex items-start' 
        fallback={
        <div className=' z-1 flex items-center justify-center leading-snug align-start' >
            <p className='align-start text-lg'>{member.id?.username[0]}</p>
         </div>
        }
        />
        ))}
        
        </AvatarGroup>
        <Dropdown>
      <DropdownTrigger>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 hover:cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="add">Add Member</DropdownItem>
        {/* <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem> */}
        <DropdownItem key="delete" className="text-danger" color="danger" onClick={deleteWorkspace}>
          Delete Workspace
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

      </div>
    </div>
  );
};

export default WorkspaceCard;
