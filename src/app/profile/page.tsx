'use client';
import React,{useState} from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/Avatar';

function Page() {
    const {data:session}=useSession();
    const router=useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen:IsOpen, onOpen:OnOpen, onOpenChange:OnOpenChange} = useDisclosure();
  return (
    <div className='h-screen w-full bg-custom-gradient-2'>
        <div className='h-full w-full bg-white/25 flex flex-col justify-start items-center'>
            <div className='w-full h-10 mb-20 md:mb-10 flex items-center' >
                <div className='flex items-center ml-2 hover:cursor-pointer' onClick={()=>router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 text-blue-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <h1 className='text-blue-700 text-lg font-bold'>Back</h1>
                </div>
            </div>
            <div className='p-4 h-auto md:w-[30%] w-[70%] rounded-xl bg-white flex flex-col items-center'>
                <div className='rounded-full h-40 w-40 m-4 overflow-hidden hover:cursor-pointer' onClick={OnOpen}>
                    {
                    session?.user.avatar?(<img src={session.user.avatar} alt=""  />)
                    :(<div className='h-full w-full rounded-full object-cover text-7xl font-semibold flex justify-center items-center' style={{
                        backgroundColor:session?.user.fallbackColor
                    }} >{session?.user.username ? session.user.username[0] : ''}</div>)}
                </div>
                <Input
                    autoFocus
                    label="Username"
                    // variant="borclassName='h-full w-full rounded-full object-cover'dered"
                    value={session?.user.username}
                    disabled
                    className='m-2'
                />
                <Input
                    autoFocus
                    label="Email"
                    // variant="borclassName='h-full w-full rounded-full object-cover'dered"
                    value={session?.user.email ? session.user.email : ''}
                    disabled
                    className='m-2'
                />
                <button onClick={onOpen} className='m-2 rounded-xl p-2 bg-pink-700 text-slate-100 font-semibold text-xs'>Change password</button>
                
            </div>
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                    <ModalBody>
                        <Input
                            autoFocus
                            label="Old Password"
                            type="password"
                            placeholder="Enter old password"
                            variant="bordered"
                        />
                        <Input
                            label="New Password"
                            placeholder="Enter new password"
                            type="password"
                            variant="bordered"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                        Submit
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
            <Modal 
                isOpen={IsOpen} 
                onOpenChange={OnOpenChange}
                placement="center"
            >
                <ModalContent className='md:w-[80%] md:h-[80%] h-[60%] w-[60%]'>
                {(onClose) => (
                    <div className='w-full h-full'>
                    {/* <ModalHeader className="flex flex-col gap-1">Avatar</ModalHeader> */}
                    <Avatar/>
                    </div>
                )}
                </ModalContent>
            </Modal>
        </div>
    </div>
  )
}

export default Page