"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SignInPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ username, password }),
                }
            );

            if (!res.ok) {
                setError("Invalid credentials");
                console.error("Invalid credentials");
                return;
            }

            router.push("/service-list");
        } catch (e) {
            setError("Sign in failed");
            console.error("Sign in failed", e);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Sign In
                    </h2>
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-black text-white hover:bg-gray-800"
                        >
                            Sign In
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <a
                            onClick={() => router.push("/signup")}
                            className="text-pink-600 hover:underline cursor-pointer"
                        >
                            Sign Up
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInPage;
