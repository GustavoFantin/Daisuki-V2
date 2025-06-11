// Girl data type
export type Girl = {
    id: string;
    name: string;
    age: number;
    height: number;
    nationality: string;
    price: number;
    avatar: File | string | undefined;
    self_introduction: string;
    available_time: string; // weekend , both
    price_id: string;
};

export type GirlFormData = Omit<Girl, "price_id">;

export type Order = {
    id: string;
    girlName: string;
    totalPrice: number;
    paidDate: string;
};

export type UserProfile = {
    _id: string;
    username: string;
    password: string;
    email: string;
    role: string;
    selfIntroduction: string;
    age: number;
};
