import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { strict } from "assert";



export async function POST(req: Request) {
   try {
      (await cookies()).delete('token')
      return NextResponse.json({ message: "Logged out successfully", status: 204 })
   } catch (error) {
      console.error(error)
      return NextResponse.json({ message: "Unable to logout user.", status: 500 })
   }
}