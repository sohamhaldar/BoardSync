'use client';

import React,{useState,useEffect} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import logo from '../../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const Router=useRouter()
  type FormValues = {
    username: string;
    password: string;
    email:string;
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange', // Validate on change
    reValidateMode: 'onChange', // Revalidate on change
  });

  const onSubmit:SubmitHandler<FormValues> =async(data) => {
    console.log(data);
    const response = await fetch('/api/auth/signup', {
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
      return;
    }

    // Handle success responses
    const result = await response.json();
    console.log('Success:', result);
    Router.push(`/auth/u/${data.username}`);
    
  };
  

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex justify-center items-center">
      <div className="bg-white/30 backdrop-blur-xl min-h-screen w-full flex justify-center items-center shadow-lg p-6 md:p-8 lg:p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8 lg:p-10 flex flex-col items-center space-y-6 overflow-y-auto"
        >
          <div className="w-full text-center">
            <Image src={logo} alt="Logo" className="mx-auto h-14 w-auto" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-custom-pink to-violet-500  inline-block text-transparent bg-clip-text leading-snug">BoardSync</h1>
            <h2 className="text-2xl font-semibold text-gray-700">Create your account</h2>
            <div className='flex justify-center mt-3'>
              <h2 className='text-md font-bold text-slate-900'>Have an account ?</h2>
              <Link href='/auth/login' className='text-md font-bold text-custom-pink/95 ml-1'>Log in now</Link>
            </div>
            
          </div>

          <div className="flex flex-col md:flex-row w-full justify-center space-y-2 md:space-y-0 md:space-x-2">
            <button
              type="button"
              className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 shadow-fuchsia-200 shadow-lg"
            >
              <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
              </svg>
              Sign up with Github
            </button>
            <button
              type="button"
              className="text-gray-700 border- border-slate-400 bg-slate-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-white/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[white]/55 shadow-fuchsia-200 shadow-lg hover:shadow-lg"
            >
            <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
              Sign up with Google
            </button>
          </div>

          <div className="text-sm text-gray-700 font-semibold">or continue with</div>

          <div className="w-full">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              className={`mt-1 block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus:shadow-lg focus:shadow-fuchsia-400`}
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 6,
                  message: 'Username must be at least 6 characters long',
                },
              })}
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
          </div>

          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:shadow-lg focus:shadow-fuchsia-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
                validate: {
                  emailAvailable: async (fieldValue) => {
                    const response = await fetch(
                      `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                    );
                    const data = await response.json();
                    return data.length === 0 || "Email already exists";
                  },
                },
              })}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div className="w-full relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className='w-full relative'><input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`mt-1 block w-full pr-10 px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:shadow-lg focus:shadow-fuchsia-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 justify-center"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-custom-purple">
  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
</svg>



              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-custom-purple">
  <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
</svg>




              )}
            </button></div>
            
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg shadow-custom-pink/50 text-sm font-medium text-white bg-custom-pink hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;


