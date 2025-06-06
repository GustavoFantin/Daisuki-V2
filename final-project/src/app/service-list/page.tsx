"use client";

import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Girl } from "@/type";

export default function RentalGirlfriendList() {
    const [girls, setGirls] = useState<Girl[]>([]);
    const [nameFilter, setNameFilter] = useState("");
    const [ageRange, setAgeRange] = useState([18, 30]);
    const [heightRange, setHeightRange] = useState([150, 175]);
    const [nationalityFilter, setNationalityFilter] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([90, 200]);

    const originalGirls = useRef<Girl[]>([]);

    const [selectedGirl, setSelectedGirl] = useState<Girl | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const router = useRouter();

    const sideBarWidth = isSidebarOpen ? "w-64 h-full" : "w-14 h-auto";
    const sideBarButtonPosition = isSidebarOpen
        ? "flex justify-end"
        : "flex justify-center";

    const nationalities = [
        "Japanese",
        "Canadian",
        "Korean",
        "American",
        "Australian",
        "Swedish",
        "Taiwanese",
        "Kenyan",
        "Singaporean",
        "Mexican",
        "German",
        "French",
    ];

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
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/services`, {
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

    useEffect(() => {
        let filteredGirls = originalGirls.current;

        if (nameFilter) {
            filteredGirls = filteredGirls.filter((girl) =>
                girl.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        filteredGirls = filteredGirls.filter(
            (girl) => girl.age >= ageRange[0] && girl.age <= ageRange[1]
        );

        filteredGirls = filteredGirls.filter(
            (girl) =>
                girl.height >= heightRange[0] && girl.height <= heightRange[1]
        );

        if (nationalityFilter.length > 0) {
            filteredGirls = filteredGirls.filter((girl) =>
                nationalityFilter.includes(girl.nationality)
            );
        }

        filteredGirls = filteredGirls.filter(
            (girl) => girl.price >= priceRange[0] && girl.price <= priceRange[1]
        );

        setGirls(filteredGirls);
    }, [nameFilter, ageRange, heightRange, nationalityFilter, priceRange]);

    const toggleNationality = (nationality: string) => {
        if (nationalityFilter.includes(nationality)) {
            setNationalityFilter(
                nationalityFilter.filter((loc) => loc !== nationality)
            );
        } else {
            setNationalityFilter([...nationalityFilter, nationality]);
        }
    };

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
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/purchase/create-checkout-session`,
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
        <div className="flex min-h-screen bg-[radial-gradient(circle_at_10%_20%,rgba(255,192,203,0.3),transparent_70%),radial-gradient(circle_at_90%_80%,rgba(255,182,193,0.2),transparent_70%)]">
            {/* Filter sidebar */}
            <div
                className={`fixed top-[68px] left-2 ${sideBarWidth} bg-white p-4 shadow-md rounded-lg cursor-pointer`}
                style={{ zIndex: 2 }}
            >
                <div
                    className={`${sideBarButtonPosition} w-auto`}
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                >
                    <button className="flex justify-center items-center cursor-pointer">
                        {isSidebarOpen ? (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                                    fill="black"
                                />
                            </svg>
                        ) : (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 4H19L14 10.5V20L10 16V10.5L5 4Z"
                                    fill="black"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                {isSidebarOpen && (
                    <>
                        <h2 className="text-xl font-bold mb-6">Filter</h2>
                        {/* Name filter */}
                        <div className="mb-6">
                            <Label
                                htmlFor="name-filter"
                                className="block mb-2 font-medium"
                            >
                                Name
                            </Label>
                            <Input
                                id="name-filter"
                                type="text"
                                placeholder="Enter name"
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* Age filter */}
                        <div className="mb-6">
                            <Label className="block mb-2 font-medium">
                                Age: {ageRange[0]} - {ageRange[1]} years
                            </Label>
                            <Slider
                                defaultValue={ageRange}
                                min={18}
                                max={30}
                                step={1}
                                onValueChange={setAgeRange}
                                className="mb-2"
                            />
                        </div>

                        {/* Height filter */}
                        <div className="mb-6">
                            <Label className="block mb-2 font-medium">
                                Height: {heightRange[0]} - {heightRange[1]} cm
                            </Label>
                            <Slider
                                defaultValue={heightRange}
                                min={150}
                                max={175}
                                step={1}
                                onValueChange={setHeightRange}
                                className="mb-2"
                            />
                        </div>

                        {/* Price filter */}
                        <div className="mb-6">
                            <Label className="block mb-2 font-medium">
                                Price: ${priceRange[0].toLocaleString()} - $
                                {priceRange[1].toLocaleString()}
                            </Label>
                            <Slider
                                defaultValue={priceRange}
                                min={90}
                                max={200}
                                step={5}
                                onValueChange={setPriceRange}
                                className="mb-2"
                            />
                        </div>

                        {/* nationality filter */}
                        <div className="mb-6">
                            <Label className="block mb-2 font-medium">
                                Nationality
                            </Label>
                            <div className="space-y-2">
                                {nationalities.map(
                                    (nationality: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                id={`nationality-${nationality}`}
                                                checked={nationalityFilter.includes(
                                                    nationality
                                                )}
                                                onChange={() =>
                                                    toggleNationality(
                                                        nationality
                                                    )
                                                }
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={`nationality-${nationality}`}
                                            >
                                                {nationality}
                                            </label>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Girlfriends
                </h1>

                {/* Girls listing */}
                {girls.length > 0 ? (
                    <div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        style={{ direction: "rtl" }}
                    >
                        {girls.map((girl, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                            >
                                <div className="relative pb-full">
                                    <img
                                        src={girl.avatar as string}
                                        alt={girl.name}
                                        className="absolute w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-center">
                                        {girl.name}
                                    </h3>
                                    <button
                                        onClick={() => openProfile(girl)}
                                        className="mt-4 w-full bg-rose-500 cursor-pointer hover:bg-rose-600 text-white py-2 rounded-md transition-colors"
                                    >
                                        More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-12">
                        No girls found matching your criteria. Please adjust
                        your filter settings.
                    </div>
                )}
            </div>

            {/* Profile View Dialog */}
            {selectedGirl && (
                <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                    <DialogContent className="w-full max-w-lg md:max-w-4xl p-0 bg-gray-50 flex flex-col md:flex-row !rounded-lg">
                        <div className="flex flex-col md:flex-row h-full w-full">
                            <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col items-center">
                                <div className="rounded-full overflow-hidden w-40 h-40 md:w-64 md:h-64 border-2 border-black mx-auto">
                                    <img
                                        src={selectedGirl.avatar as string}
                                        alt={selectedGirl.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="mt-6 md:mt-8 space-y-3 w-full max-w-xs mx-auto text-sm md:text-base">
                                    <div className="flex gap-2">
                                        <span>You Can call Me </span>
                                        <span className="font-semibold">
                                            {selectedGirl.name}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span>I'm Stopped Counting at </span>
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

                                <button
                                    onClick={handleRentNow}
                                    className="mt-6 md:mt-8 bg-black text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold hover:bg-gray-800 transition-colors w-full max-w-xs cursor-pointer"
                                >
                                    Borrow Her Heart 💌
                                </button>
                            </div>

                            <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
                                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">
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
    );
}
