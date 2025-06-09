import { connectDB } from "@/lib/mongodb"
import Service from "@/models/services.model"
import { NextResponse } from "next/server"

export async function GET( _: Request, { params }: { params: { id: string } }) {

   try {
      await connectDB()
   
      const { id } = await params
   
      const services = await Service.findById(id)
   
      return NextResponse.json(services, { status: 200 })
      
   } catch (error) {
      console.error(error)
      NextResponse.json({ message: "unable to find service", status: 404 })   
   }

}