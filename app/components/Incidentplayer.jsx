"use client";
import { StopCircleIcon } from '@heroicons/react/24/solid'
import LiveDateTime from "./LiveDateTime";
import Image from 'next/image';

const Incidentplayer = () => {
  return (
    <div className='relative bg-gray-800 border-2 border-gray-700 rounded-lg shadow-md overflow-hidden p-4'>
         <div className='relative aspect-video rounded-md overflow-hidden'>
            <video
                src="/videos/CCTV.mp4"
                className='w-full h-full object-cover'
                autoPlay
                muted
                loop
                />

                <div className="absolute left-2 top-2 bg-black/80 text-white px-2 py-1 rounded">
                    <span className="text-sm font-semibold">  <LiveDateTime /> </span>
                </div>

                <div className="absolute bottom-2 right-2 flex gap-2">
                    <div className="bg-black/80 text-white rounded-sm flex flex-col items-center justify-center"> 
                    <span className="text-sm font-semibold">Camera - 02</span>
                    <Image 
                    src="/images/Cover1.png"
                      alt="Cam 2"
                      width={120} 
                      height={80}
                      className="w-30 h-20 rounded-b-sm" />
                    </div>
                    
                     <div className="bg-black/80 text-white rounded-sm flex flex-col items-center justify-center"> 
                    <span className="text-sm font-semibold">Camera - 03</span>
                     <Image 
                    src="/images/Cover2.png" 
                      alt="Cam 3"
                      width={120} 
                      height={80} 
                      className="w-30 h-20 rounded-md" 
                    />
                    </div>
                   
                </div>

                <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded flex items-center">
                    <StopCircleIcon className='w-6 h-6 text-red-600'/>
                    <span className="text-sm font-semibold">  Camera - 01</span>
                </div>
         </div>
    </div>
  )
}

export default Incidentplayer
