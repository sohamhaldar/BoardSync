'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import BubbleBackground from './BubbleBackground';
import image from '../../public/image.png';
import Board from '../../public/board-2-cut.png';
import Chats from '../../public/chats.png';
import Dashboard from '../../public/dashboard.png';
import HeroImg from '../../public/heroImage.png';
import { useScroll } from '@/context/ScrollProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Home() {
  const { activeSection } = useScroll();
  const router=useRouter();

  useEffect(() => {
    if (activeSection) {
      if(activeSection=='home'){
        window.scrollTo(0, 0);
      }else{
        const element = document.getElementById(activeSection);
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      }
      
      
    }
  }, [activeSection]);

  return (
    <>
      <div className='relative z-0 min-h-[90vh] w-full flex flex-col md:flex-row justify-evenly items-center px-4 md:px-8 py-8 md:py-0'>
        <BubbleBackground />
        <div id="home" className='relative z-10 w-full md:w-[45%] flex flex-col justify-center items-center mb-8 md:mb-0'>
          <h1 className='text-white text-4xl md:text-5xl font-extrabold text-center m-2'>
            Where Creativity Meets Collaboration
          </h1>
          <p className='text-lg text-slate-200 font-semibold m-2 text-center'>
            A whiteboard where you can draw your ideas, connect and collaborate with others, and turn creativity into innovation.
          </p>
          <div className='w-full md:w-[80%] flex flex-col sm:flex-row justify-evenly m-4'>
            <button onClick={()=>router.push('/auth/signup')} className='bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 py-2.5 px-4 text-slate-50 rounded-lg text-lg font-semibold text-center flex items-center justify-center mb-4 sm:mb-0 sm:mr-2 w-full sm:w-auto'>
              Get Started
              <svg className='w-6 h-4 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 24'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4' d='m9 5 7 7-7 7' />
              </svg>
            </button>
            <button onClick={()=>router.push('/auth/login')} className='bg-gradient-to-r from-slate-50 via-slate-200 to-slate-300 text-slate-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none py-2.5 px-4 rounded-lg text-lg font-semibold text-center flex items-center justify-center w-full sm:w-auto'>
              Login
            </button>
          </div>
        </div>
        <div className='relative z-10 w-full md:w-[45%] flex justify-center'>
          <Image 
            alt='HomePageDemo' 
            src={HeroImg} 
            className='w-full h-auto max-w-md md:max-w-full rounded-lg'
            width={800}
            height={600}
            priority
          />
        </div>
      </div>

 
<section id="features" className="relative bg-gradient-to-br from-white via-purple-50 to-pink-100 py-20 overflow-hidden">
  <div className="container mx-auto px-4 relative z-10">
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 mb-24 animate-gradient p-4 leading-tight">
  Collaborate and Create Together
</h2>
    
    
    <div className="flex flex-col md:flex-row items-center mb-40 relative">
      <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Realtime Collaborative Whiteboard
        </h3>
        <p className="text-gray-600 text-xl leading-relaxed mb-6">
          Experience seamless teamwork with our real-time collaborative whiteboard. Multiple users can draw, write, and manipulate objects simultaneously, seeing each other&lsquo;s changes instantly.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-lg">
          <li>Multi-user real-time editing</li>
          <li>Instant synchronization across devices</li>
          <li>Perfect for brainstorming and planning</li>
        </ul>
      </div>
      <div className="md:w-1/2">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-1">
          <Image src={Board} alt="Collaborative Whiteboard" className="w-full h-auto" />
        </div>
      </div>
    </div>

    
    <div className="flex flex-col md:flex-row-reverse items-center mb-32 relative">
      <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Integrated Group Chat
        </h3>
        <p className="text-gray-600 text-xl leading-relaxed mb-6">
          Keep communication flowing with our built-in chat feature. Discuss ideas, share links, or provide context without leaving the whiteboard interface.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-lg">
          <li>Seamless integration with whiteboard</li>
          {/* <li>File sharing and link embedding</li> */}
          <li>Recorded chat history</li>
        </ul>
      </div>
      <div className="md:w-1/2">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
          <Image src={Chats} alt="Integrated Group Chat" className="w-full h-auto" />
        </div>
      </div>
    </div>

    
    <div className="flex flex-col md:flex-row mb-40 items-center relative">
      <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Instant sharing
        </h3>
        <p className="text-gray-600 text-xl leading-relaxed mb-6">
          Collaborate with anyone, anywhere, at any time. Share your whiteboard with a simple link.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-lg">
          <li>No downloads or installations required</li>
          <li>Control access levels to ensure your work remains secure</li>
          <li>Various sharing platforms to choose from</li>
        </ul>
      </div>
      <div className="md:w-1/2">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-1">
          <Image src={Board} alt="Advanced Tools and Templates" className="w-full h-auto" />
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row-reverse items-center mb-32 relative">
          <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Multiple Workspace for Multiple Work
            </h3>
            <p className="text-gray-600 text-xl leading-relaxed mb-6">
            Create multiple boards for different projects. All your workspaces are automatically saved in the cloud, allowing you to access them from any device, at any time. 
            </p>
            <ul className="list-disc list-inside text-gray-600 text-lg">
              <li>Create as many whiteboard as you want</li>
              {/* <li>File sharing and link embedding</li> */}
              <li>Invite as many members as you want</li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
              <Image src={Dashboard} alt="Integrated Group Chat" className="w-full h-auto" />
            </div>
          </div>
    </div>

  </div>

  
  
  
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    
    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-300 to-pink-300 opacity-40 rounded-full blur-3xl animate-float"></div>
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-yellow-200 to-pink-300 opacity-30 rounded-full blur-3xl animate-float animation-delay-2000"></div>
    <div className="absolute top-1/2 left-1/4 w-56 h-56 bg-gradient-to-tr from-pink-500 to-purple-400 opacity-40 rounded-full blur-3xl animate-float animation-delay-4000"></div>
    
    
    <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(81, 56, 238, 0.1)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
    
    {/* Floating icons */}
    <div className="absolute top-1/4 right-10 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce-slow">
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
    </div>
    <div className="absolute lg:bottom-2/4 -bottom-1/3 left-10 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
      <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
  </div>

  
  <div id="about" className="mt-32 bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-50 backdrop-filter backdrop-blur-lg  p-8 shadow-xl">
    <h3 className="text-3xl font-bold text-center text-white mb-8">Open Source and Free Forever</h3>
    <p className="text-xl text-white text-center mb-8">
      Our project is completely open-source and free to use. We believe in the power of collaboration and community-driven development.
    </p>
    <div className="flex justify-center space-x-6">
      <a href="#" className="bg-gray-800 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition duration-300">
        View on GitHub
      </a>
      
    </div>
  </div>

  {/* Call to action */}
  <div className="mt-20 text-center">
    <h3 className="text-4xl font-bold text-gray-800 mb-6">Ready to Transform Your Collaboration?</h3>
    <p className="text-xl text-gray-600 mb-8">Start using our platform today and experience the power of open-source collaboration.</p>
    <a href="/auth/signup" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full text-xl hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105">
      Get Started Now
    </a>
  </div>
  
  
</section>
<footer className="bg-gray-100 py-6 z-10 relative">
  <div className="container mx-auto text-center">
    <p className="text-gray-600 text-lg font-bold">
      Made with <span className="text-red-500">❤</span> by {' '}
      <a 
        href="https://www.linkedin.com/in/soham-haldar/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Soham Haldar
      </a>
    </p>
  </div>
</footer>


    </>
  );
}

export default Home;
