"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InteractiveElements from "../signin/InteractiveElements";
import Spline from "@splinetool/react-spline";
import { GoSignOut } from "react-icons/go";
import { RiUserReceivedFill } from "react-icons/ri";
import { BiSolidLockOpen } from "react-icons/bi";
import { MdMarkEmailRead } from "react-icons/md";


const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("client");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/signup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username,
                        password,
                        age: Number(age),
                        email,
                        role,
                    }),
                }
            );
            if (!res.ok) {
                setError("Sign up failed");
                return;
            }
            router.push("/signin");
        } catch (e) {
            setError("Sign up failed");
            console.error("Sign up failed", e);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {/** This is where the background spline is gonna go */}
            <div className="absolute inset-0 z-0">
           <Spline
        scene="https://prod.spline.design/LWt3oPTy9TFREp-n/scene.splinecode" />
                
            </div>      


            {/* THe overlay Display will go here
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" /> */}

            {/** Sign Up form */}
            <div className="relative z-20 flex items-center justify-center min-h-screen px-4">

            <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl">
                <CardContent className="p-8">

                    <div className="text-3xl font-bold text-white text-center mb-3 flex flex-col items-center">
                        <div className="bg-white rounded-md shadow-2xl shadow-black p-3">
                             <GoSignOut className="text-black" size={32} />
                        </div>
                       
                        <div className="text-2xl font-bold mb-6 text-center">
                        </div>
                        <span className="mt-2">Sign Up Here</span>
                    </div>

                    <div className="flex flex-col items-center mb-5">
                        <p className="text-lg text-white">Are You New Here? create An Account With US</p>

                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="relative">
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                            <RiUserReceivedFill className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/70 pointer-events-none" />
                        
                        </div>

                        <div className="relative">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                             <BiSolidLockOpen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/70 pointer-events-none" />
                        
                         </div>

                            <div>
                        <Input
                            type="number"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                        </div>


                        <div className="relative">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <MdMarkEmailRead className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/70 pointer-events-none" />
                        </div>
                        <select
                            className="w-full border  rounded-xl bg-white px-3 py-2"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="client">client</option>
                            <option value="admin">admin</option>
                        </select>
                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold flex items-center justify-center space-x-2 rounded-lg py-3 shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sign Up
                        </Button>
                    </form>

                    {/**This is The Sign Up buttons icons */}
                         <div className="my-6">
              <div className="flex items-center justify-center text-black text-sm mb-4">
                <span className="border-t border-white/30 flex-grow mr-3" />
                Or sign up with
                <span className="border-t border-white/30 flex-grow ml-3" />
              </div>
              <div className="flex justify-between space-x-4">
                <button className="flex-1 bg-white rounded-lg p-3 flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                  <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
                </button>
                <button className="flex-1 bg-white rounded-lg p-3 flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                  <img src="/facebook-icon.svg" alt="Facebook" className="h-5 w-5" />
                </button>
                <button className="flex-1 bg-white rounded-lg p-3 flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                  <img src="/apple-icon.svg" alt="Apple" className="h-5 w-5" />
                </button>
              </div>
            </div>


                </CardContent>
            </Card>
            <InteractiveElements />
            </div>
        </div>
    );
};

export default SignUpPage;
