'use client';
import React, { useState, useEffect } from 'react';
import logo from '../../public/logo.png'
import Image from 'next/image';
import { useScroll } from '@/context/ScrollProvider';
import { useRouter } from 'next/navigation';

function Header() {
  const [bgColor, setBgColor] = useState('bg-transparent');
  const [textColor,setTextColor]=useState('text-slate-50')
  const [logoColor,setlogoColor]=useState('text-black')
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollToSection } = useScroll();
  const router = useRouter();

  const handleNavigation = (sectionId: string) => {
    router.push('/');
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !isMenuOpen) {
        setBgColor('bg-slate-50 shadow-md bg-opacity-100 text-slate-800');
        setTextColor('text-slate-800');
        setlogoColor('bg-gradient-to-r from-custom-pink to-violet-500  inline-block text-transparent bg-clip-text leading-snug')
      } else {
        setBgColor('bg-transparent');
        setTextColor('text-slate-50');
        setlogoColor('text-black')
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
    <div className={`flex flex-col lg:flex-row justify-evenly items-center h-auto lg:h-[10vh] sticky top-0 z-20 transition-colors duration-300 rounded-b-xl p-4 lg:p-0 ${bgColor} animate-dropDown`}>
      <div className={`flex justify-between items-center w-full lg:w-auto ${isMenuOpen ? 'hidden' : ''}`}>
        <div className='flex justify-center items-center hover:cursor-pointer' onClick={()=>router.push('/')}>
          <Image src={logo} alt="Logo" className="md:mx-auto h-6 w-10 m-2" />
          <h1 className={`font-bold m-2 text-2xl ${logoColor}`}>BoardSync</h1>
        </div>
        
        <button
          className='lg:hidden flex items-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 text-center text-slate-50 font-semibold rounded-lg p-2 px-3'
          onClick={toggleMenu}
        >
          <span className="mr-2">Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='w-6 h-6 text-slate-50'>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Rest of the component remains unchanged */}
      <div className='hidden lg:flex w-full lg:w-[30%] justify-evenly items-center'>
        <button onClick={() => handleNavigation('home')} className={`text-center font-semibold h-[70%] rounded-lg p-2 px-3 hover:bg-slate-700 hover:bg-opacity-20 ${textColor}`}>Home</button>
        <button onClick={() => handleNavigation('features')} className={`text-center font-semibold h-[70%] rounded-lg p-2 px-3 hover:bg-slate-700 hover:bg-opacity-20 ${textColor}`}>Features</button>
        <button onClick={() => handleNavigation('about')} className={`text-center font-semibold h-[70%] rounded-lg p-2 px-3 hover:bg-slate-700 hover:bg-opacity-20 ${textColor}`}>About</button>
      </div>

      <div className='hidden lg:flex w-full lg:w-[20%] justify-evenly items-center'>
        <button onClick={()=>router.push('/auth/signup')} className='flex items-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 text-center text-slate-50 font-semibold h-[70%] rounded-lg p-2 px-3'>
          Get Started
          <svg className='w-3 h-3 text-slate-50 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 20 22'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4' d='m9 5 7 7-7 7' />
          </svg>
        </button>
        <button onClick={()=>router.push('/auth/login')} className='flex items-center bg-gradient-to-r from-slate-50 via-slate-200 to-slate-300 hover:bg-gradient-to-br text-center text-slate-800 font-semibold h-[70%] rounded-lg p-2 px-3'>Login</button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='absolute top-0 left-0 right-0 bg-slate-700 rounded-b-lg p-4 transition-all duration-300 animate-dropDown'>
          <div className='flex justify-between items-center'>
            <div className='text-xl font-bold text-slate-50'>BoardSync</div>
            <button
              className='text-slate-50'
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className='flex flex-col items-center mt-4'>
          <button onClick={() => handleNavigation('home')} className='text-center text-slate-50 font-semibold my-1 rounded-lg p-2 px-3 hover:bg-slate-600'>Home</button>
            <button onClick={() => handleNavigation('features')} className='text-center text-slate-50 font-semibold my-1 rounded-lg p-2 px-3 hover:bg-slate-600'>Features</button>
            <button onClick={() => handleNavigation('about')} className='text-center text-slate-50 font-semibold my-1 rounded-lg p-2 px-3 hover:bg-slate-600'>About</button>
            <button onClick={()=>{
              router.push('/auth/signup')
              toggleMenu()
            }} className='w-[80%] flex items-center justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 text-center text-slate-50 font-semibold rounded-lg p-2 px-3 my-1'>
              Get Started
              <svg className='size-3 text-slate-50 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 20 22'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4' d='m9 5 7 7-7 7' />
              </svg>
            </button>
            <button onClick={()=>{
              router.push('/auth/login')
              toggleMenu();
              }} className='w-[80%] flex items-center justify-center bg-gradient-to-r from-slate-50 via-slate-200 to-slate-300 hover:bg-gradient-to-br text-center text-slate-800 font-semibold rounded-lg p-2 px-3 my-1'>Login</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;