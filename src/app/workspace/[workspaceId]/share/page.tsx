'use client';
import React,{useCallback, useEffect, useState} from 'react';
import { Tldraw, useEditor,getSnapshot, loadSnapshot, HistoryEntry, TLRecord} from 'tldraw';
import 'tldraw/tldraw.css';
import Image from 'next/image';
import logo from '../../../../../public/logo.png';

function EditorControl({workspaceId,setIsLoading,data}:{
    workspaceId:string
    setIsLoading:any
    data:any
  }){
    const editor=useEditor();
    editor.updateInstanceState({isReadonly:true})
    
    useEffect(() => {
      const getWorkspaces=async(data:any)=>{
        // const response=await fetch(`/api/workspaces/getworkspace?workspaceId=${workspaceId}`);
        // const data=await response.json();
        console.log(data);
        if(data&&data.data&&data.data.board&&editor){
            const board=JSON.parse(data.data.board);
            let snapshot = getSnapshot(editor.store);
            snapshot.document.store = board.data;
            editor.loadSnapshot(snapshot);
        }
      }
      getWorkspaces(data);
        }, [editor,workspaceId,setIsLoading,data]);
    return null;
  }

function Page({ params }: { params: { workspaceId: string }}) {
    const [isLoading, setIsLoading] = useState(true);
    const [data,setData]=useState();
    const workspaceId=params.workspaceId;
    useEffect(() => {
        const getWorkspaces=async()=>{
          const response=await fetch(`/api/workspaces/getworkspace?workspaceId=${workspaceId}`);
          const data=await response.json();
        //   console.log(data);
          setData(data);
          setIsLoading(false);
        }
        getWorkspaces();
          }, [workspaceId]);
  return (
    !isLoading?(<>
        <div className='h-[10vh] w-full bg-gray-100 flex items-center justify-center'>
            <Image src={logo} className='h-[60%] w-auto top-2' alt="logo" />
            <h1 className='mx-2 text-3xl font-bold bg-gradient-to-r from-custom-pink to-violet-500 text-transparent bg-clip-text leading-snug'>BoardSync</h1>
        </div>
        <div className='w-full h-[90vh] bg-custom-gradient-2 relative'>
            <div className='w-full h-full bg-white/35 absolute flex justify-center items-center'>
                <div className='h-[90%] w-[90%]'>
                    <Tldraw className='rounded-xl' ><EditorControl workspaceId={workspaceId} setIsLoading={setIsLoading} data={data}/></Tldraw>
                </div>
            </div>       
        </div>
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

export default Page