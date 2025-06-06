import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";



export async function POST(req: Request) {
      const { username, password, email, age, role } =  await req.json()

      await connectDB()

      const existUser = await User.exists({ username })
      if(existUser) {
      return NextResponse.json({ message:"Username is already in use", status: 400 });
      }  
      const hashedPassword = await bcrypt.hash(password, 12)
      
      const user = await User.create({
         username,
         password: hashedPassword,
         email,
         age,
         role
      })
      return NextResponse.json(user, {status: 201 })
}
