"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { UserProfile } from "@/type";

const UserProfilePage = () => {
    const params = useParams();
    const userId = params?.id as string;

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (!userId) return;
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data: UserProfile) => {
                setProfile(data);
                setFormData(data);
            });
    }, [userId]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (!formData) return;
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        if (!formData || !userId) return;
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        setProfile(formData);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="bg-gray-50 border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 sm:mb-0">
                                <Avatar className="h-24 w-24 border-2 border-gray-200">
                                    <div className="h-full w-full bg-gray-200 rounded-full flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle
                                                cx="12"
                                                cy="7"
                                                r="4"
                                            ></circle>
                                        </svg>
                                    </div>
                                </Avatar>
                                <div className="space-y-4 w-full">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-lg w-40">
                                                ACCOUNT:
                                            </span>
                                            {isEditing ? (
                                                <Input
                                                    name="username"
                                                    value={
                                                        formData?.username || ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="max-w-[300px]"
                                                />
                                            ) : (
                                                <span>{profile?.username}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-lg w-40">
                                                PASSWORD:
                                            </span>
                                            {isEditing ? (
                                                <Input
                                                    name="password"
                                                    type="password"
                                                    value={
                                                        formData?.password || ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="max-w-[300px]"
                                                />
                                            ) : (
                                                <span>{profile?.password}</span>
                                            )}
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="font-semibold text-lg w-40">
                                                SELF INTRODUCTION:
                                            </span>
                                            {isEditing ? (
                                                <Textarea
                                                    name="selfIntroduction"
                                                    value={
                                                        formData?.email || ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="max-w-[300px]"
                                                    rows={3}
                                                />
                                            ) : (
                                                <span className="max-w-[300px]">
                                                    {profile?.selfIntroduction ||
                                                        "Hi, Nice to meet you !"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isEditing ? (
                                <Button
                                    onClick={handleSave}
                                    className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-2"
                                >
                                    SAVE
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-2"
                                >
                                    EDIT
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">ORDER HISTORY</h2>
                    <Card className="border-none shadow-sm">
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]"></TableHead>
                                        <TableHead>Girl name</TableHead>
                                        <TableHead>Total price</TableHead>
                                        <TableHead>Paid Date</TableHead>
                                        <TableHead>Order id</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Future implementation: map orders here */}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
