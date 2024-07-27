'use client';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { usePathname, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import {Spinner} from "@nextui-org/spinner";

const Page= ({ params }: { params: { username: string }}) => {
  const [otp, setOtp] = useState<string>('');
  const [isLoading,setLoading]=useState(false);
  const username=params.username;
    const Router=useRouter();
  const handleSubmit=async()=>{
    // console.log(otp);
    if(otp.length<6){
        toast.error('Please enter the valid otp');
        return;
    }
    const data={
        username,otp
    }
    setLoading(true);
    const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        // Handle error responses
        const errorData = await response.json();
        console.error('Error:', errorData);
        setLoading(false);
        toast.error(errorData.message);
        return;
      }
  
      const result = await response.json();
      // console.log('Success:', result);
      toast.success("Verification succesfull");
      Router.push('/auth/login');
      setLoading(false);
  }

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex justify-center items-center">
      <div className="bg-white/30 backdrop-blur-xl min-h-screen w-full flex justify-center items-center shadow-lg p-6 md:p-8 lg:p-10">
        <div className='bg-slate-100 rounded-xl flex flex-col justify-center items-center p-6 md:p-8 lg:p-8'>
          <h1 className='text-2xl font-semibold mb-4'>Enter verification code</h1>
          <p className='text-slate-800 mb-6 text-center'>Enter the 6 digit verification code for authentication</p>
          <OtpInput
            inputStyle={{
              width: '40px', // Adjust width as needed
              height: '48px', // Adjust height as needed
              fontSize: '1.5rem', // Adjust font size as needed
              borderRadius: '10px',
              border: '1px solid #ccc',
              textAlign: 'center',
            }}
            containerStyle={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-2 md:mx-4">-</span>}
            // isInputNum
            renderInput={(props) => <input {...props} />}
          />
          <button className='font-semibold p-2 bg-custom-pink/80 hover:bg-custom-pink/60 text-slate-100 rounded-md mt-4' disabled={isLoading} onClick={handleSubmit}>{isLoading?<Spinner/>:"Submit"}</button>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

export default Page;
