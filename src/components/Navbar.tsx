'use client';
import React, { useState } from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, User, Avatar, useDisclosure} from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import WorkspaceForm from './WorkspaceForm';
import { usePathname, useRouter } from 'next/navigation';
// BoardSync\frontend\src\assets\Screenshot_2024-07-02_233541-removebg-preview.png
import { signOut } from 'next-auth/react';
// import { authOptions } from '@/app/api/auth/[...nextauth]/options';

function Navbar({workspaceName,workspaceId,isOwner}:{
  workspaceName?:string
  workspaceId?:string
  isOwner?:boolean
}) {
    const {data:session} = useSession();
    const pathname=usePathname();
    // console.log('Pathname: ',pathname);
    const router=useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const {isOpen:IsOpen, onOpen, onOpenChange,onClose} = useDisclosure();

    const deleteWorkspace=async()=>{
      const response = await fetch(`/api/deleteworkspace?workspaceId=${workspaceId}`);
      if(response.ok){
        console.log('Workspace deleted succesfully');
        router.push('/dashboard');
      }else{
        const data=await response.json();
        // console.log(data);
      }
      
    }
    const leaveWorkspace=async()=>{
      const memberId=session?.user._id;
      const response=await fetch(`/api/workspaces/removemember`,{
        method:'POST',
      headers: { 
        "Content-type": "application/json; charset=UTF-8"
      },
      body:JSON.stringify({
        memberId,
        workspaceId
      })
      });
      if(response.ok){
        console.log('Workspace leaved succesfully');
        router.push('/dashboard');
      }else{
        const data=await response.json();
        // console.log(data);
      }

    }

  return (
    <>
    <div className='h-[10vh] w-full bg-gray-100 flex items-center justify-between'>
        <div className='flex h-[50%] items-center gap-2 m-4 md:ml-10 hover:cursor-pointer' onClick={()=>router.push('/')}>
            <Image src={logo} className='h-[90%] w-auto top-2' alt="" />
            <h1 className='mx-2 md:block hidden text-3xl font-bold bg-gradient-to-r from-custom-pink to-violet-500 text-transparent bg-clip-text leading-snug'>BoardSync</h1>
        </div>
        {pathname=='/dashboard'?(<div className='flex items-center justify-between rounded-lg px-6 py-4'>
          <h1 className='p-1 px-4 rounded-lg text-2xl bg-slate-200 font-semibold text-gray-800'>Dashboard</h1>
        </div>)
        :(<div className='flex items-center justify-between rounded-lg px-6 py-4'>
            <Dropdown onOpenChange={(open) => setIsOpen(open)}>
                <DropdownTrigger>
                <Button 
                    className='text-2xl bg-slate-200 font-semibold text-gray-800'
                    variant="light" 
                    
                    endContent={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}>
                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                    }
                >
                    {workspaceName}
                </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dashboard actions">
                <DropdownSection title="Actions" showDivider>
                    {/* <DropdownItem key="new">New Project</DropdownItem>
                    <DropdownItem key="copy">Copy Link</DropdownItem> */}
                    <DropdownItem key="edit">Show description</DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">
                  {isOwner?
                    (<DropdownItem key="delete" className="text-danger" color="danger" onClick={deleteWorkspace}>
                    Delete Workspace
                    </DropdownItem>):
                    (<DropdownItem key="delete" className="text-danger" color="danger" onClick={leaveWorkspace}>
                    Leave Workspace
                    </DropdownItem>)}
                </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div>)}
        <div className='flex h-full items-center' onClick={onOpen}>
            <div className='hover:cursor-pointer p-2 md:rounded-lg rounded-3xl bg-custom-pink/90 hover:bg-custom-pink/70 flex justify-center items-center h-8 md:h-10'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:size-6 size-4 md:mx-1 text-slate-200 rounded-md font-bold">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>

            <h1 className='hidden md:block text-slate-200 font-medium mr-1'>New Workspace</h1>
        </div>
        <div className='lg:m-4 m-2 lg:mr-16 flex justify-center items-center'>
        <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
      {/* <button type="button" className="flex justify-center items-center mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown"> */}
        <Avatar className="lg:size-12 size-12 rounded-full ml-2 hover:cursor-pointer " src={session?.user.avatar} style={{
            backgroundColor:session?.user.fallbackColor
        }} fallback={
                    <div style={{
                        backgroundColor:session?.user.fallbackColor
                    }} className='h-full w-full text-2xl'>{session?.user.username ? session.user.username[0] : ''}</div>
                } alt="user photo"/>
        {/* </button> */}
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <User
              name={session?.user.username}
              description={session?.user.email}
              classNames={{
                name: "text-default-600 font-semibold",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: session?.user.avatar,
                style:{
                    backgroundColor:session?.user.fallbackColor
                },
                fallback:(
                    <div style={{
                        backgroundColor:session?.user.fallbackColor
                    }} className='h-full w-full text-lg'>{session?.user.username ? session.user.username[0] : ''}</div>
                )
              }}
              
            />
          </DropdownItem>
          <DropdownItem key="dashboard" onClick={()=>router.push('/dashboard')}>
            Dashboard
          </DropdownItem>
          <DropdownItem key="about" onClick={()=>router.push('/profile')}>Profile</DropdownItem>
        </DropdownSection>

        <DropdownItem key="logout" className="text-danger" onClick={async()=>{
          await signOut();
          router.push('/auth/login');
          }} >Log Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
            
        </div>
        </div>
        <WorkspaceForm isOpen={IsOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose} _id={session?.user._id}/>
        
            
    </div>
    
    
</>
  )
}

export default Navbar;