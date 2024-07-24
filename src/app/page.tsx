import Image from "next/image";
import Home from "@/components/Home";
import Header from "@/components/Header";


export default function HomePage() {
  return (
    <div className='bg-custom-gradient h-[200vh] animate-fadeIn'>
        <Header/>
        <Home/>
    </div>
  );
}
