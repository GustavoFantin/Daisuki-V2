import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/utils/jwt";
import { cookies } from "next/headers";




export async function POST(req: Request) {
   try {
      const { username, password } =  await req.json()
      if(!username || !password) {
         return NextResponse.json({ message: "Username/Password missing!", status:400 })
      }
      const user = await User.findOne({ username })

      if(!user) {
         return NextResponse.json({ message: "Username/Password Incorrect!", status: 401 })
      }

      const isValid: boolean = await bcrypt.compare(password, user.password);

      if (isValid) {
         const token = generateToken({
            username,
            userId: user._id,
            role: user.role
         });
         const serverCookies = await cookies()
         serverCookies.set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
         })
         
         return NextResponse.json({ message: "Login success", status: 200 })
      } else {
         return NextResponse.json({ message: "Username/Password incorrect!", status: 401 })
      }
   } catch (error) {
      console.error(error)
      return NextResponse.json({ message: "Unable to login user.", status: 500 })
   }
}