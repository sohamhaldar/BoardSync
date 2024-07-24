'use client';
import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Textarea} from "@nextui-org/react";
import { useRouter } from 'next/navigation';


function WorkspaceForm({isOpen, onOpen, onOpenChange,onClose,_id,revalidateAction}:{
    isOpen:any,
    onOpen:any,
    onOpenChange:any,
    onClose:any,
    _id:string | undefined,
    revalidateAction?:any
}) {
    const [workspaceImg,setWorkspaceImg]=useState<File>();
    const [workspaceImgUrl,setWorkspaceImgUrl]=useState('');
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [isLoading,setLoading]=useState(false);
    const img="https://react-basic-stepper.surge.sh/images/step3.png";
    const router=useRouter();
    const closeModal=()=>{
        setWorkspaceImg(undefined);
        setWorkspaceImgUrl('');
        setName('');
        setDescription('');
        onClose();
    }
    const createWorkspace=async()=>{
        const formData=new FormData();
        formData.append('_id',_id as string);
        formData.append('name',name);
        formData.append('description',description);
        if(workspaceImg){
            formData.append('workspaceImage',workspaceImg as File);
        }
        const response=await fetch('/api/addworkspace',{
            method:'POST',
            body:formData
        })
        const data=await response.json();
        if(response.ok){
            router.refresh();
            closeModal();

        }
        console.log(data);
        
    }
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={closeModal}
            placement='center'
        >
            <ModalContent>
                {(onClose)=>(
                    <>
                        <ModalHeader className="flex flex-col gap-1">Create Workspace</ModalHeader>
                        <ModalBody>
                            <div className='h-28 w-full relative rounded-lg overflow-hidden border-2'>
                                {workspaceImgUrl&&<img src={workspaceImgUrl} className='absolute h-full w-full rounded-lg'/>}
                                <div className='group h-full w-full absolute flex flex-col justify-center items-center rounded-lg hover:bg-gray-800/20' onClick={()=>document.getElementById('workspaceImg-input')?.click()}>
                                    <input id='workspaceImg-input' type="file" style={{display:'none'}}  onChange={(e)=>{
                                        if (e.target.files && e.target.files[0]) {
                                            console.log(URL.createObjectURL(e.target.files[0]));
                                            setWorkspaceImgUrl(URL.createObjectURL(e.target.files[0]));
                                            setWorkspaceImg(e.target.files[0])
                                          }
                                    }}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${workspaceImgUrl&&'opacity-0 group-hover:opacity-70'}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <h1 className={`${workspaceImgUrl&&'opacity-0 group-hover:opacity-70'}`}>Add Workspace Image</h1>
                                </div>


                            </div>
                            <Input
                                autoFocus
                                label="Name"
                                placeholder="Enter workspace name"
                                variant="bordered"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                            <Textarea
                                maxRows={3} 
                                label="Description"
                                placeholder="Enter workspace description"
                                variant="bordered"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                            />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={closeModal}>
                                Close
                            </Button>
                            <Button color="primary" onPress={createWorkspace}>
                                Create
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default WorkspaceForm