import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Order from "@/models/orders.model";

export async function GET() {
   try {
      await connectDB()
      
      const orders = await Order.find().populate('userId').populate('serviceId')
      return NextResponse.json(orders, { status: 200 })
   } catch (error) {
      console.error(error)
      return NextResponse.json({ message: "error loading orders", status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const { userId, serviceId } = await req.json()
      const order = await Order.create({ userId, serviceId })
      return NextResponse.json(order, { status: 201 })
   } catch (error) {
      console.error(error)
      return NextResponse.json({ message: "Error creating order", status: 404 })
   }
}
