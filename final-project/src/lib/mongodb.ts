import mongoose from "mongoose";

if(!process.env.DATABASE_URI) throw new Error("Missing database credentials")

const MONGODB_URI = process.env.DATABASE_URI

export async function connectDB() {
   if (mongoose.connection.readyState >= 1) return

   await mongoose.connect(MONGODB_URI, {
      dbName: "daisuki"
   })
}