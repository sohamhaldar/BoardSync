'use client';
// import React, { useState, useRef } from 'react';
import logo from '../../public/logo.png';
import TextareaAutosize from 'react-textarea-autosize';
import Image from 'next/image';
import { useEffect,useRef,useState } from 'react';
import { useSession } from 'next-auth/react';
import { Socket } from 'socket.io-client';

function GroupChat({socket,workspaceId}:{
  socket:Socket|null,
  workspaceId:string
}) {
  const [messages, setMessages] = useState<any>([]);
  const [input,setInput] =useState('');
  const {data:session}=useSession();
  const username=session?.user.username;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const messageHandler = (result:any) => {
      // console.log('message received', result);
      setMessages((prevMessages:any) => [...prevMessages, result]);
    };
  
    const userJoinedHandler = (result:any) => {
      // console.log(result);
      // setMessages([...result.chats])
    };
    
    socket?.on('message', messageHandler);
    socket?.on('user-joined', userJoinedHandler);
    socket?.on('get-chats',(result)=>{
      // console.log(result);
      if(result.chats){
        setMessages([...result.chats]);
      }
      
      scrollToBottom();
    })
    socket?.emit('get-chats',{
      workspaceId
    });
  
    return () => {
      socket?.off('message', messageHandler);
      socket?.off('user-joined', userJoinedHandler);
      socket?.off('get-chats');
    };
  }, [socket, workspaceId]);
  
  const sendMessage=async()=>{
    const message=input;
    const payload={
      workspaceId,
      username,
      avatar:session?.user.avatar,
      message,
      fallBackColour:session?.user.fallbackColor
    }
    socket?.emit('message',payload);
    setInput('');
  }
  
  return (
    <div className='w-full h-full bg-slate-100 flex flex-col relative justify-end rounded-md md:top-0 -top-8'>
      <div className='h-full w-full flex flex-col justify-start'>
        <div className='w-full h-[10%] flex items-center'>
          <h1 className='text-xl font-bold mx-8'>Messages</h1>
        </div>
        <div className='w-full flex flex-col h-[80%] px-4 overflow-x-hidden overflow-y-auto'>
          {messages.map((item:any,index:any)=>{
           return( <div key={index} className={`flex my-4 ${item.username==username?'justify-end':'justify-start'}`}>
            <div className={`md:w-[70%] w-auto w-max-[70%] h-auto min-h-[10%] p-2  rounded-md flex flex-col items-start ${item.username==username ? 'bg-gradient-to-tr from-purple-400 from-[5%] via-pink-500 to-red-500' : 'bg-slate-200'}`}>
              <div className='h-10 w-full flex items-center gap-5 '>
                {
                  item.avatar?<img src={item.avatar} alt="" className='h-[90%] w-auto rounded-lg' />:
                  <div style={{
                    backgroundColor:item.fallBackColour
                  }} className='h-[90%] w-auto rounded-lg text-2xl px-3 font-bold'>
                    {item.username[0]}
                  </div>
                }
                <p className='truncate text-lg font-semibold mr-2'>{item.username}</p>
              </div>
              <div className='text-gray-800 mx-4 flex flex-wrap break-all text-wrap w-auto'>{item.message}</div>
            </div>
          </div>)
          })
          }
          <div ref={messagesEndRef} />
        </div>
        {/* <div className={`flex justify-start my-4`}>
            <div className={`w-[70%] min-h-[10%] p-2 rounded-md flex flex-col items-center ${ur ? 'bg-blue-800' : 'bg-slate-200'}`}>
              <div className='h-10 w-full flex items-center justify-between gap-5'>
                <Image src={logo} alt="" className='h-[90%] w-auto' />
                <p className='truncate text-sm font-semibold mr-2'>soham haldar</p>
              </div>
              <p className='text-gray-950'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat similique corrupti nihil nam exercitationem nisi officiis minus fugiat, iusto sunt vitae eveniet beatae. Distinctio?</p>
            </div>
          </div> */}
      </div>
      <div className='w-full min-h-[12%] z-20 flex justify-evenly items-end absolute bg-slate-100 rounded-md'>
        <div className='w-[80%] flex items-center h-[90%] mb-2'>
          <TextareaAutosize
            className='w-full min-h-6 rounded-sm p-2 resize-none'
            placeholder='Write message here...'
            maxRows={5}
            value={input}
            onChange={(e)=>setInput(e.target.value)}
          />
        </div>
        <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-fuchsia-500 mb-3">
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </div>
    </div>
  );
}

export default GroupChat;
