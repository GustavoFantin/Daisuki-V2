import { connectDB } from "@/lib/mongodb";
import Service from "@/models/services.model"
import { NextResponse } from "next/server";


export async function GET() {
   try {
      await connectDB()

      const services = await Service.find()
      return NextResponse.json(services, { status: 200 })
   } catch (err) {
      console.error(err)
      return NextResponse.json({ message: "Error on services list", status: 404 })
   }

}