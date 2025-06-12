"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GirlFormData } from "@/type";

const RentalGirlfriendAdmin = () => {
    const [girlfriends, setGirlfriends] = useState<GirlFormData[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currentGirlfriend, setCurrentGirlfriend] =
        useState<GirlFormData | null>(null);
    const [formData, setFormData] = useState<GirlFormData>({
        id: "",
        name: "",
        age: 20,
        height: 160,
        nationality: "",
        price: 5000,
        avatar: undefined,
        self_introduction: "",
        available_time: "",
    });

    const router = useRouter();

    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-user-cookie`,
            {
                credentials: "include",
            }
        )
            .then(async (res) => {
                if (!res.ok) 
                    {
                        router.replace("/service-list");                        
                        throw new Error("No user")
                    };
                const data = await res.json();
                if (!data || data.role !== "admin") {
                    router.replace("/service-list");
                }
            })
            .catch(() => {
                console.log("No user data");
            });

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data: GirlFormData[]) => setGirlfriends(data))
            .catch(() => setGirlfriends([]));
    }, [router]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData((prev) => ({
                ...prev,
                avatar: file,
            }));
        }
    };

    const handleSelectChange = (value: string, name: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const openAddDialog = () => {
        setFormData({
            id: "",
            name: "",
            age: 20,
            height: 160,
            nationality: "",
            available_time: "Weekends",
            price: 5000,
            self_introduction: "",
            avatar: undefined,
        });
        setIsAddDialogOpen(true);
    };

    const openEditDialog = (girlfriend: GirlFormData) => {
        setCurrentGirlfriend(girlfriend);
        setFormData({ ...girlfriend });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (girlfriend: GirlFormData) => {
        setCurrentGirlfriend(girlfriend);
        setIsDeleteDialogOpen(true);
    };

    const handleAdd = async () => {
        try {
            const form = new FormData();
            form.append("name", formData.name);
            form.append("height", String(formData.height));
            form.append("nationality", formData.nationality);
            form.append("self_introduction", formData.self_introduction);
            form.append("price", String(formData.price));
            form.append("available_time", formData.available_time);
            form.append("age", String(formData.age));

            if (formData.avatar) {
                form.append("avatar", formData.avatar);
            }

            await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/service`,
                {
                    credentials: "include",
                    method: "POST",
                    body: form,
                }
            );

            setGirlfriends([...girlfriends, formData]);
            setIsAddDialogOpen(false);
        } catch (e) {
            console.error("Error adding girlfriend:", e);
        }
    };

    const handleUpdate = async () => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/service/${formData.id}`,
                {
                    credentials: "include",
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
        } catch (e) {
            console.error("Error updating girlfriend:", e);
        }
        setGirlfriends((girlfriends) =>
            girlfriends.map((g) => (g.id === formData.id ? formData : g))
        );
        setIsEditDialogOpen(false);
    };

    const handleDelete = async () => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/service/${currentGirlfriend?.id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
        } catch (e) {
            console.error("Error deleting girlfriend:", e);
        }
        setGirlfriends((girlfriends) =>
            girlfriends.filter((g) => g.id !== currentGirlfriend?.id)
        );
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => router.push("/service-list")}
                            className="bg-white text-black border-1 border-black cursor-pointer hover:bg-gray-200"
                        >
                            Back to Client
                        </Button>
                        <Button
                            onClick={openAddDialog}
                            className="bg-black text-white cursor-pointer hover:bg-gray-800"
                        >
                            Add
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {girlfriends.map((gf) => (
                        <Card
                            key={gf.id}
                            className="bg-gray-50 hover:bg-white transition-colors"
                        >
                            <CardContent className="p-4">
                                <div className="flex items-center flex-col justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-25 w-25">
                                            <AvatarImage
                                                src={
                                                    gf.avatar instanceof File
                                                        ? URL.createObjectURL(
                                                              gf.avatar
                                                          )
                                                        : gf.avatar
                                                }
                                            />
                                            <AvatarFallback className="bg-gray-200">
                                                {gf.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-medium">
                                                {gf.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {gf.age} yrs • {gf.nationality}{" "}
                                                • ${gf.price.toLocaleString()}
                                                /hour
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-5">
                                        <Button
                                            onClick={() => openEditDialog(gf)}
                                            variant="outline"
                                            className="bg-black border-none text-white hover:bg-gray-800 hover:text-white rounded-full px-6 cursor-pointer"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => openDeleteDialog(gf)}
                                            variant="outline"
                                            className="bg-white text-black border-black hover:bg-red-500 hover:text-white hover:border-red-500 rounded-full px-6 cursor-pointer"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Add Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>New Registration</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="nationality">Nationality</Label>
                            <Input
                                id="nationality"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="availability">Availability</Label>
                            <Select
                                name="availability"
                                value={formData.available_time}
                                onValueChange={(value) =>
                                    handleSelectChange(value, "availability")
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Anytime">
                                        Anytime
                                    </SelectItem>
                                    <SelectItem value="Weekends">
                                        Weekends Only
                                    </SelectItem>
                                    <SelectItem value="Weekdays">
                                        Weekdays Only
                                    </SelectItem>
                                    <SelectItem value="Weekdays Evening">
                                        Weekday Evenings
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (per hour / CAD)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="introduction">Introduction</Label>
                            <Textarea
                                id="introduction"
                                name="self_introduction"
                                value={formData.self_introduction}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="avatar">Avatar</Label>
                            <Avatar className="h-15 w-15">
                                <AvatarImage
                                    src={
                                        formData.avatar instanceof File
                                            ? URL.createObjectURL(
                                                    formData.avatar
                                                )
                                            : formData.avatar
                                    }
                                />
                                <AvatarFallback className="bg-gray-200">
                                    {formData.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <Input
                                id="avatar"
                                name="avatar"
                                type="file"
                                onChange={handleImageInputChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAdd}
                            className="bg-black text-white hover:bg-gray-800"
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-xs md:max-w-lg h-[80%] md:h-[95%] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-age">Age</Label>
                            <Input
                                id="edit-age"
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-nationality">
                                Nationality
                            </Label>
                            <Input
                                id="edit-nationality"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-availability">
                                Availability
                            </Label>
                            <Select
                                name="availability"
                                value={formData.available_time}
                                onValueChange={(value) =>
                                    handleSelectChange(value, "available_time")
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Anytime">
                                        Anytime
                                    </SelectItem>
                                    <SelectItem value="Weekends">
                                        Weekends Only
                                    </SelectItem>
                                    <SelectItem value="Weekdays">
                                        Weekdays Only
                                    </SelectItem>
                                    <SelectItem value="Weekdays Evening">
                                        Weekday Evenings
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-price">
                                Price (per hour / CAD)
                            </Label>
                            <Input
                                id="edit-price"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-introduction">
                                Introduction
                            </Label>
                            <Textarea
                                id="edit-introduction"
                                name="introduction"
                                value={formData.self_introduction}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-avatar">Avatar</Label>
                            <Avatar className="h-15 w-15">
                                <AvatarImage
                                    src={
                                        formData.avatar instanceof File
                                            ? URL.createObjectURL(
                                                    formData.avatar
                                                )
                                            : formData.avatar
                                    }
                                />
                                <AvatarFallback className="bg-gray-200">
                                    {formData.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <Input
                                id="edit-avatar"
                                name="avatar"
                                type="file"
                                onChange={handleImageInputChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            className="bg-black text-white hover:bg-gray-800"
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete the profile of{" "}
                            {currentGirlfriend?.name}? This action cannot be
                            undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default RentalGirlfriendAdmin;
