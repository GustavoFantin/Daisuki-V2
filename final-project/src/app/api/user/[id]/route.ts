import { connectDB } from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";


export async function GET( _: Request, { params }: { params: { id: string } }) {
   await connectDB()

   const cookieStore = await cookies()
   const hasCookie = cookieStore.has('token')
   
   if(!hasCookie) return NextResponse.json({ message: "You have to login to access this route", status: 404 });

   const { id } = await params

   const user = await User.findById(id)
   
   if (!user) return NextResponse.json({ message: "User not found!", status: 404 })

   return NextResponse.json(user, { status: 200 })

}

export async function PUT(req: Request, { params }: { params: { id: string }}) {
   try {
      await connectDB()
         const cookieStore = await cookies()
         const hasCookie = cookieStore.has('token')

         if(hasCookie) {
            const { id } = await params
         const { username, password, age, email } = await req.json()
         const updatedUser: Partial<IUser> = { username, age, email }

         if (password) {
            updatedUser.password = await bcrypt.hash(password, 12)
            return NextResponse.json({ message: "Password updated", status: 200 })
         }

         const user = await User.findByIdAndUpdate(id, updatedUser, {
            new: true
         })

         if (!user) return NextResponse.json({ message: "User not found", status: 404 })

         return NextResponse.json({ message: "User updated", status: 200 })
         }

   } catch (err) {
      console.error(err)
      NextResponse.json({ message: "Unable to update user", status: 500 })
   }
   
}