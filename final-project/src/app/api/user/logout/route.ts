import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        (await cookies()).delete("token");

        const cookieStore = await cookies();
        const hasCookie = cookieStore.has("token");
        if (hasCookie) {
            console.log("");
        }

        return NextResponse.json({
            message: "Logged out successfully",
            status: 204,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Unable to logout user.",
            status: 500,
        });
    }
}
