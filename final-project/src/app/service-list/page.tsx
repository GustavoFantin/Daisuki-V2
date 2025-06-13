"use client";

import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Girl } from "@/type";
import Image from "next/image";
import Background from "../about/Background";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BurgerMenu from "@/components/BurgerMenu";
import { PulseLoader } from 'react-spinners'

export default function RentalGirlfriendList() {
    const [girls, setGirls] = useState<Girl[]>([]);
    const originalGirls = useRef<Girl[]>([]);

    const [selectedGirl, setSelectedGirl] = useState<Girl | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );
    const [menuOpen, setMenuOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const isSuccess = params.get("isSuccess");
        if (isSuccess === "true") {
            toast.success("Payment successful! Thank you for your purchase.");
            params.delete("isSuccess");
            router.replace(`?${params.toString()}`);
        } else if (isSuccess === "false") {
            toast.error("Payment was cancelled or failed.");
            params.delete("isSuccess");
            router.replace(`?${params.toString()}`);
        }
    }, [router]);

    useEffect(() => {
        fetch(`/api/services`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data: Girl[]) => {
                originalGirls.current = data;
                setGirls(data);
            })
            .catch(() => {
                originalGirls.current = [];
                setGirls([]);
            });
    }, []);

    const openProfile = (girl: Girl) => {
        setSelectedGirl(girl);
        setIsProfileOpen(true);
    };

    const handleRentNow = () => {
        setIsRentalModalOpen(true);
    };

    const handleCheckout = async () => {
        setIsRentalModalOpen(false);

        const res = await fetch(
            `/api/purchase/create-checkout-session`,
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price_id: selectedGirl?.price_id }),
            }
        );

        if (!res.ok) {
            console.error("Invalid credentials");
            return;
        }

        const data = await res.json();
        window.location.href = data.url;
    };

    const styles = `
    .pb-full {
      padding-bottom: 100%;
    }
  `;

    if (typeof document !== "undefined") {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    return (
        <>
            <Header setMenuOpen={setMenuOpen} />
            <BurgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Background />
            <div className="flex min-h-screen mt-20">
                {/* Main content */}
                <div className="flex-1 p-6 flex flex-col">
                    <h1 className="text-6xl font-bold mb-8 text-center">
                        Girlfriends
                    </h1>

                    {/* Girls listing */}
                    {girls.length > 0 ? (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:px-20 lg:px-30 px-10"
                        >
                            {girls.map((girl, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                                    onClick={() => openProfile(girl)}
                                >
                                    <div className="relative pb-full">
                                        <Image
                                            src={girl.avatar as string}
                                            alt={girl.name}
                                            className="absolute w-full h-full object-cover"
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-center">
                                            {girl.name}
                                        </h3>
                                    </div>
                                    <div className="px-7 pb-4 text-blue-400">
                                        {girl.hashtags?.map((tag, tagIndex) => (
                                            <div key={`${index}-${tagIndex}`} className="font-bold">#{tag}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center gap-4 pt-20">
                            <div className="text-3xl">Loading</div>
                            <PulseLoader /> 
                        </div>
                    )}
                </div>

                {/* Profile View Dialog */}
                {selectedGirl && (
                    <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                        <DialogContent className="w-full max-w-lg md:max-w-4xl p-0 bg-gray-50 flex flex-col md:flex-row !rounded-lg">
                            <DialogTitle className="sr-only">
                                {selectedGirl.name} Profile
                            </DialogTitle>
                            <div className="flex flex-col md:flex-row h-full w-full">
                                <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col items-center justify-center">
                                    <div className="rounded-full overflow-hidden w-40 h-40 md:w-64 md:h-64 border-2 border-black mx-auto">
                                        <Image
                                            src={selectedGirl.avatar as string}
                                            alt={selectedGirl.name}
                                            className="w-full h-full object-cover"
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                    <button
                                        onClick={handleRentNow}
                                        className="mt-6 md:mt-8 bg-black text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold hover:bg-gray-800 transition-colors w-full max-w-xs cursor-pointer"
                                    >
                                        Borrow Her Heart 💌
                                    </button>
                                </div>

                                <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
                                    <div className="mt-6 md:mt-8 space-y-3 w-full max-w-xs mx-auto text-sm md:text-base">
                                        <div className="flex gap-2">
                                            <span>You Can call Me </span>
                                            <span className="font-semibold">
                                                {selectedGirl.name}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>
                                                I&apos;m Stopped Counting at{" "}
                                            </span>
                                            <span className="font-semibold">
                                                {selectedGirl.age}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>and Import From</span>
                                            <span className="font-semibold">
                                                {selectedGirl.nationality}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>My 24h Romance Budget is </span>
                                            <span className="font-semibold">
                                                $
                                                {selectedGirl.price.toLocaleString()}{" "}
                                                / h
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>Open for a Memory:</span>
                                            <span className="font-semibold">
                                                {selectedGirl.available_time}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 mt-4 text-center">
                                        BIO
                                    </h3>
                                    <div className="bg-gray-200 p-3 md:p-4 rounded min-h-32 md:min-h-40 border border-gray-400 text-sm md:text-base">
                                        <p>{selectedGirl.self_introduction}</p>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}

                {/* Rental Date Modal */}
                <Dialog
                    open={isRentalModalOpen}
                    onOpenChange={setIsRentalModalOpen}
                >
                    <DialogContent className="w-full max-w-xs sm:max-w-md p-4 sm:p-6">
                        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <DialogTitle className="sr-only">Rental</DialogTitle>
                            <DialogClose className="h-4 w-4">
                                <span className="sr-only">Close</span>
                            </DialogClose>
                        </div>
                        <DialogTitle className="text-center text-lg sm:text-xl font-bold mb-2 sm:mb-4">
                            Choose a day ...
                        </DialogTitle>
                        <div className="py-2 sm:py-4 flex justify-center">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="mx-auto"
                                disabled={(date) => {
                                    const today = new Date();
                                    const yesterday = new Date(today);
                                    yesterday.setDate(today.getDate() - 1);

                                    return date < yesterday;
                                }}
                            />
                        </div>
                        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-4 justify-between mt-4">
                            <button
                                onClick={() => setIsRentalModalOpen(false)}
                                className="bg-white text-gray-800 border-1 border-gray-800 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors w-full sm:w-auto cursor-pointer"
                            >
                                CANCEL
                            </button>
                            <button
                                onClick={handleCheckout}
                                className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors w-full sm:w-auto cursor-pointer"
                            >
                                CHECKOUT
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Footer />
        </>
    );
}
