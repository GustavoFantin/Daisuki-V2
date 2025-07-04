import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/app/utils/jwt";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
            return NextResponse.json({
                message: "Username/Password missing!",
                status: 400,
            });
        }
        await connectDB()
        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({
                message: "Username/Password Incorrect!",
                status: 401,
            });
        }

        console.log("User found:", user);
        console.log("password:", password);

        const isValid: boolean = await bcrypt.compare(password, user.password);

        console.log("Is Valid:", isValid);

        if (isValid) {
            const token = generateToken({
                username,
                userId: user._id,
                role: user.role,
            });

            console.log("Generated Token:", token);

            const response = NextResponse.json({ message: "Login success", status: 200 });

            response.cookies.set("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
                secure: true,
            });

            return response
        } else {
            return NextResponse.json({
                message: "Username/Password incorrect!",
                status: 401,
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Unable to login user.",
            status: 500,
        });
    }
}
