"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spline from "@splinetool/react-spline";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GoSignIn } from "react-icons/go";
import InteractiveElements from "./InteractiveElements";
import { RiUserReceivedFill } from "react-icons/ri";
import { BiSolidLockOpen } from "react-icons/bi";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);


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
        setLoading(false);
        return;
      }


      router.push("/service-list");
    } catch (e) {
      setError("Sign in failed");
      console.error("Sign in failed", e);
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Background Spline well lets hope it works */}
      <div className="absolute inset-0 z-0">
        <Spline
        scene="https://prod.spline.design/LWt3oPTy9TFREp-n/scene.splinecode" />
      </div>

      {/* Overlay display will go here
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" /> */}

      {/* Sign In Form */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl">
          <CardContent className="p-8">

            <div className="text-3xl font-bold text-white text-center mb-3 flex flex-col items-center">
              <div className="bg-white rounded-md shadow-2xl shadow-black p-3">
                <GoSignIn className="text-black" size={32} />
              </div>
              <span className="mt-2">Sign In Here</span>
            </div>

            <div className="flex flex-col items-center mb-5">
              <p className="text-lg text-white">Welcome Back Partner! Let's log you back in.</p>
            </div>



            <form onSubmit={handleSignIn} className="space-y-5">
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

              <span className="flex flex-col text-right text-white cursor-pointer hover:underline mb-2">
                Forgot Password?
              </span>



         {error && <div className="text-red-400 text-sm">{error}</div>}

           <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold flex items-center justify-center space-x-2 rounded-lg py-3 shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                                      <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                ) : (
                  <GoSignIn size={20} />
                )}
                <span>{loading ? "Signing In..." : "Sign In"}</span>
              </Button>
            </form>

            <div className="my-6">
              <div className="flex items-center justify-center text-black text-sm mb-4">
                <span className="border-t border-white/30 flex-grow mr-3" />
                Or sign in with
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

            <div className="mt-4 text-center text-sm text-white/80 cursor-pointer">
              Don't have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-pink-400 hover:underline cursor-pointer mr-2"
              >
                Sign Up
              </span>
            </div>
          </CardContent>
        </Card>
        <InteractiveElements />
      </div>
    </div>
  );
};

export default SignInPage;
