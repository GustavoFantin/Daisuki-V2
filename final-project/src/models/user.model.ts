import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    age: number;
    role: "client" | "admin";
}

const UserSchema = new mongoose.Schema({
   username: { type: String, required: true },
   password: { type: String, required: true },
   email: { type: String, required: true },
   age: { type: Number, required: true },
   role: { type: String, required: true },
})


export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)