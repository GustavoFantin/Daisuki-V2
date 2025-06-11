'use client'

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { NumberFormatter } from 'react-number-formatter';
const page = () => {  
  const [ number, setNumber ] = useState<string>('')
  

  return (
  <div className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,rgba(255,192,203,0.3),transparent_70%),radial-gradient(circle_at_90%_80%,rgba(255,182,193,0.2),transparent_70%)] flex items-center justify-center">
    <Card className="w-full max-w-4xl">
      
        <CardContent className="p-8 grid grid-cols-2 justify-center">
            <h1 className="text-3xl font-extrabold text-pink-700 drop-shadow mb-3">
              Daisuki
            </h1>
            <h2 className="text-2xl font-bold col-span-full">Contact Us!</h2>
            <div>
              <p className="text-md">Leave us a message for support, feedback or just a welcome!</p>
              <Image width={380} height={380} src={'/heart-icon.png'} alt="Heart"/>
            </div>
          <form className="space-y-4 flex flex-col w-full">
            <div>
              <span className="p-1">Full Name</span>
              <Input
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
            <span className="p-1">Email</span>
              <Input
                placeholder="Enter email"
                type="email"
                required
              />
            </div>
            <div>
              <span className="p-1">Phone Number</span>
              <NumberFormatter
                value={number}
                initialFormat={true}
                getValue={(n: string) => setNumber(n)}
                defaultCountry="CAN"
              />
            </div>
            <div>
              <span className="p-1">Your message</span>
              <Textarea
                placeholder="Enter message"
                required
                className="h-[80px] resize-none"
              />
            </div>

            <Button className="w-full bg-black text-white hover:bg-gray-800">
              Submit
            </Button>
          </form>

        </CardContent>
    </Card>
  </div>
  )
}

export default page