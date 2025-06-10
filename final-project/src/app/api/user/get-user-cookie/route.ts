import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
    const SECRET_KEY = process.env.JWT_SECRET || "jfdhuifhkewuhr";

    const token = request.cookies.get("token")?.value;
    console.log(token);

    const corsHeaders = {
        "Access-Control-Allow-Origin":
            process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    if (!token) {
        return NextResponse.json(
            { message: "No token provided" },
            { status: 401, headers: corsHeaders }
        );
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return NextResponse.json(decoded, {
            status: 200,
            headers: corsHeaders,
        });
    } catch (err) {
        console.error("Token verification failed:", err);
        return NextResponse.json(
            { message: "Invalid token" },
            { status: 403, headers: corsHeaders }
        );
    }
}
