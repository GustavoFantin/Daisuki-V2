import { connectDB } from "@/lib/mongodb"
import Order from "@/models/orders.model"
import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {

   try {
      await connectDB()
   
      const { id } = await params
   
      const orders = await Order.findById(id)
   
      return NextResponse.json(orders, { status: 200 })
      
   } catch (error) {
      console.error(error)
      NextResponse.json({ message: "unable to find order", status: 404 })   
   }

}

export async function PUT( req: Request, { params }: { params: Promise<{ id: string }> }) {
   try {
      await connectDB()

      const { id } = await params

      const newDate = await req.json()
   
      const paid = await Order.findByIdAndUpdate(id, newDate)
      if (!paid) return NextResponse.json({ message: "Error on finding order", status: 404 })
         
      return NextResponse.json(paid, { status: 200 })
   } catch (error) {
      console.error(error)
      return NextResponse.json({ message: "Error on updating order", status: 404 })
   } 
}