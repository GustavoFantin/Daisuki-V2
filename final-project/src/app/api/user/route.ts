import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model"
import { NextResponse } from "next/server";


export async function GET() {
   try {
      await connectDB()

      const services = await User.find()
      return NextResponse.json(services, { status: 200 })
   } catch (err) {
      console.error(err)
      return NextResponse.json({ message: "Error on Users list", status: 404 })
   }

}