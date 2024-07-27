'use client';
import React,{useState,useEffect} from 'react';
import Board from '../../../components/Board';
import GroupChat from '../../../components/GroupChat';
import Navbar from '../../../components/Navbar';
import {Popover, PopoverTrigger, PopoverContent, Button,Divider, useDisclosure} from "@nextui-org/react";
import { getToken } from 'next-auth/jwt';
import { useSession,getSession} from 'next-auth/react';
import { useSocket } from '@/context/SocketProvider';
import { useRouter } from 'next/navigation';
import Share from '@/components/ShareModal';

function BoardLayout({ params }: { params: { workspaceId: string }}) {
  const [current,setCurrent]=useState('board');
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl,setCurrentUrl] = useState('');
  // const [isInviteOpen, setIsInviteOpen] = useState(false);
  const {isOpen:IsShareOpen, onOpen:onShareOpen,onOpenChange:onShareOpenChange} = useDisclosure();
  const {isOpen:IsInviteOpen, onOpen:onInviteOpen,onOpenChange:onInviteOpenChange} = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<any>([]);
  const [workspaceName,setWorkspaceName]=useState('');
  const [isOwner,setIsOwner]=useState(false); 
  const [input,setInput]=useState('');
  const {data:session}=useSession();
  const {socket}=useSocket();
  const username=session?.user.username;
  const workspaceId=params.workspaceId;
  const router=useRouter();
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  
  useEffect(() => {
    if (socket) {
      const result = { workspaceId };
      console.log('Emitting join-workspace:', result);
      
      socket.on('connect', () => {
        console.log('Socket connected');
        setIsSocketConnected(true);
      });
  
      socket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsSocketConnected(false);
      });
  
      socket.emit('join-workspace', result);
  
      socket.on('joined-workspace', (data) => {
        console.log('Successfully joined workspace:', data);
      });
  
      socket.on('join-error', (error) => {
        console.error('Error joining workspace:', error);
      });
  
      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('joined-workspace');
        socket.off('join-error');
      };
    }
  }, [socket, workspaceId]);
  const isWorkspaceAvailable = async () => {
    try {
      if(socket){
        setIsSocketConnected(true);
      }
      const pingResponse = await fetch(`${process.env.NEXT_PUBLIC_CUSTOM_SERVER_URL}/ping`);
      if (!pingResponse.ok) {
        throw new Error('Backend is not responding');
      }
  
      const _id = session?.user._id;
      if (_id) {
        const response = await fetch(`/api/workspaces?_id=${_id}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          const result = data.data.find((item:any) => item._id == workspaceId);
          if (result) {
            console.log(result);
            console.log(_id);
            console.log('isEqual', result.owner == _id);
            if (result.owner == _id) {
              setIsOwner(true);
            }
            setWorkspaceName(result.name);
            setIsLoading(false);
          }
        }
      }
    } catch (error) {
      console.error('Error checking workspace availability:', error);
    }
  };


  useEffect(()=>{
    isWorkspaceAvailable();

    // socket?.on('message',(result)=>{
    //   setMessages((prevMessages:any)=>[...prevMessages,result]);
    // });
    // socket?.emit('join-workspace',{
    //   workspaceId
    // });


  },[workspaceId,session?.user._id])

  useEffect(()=>{
    if(process) {
      setCurrentUrl(window.location.origin);
    };
  },[process])
  

  const options = (
    <PopoverContent className='bg-slate-100 p-0 hover:cursor-pointer overflow-hidden'>
      <div className="px-2 py-4 w-full h-full hover:bg-slate-300" onClick={()=>{
        setIsOpen(false);
        
        }}>
        <div className="text-small font-bold text-slate-700 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
          
          Member</div>
      </div>
      <Divider className=""/>
      <div className="px-2 py-4 hover:bg-slate-300 w-full h-full" onClick={()=>{
        setIsOpen(false);
        onShareOpen();
      }}>
        <div className="text-small font-bold text-slate-700 flex items-center justify-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
          </svg>
          Share</div>
      </div>
      <Divider className=""/>
      <div className="px-2 py-4 hover:bg-slate-300 w-full h-full" onClick={()=>{
        setIsOpen(false);
        onInviteOpen();
      }}>
        <div className="text-small font-bold text-slate-700 flex items-center justify-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
        </svg>


          Invite</div>
      </div>
    </PopoverContent>
  );
  return (
    !isLoading && isSocketConnected?(<>
      <Navbar workspaceName={workspaceName} workspaceId={workspaceId} isOwner={isOwner}/>
      <div className='w-full h-[90vh] bg-custom-gradient-2 relative'>
      
          <div className='w-full h-full bg-white/35 absolute flex justify-center items-center'>
              <div className='w-full h-full relative flex justify-center items-center gap-3'>
                <div className={`h-[90%] md:w-[70%] w-[90%] md:block ${current=='board'?'block':'hidden'}`}>
                  <Board socket={socket} workspaceId={workspaceId} username={session?.user.username}/>
                </div>
                <div className='md:hidden w-[60%] h-20 z-40 absolute flex justify-center items-center border-black bottom-0'>
                  <div className='w-[80%] bg-slate-800/40 h-16 rounded-lg flex justify-evenly items-center'>
                  
                  
                    <button onClick={()=>setCurrent('board')} className={`p-2 pb-0.5 flex flex-col justify-center items-center text-slate-100  rounded-md ${current=='board'?'px-4 pt-3 font-semibold bg-custom-pink/90':''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={current=='board'?2.5:1.5} stroke="currentColor" className={current=='board'?'size-8':'size-6'}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                      </svg>
                      Board
                    </button>
                    <button onClick={()=>setCurrent('chat')} className={`p-2 pb-0.5 flex flex-col justify-center items-center text-slate-100  rounded-md ${current=='chat'?'px-4 pt-3 font-semibold bg-custom-pink/90':''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={current=='chat'?2.5:1.5} stroke="currentColor" className={current=='chat'?'size-8':'size-6'}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                      </svg>

                      Chats
                    </button>
                    <Popover placement="bottom-start" color="secondary" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                            <PopoverTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8 text-slate-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                      </svg>
                            </PopoverTrigger>
                            {options}
                    </Popover>
                    {/* <button onClick={()=>setCurrent('home')} className={`p-2 flex flex-col justify-center items-center text-slate-100  rounded-md ${current=='home'?'px-4 pt-3 font-semibold bg-custom-pink/90':''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                      </svg>
                      
                    </button> */}
                  </div>
                </div>
              
                <div className={`md:h-[90%] h-[80%] md:w-[25%] w-[90%]  md:block ${current=='chat'?'block':'hidden'}`}>
                  <div className='h-[12%] w-full hidden md:flex justify-center gap-10'>
                    <div className='flex flex-col justify-center items-center mb-2'>
                      <button className='flex flex-col items-center justify-center p-2 bg-white rounded-full hover:bg-slate-300' onClick={()=>router.push(`${workspaceId}/members`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>  
                      </button>
                      <p className='text-sm font-semibold text-center'>Members</p>
                    </div>
                    <div className='flex flex-col justify-center items-center mb-2'>
                      <button className='flex flex-col items-center  justify-center p-2 bg-white rounded-full hover:bg-slate-300' onClick={onShareOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <p className='text-sm font-semibold text-center'>Share</p>
                    </div>
                    <div className='flex flex-col justify-center items-center mb-2'>
                      <button className='flex flex-col items-center  justify-center p-2 bg-white rounded-full hover:bg-slate-300' onClick={onInviteOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>

                      </button>
                      <p className='text-sm font-semibold text-center'>Invite</p>
                    </div>
                    
                    
                  </div>
                  <div className='md:h-[88%] h-full w-full'>
                    <GroupChat socket={socket} workspaceId={workspaceId}/>
                  </div>
                    
                </div>
              </div>
              
              
          </div> 
            
      </div>
      <Share isInvite={false} isOpen={IsShareOpen} onOpen={onShareOpen} onOpenChange={onShareOpenChange} url={`${currentUrl}/workspace/${workspaceId}/share`} />
      <Share isInvite={true} isOpen={IsInviteOpen} onOpen={onInviteOpen} onOpenChange={onInviteOpenChange} url={`${currentUrl}/workspace/${workspaceId}/invite`} />
    </>):(
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex justify-center items-center animate-appearance-in">
      <div className="bg-white/30 backdrop-blur-xl h-screen w-full flex justify-center items-center shadow-lg">
        <div className='h-[40%] w-full flex flex-col justify-center items-center'>
          <h1 className='animate-bounce h-[40%] mx-2 md:text-7xl text-5xl font-bold bg-gradient-to-r from-custom-pink to-violet-500 text-transparent bg-clip-text leading-snug'>BoardSync</h1>
          <h1 className='text-slate-50 font-semibold text-2xl'>Setting up the workspace ...</h1>
        </div>
        </div>
      </div>)
  )
}

export default BoardLayout;