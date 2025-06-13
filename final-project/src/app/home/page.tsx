'use client'

import  './styles.css'
import { Background } from './Background'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';


export default function NewHome() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return <>
      <Background />
      <div 
        className='flex lg:justify-start items-end justify-center '
        style={{ position: 'absolute', pointerEvents: 'none', top: 0, left: 0, width: '100vw', height: '100vh' }}
      >
        <div className='hidden md:block'>
          <div className="char" style={{ top: 40, left: 40 }}>
            D
          </div>
          <div className="char" style={{ top: 40, left: '20vw' }}>
            A
          </div>
          <div className="char" style={{ top: 40, left: '40vw' }}>
            I
          </div>
          <div className="char" style={{ top: '20vw', left: 40 }}> 
            S
          </div>
          <div className="char" style={{ bottom: 40, right: '30vw' }}>
            U
          </div>
          <div className="char" style={{ bottom: 40, right: 40 }}>
            KI
          </div>
        </div>
        <div className='block md:hidden'>
          <div className="char" style={{ top: 70, left: 40 }}>
            D
          </div>
          <div className="char" style={{ top: 70, left: '20vw' }}>
            A
          </div>
          <div className="char" style={{ top: 70, left: '40vw' }}>
            I
          </div>
          <div className="char" style={{ top: '35vw', left: 40 }}> 
            S
          </div>
          <div className="char" style={{ bottom: 100, right: '30vw' }}>
            U
          </div>
          <div className="char" style={{ bottom: 100, right: 40 }}>
            KI
          </div>
        </div>
        <div style={{ position: 'absolute', top: 80, right: 40, fontSize: '18px', textAlign: 'right', color: 'white' }}>
          {/* Find The Perfect Partner for You
          <br /> */}
        </div>
        <div style={{ position: 'absolute', top: 40, right: 40, fontSize: '15px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
        </div>
        <div>
        <div 
          className='flex flex-col gap-4 lg:ml-40 lg:mb-20 mb-40 text-white'
          style={{ position: 'relative', marginTop: 10 }}
        >
          <a style={{ fontSize: '15px', fontWeight: 600, letterSpacing: 2 }}>
            <Button
              onClick={() => router.push("/signin")}
              className="px-8 py-4 text-lg bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-xl transition-all duration-300 cursor-pointer"
            >
              Sign In / Login Here
            </Button>
          </a>
        </div>
        <br />
      </div>
    </div>
  </>
}