'use client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

function Avatar({redirectTodashboard}:{
  redirectTodashboard?:()=>void
}){
  
  const {data:session,update}=useSession();
  const [avatar, setAvatar] = useState(session?.user.avatar);
  const [image,setImage]=useState<File>();
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  const changeAvatar=async()=>{
    console.log(session?.user);
    if(image){
      const formData=new FormData();
      formData.append('avatar',image);
      const username=session?.user.username||''
      formData.append('username',username);
      const response = await fetch('/api/uploadprofilepic', {
        method: 'POST',
        body: formData,
      });
      const data=await response.json();
      console.log(data);
      

      await update({isAvatarSet:true,avatar:data.url});
      // await update({isAvatarSet:false});
      console.log("Changed succesfully:",session?.user);
    }else{
      await update({isAvatarSet:true,avatar:''});
    }
    
    if(redirectTodashboard){
      redirectTodashboard();
    }
  }

  return (
    <div className='h-full w-full bg-slate-100 rounded-lg flex flex-col items-center justify-evenly p-8'>
      <h1 className='font-bold text-3xl m-4 text-center'>Profile Avatar</h1>
      <div className='h-[50%] w-full relative flex flex-col items-center justify-end'>
        <div
          className='relative h-full w-full rounded-full  p-1'
          style={{
            clipPath: 'circle()',
            backgroundColor:session?.user.fallbackColor
          }}
        >
          {avatar ? (
            <img
              src={avatar||session?.user.avatar}
              style={{ clipPath: 'circle()' }}
              className='h-full w-full rounded-full object-cover'
              onClick={() => console.log('clicked')}
            />
          ) : (
            <div
              className='h-full w-full flex items-center justify-center text-white text-9xl font-bold'
              style={{ clipPath: 'circle()' }}
            >
              {getInitial(session?.user.username||'')}
            </div>
          )}
        </div>
        <button
          className='bg-slate-100 -bottom-2 absolute md:text-sm text-lg font-semibold border-2 border-slate-300 p-2 rounded-full'
          onClick={() => document.getElementById('avatar-input')?.click()}
        >
          Change profile avatar
        </button>
        <input
          type='file'
          id='avatar-input'
          className='hidden'
          onChange={(e) => {
            console.log(e.target.files);
            if (e.target.files && e.target.files[0]) {
              console.log(URL.createObjectURL(e.target.files[0]));
              setAvatar(URL.createObjectURL(e.target.files[0]));
              setImage(e.target.files[0])
            }
          }}
        />
      </div>
      <div onClick={changeAvatar} className='hover:cursor-pointer hover:bg-pink-700 mt-2 bg-pink-600 p-2 px-4 rounded-lg text-slate-100 w-[50%] flex justify-center items-center text-xl font-semibold tracking-wide'>
        {session?.user.isAvatarSet?"Submit":"Next"}
      </div>
    </div>
  );
}

export default Avatar;
