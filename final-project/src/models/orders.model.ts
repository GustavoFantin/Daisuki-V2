import mongoose, { Document, Schema } from "mongoose";
import User from "@/models/user.model"
import Service from "@/models/services.model"

export interface IOrder extends Document {
   userId: mongoose.Schema.Types.ObjectId;
   serviceId: mongoose.Schema.Types.ObjectId;
   serviceDate: Date;
   paidDate: null;
}

const orderSchema: Schema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "User"  },
   serviceId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Service" },
   serviceDate: { type: Date, default: Date.now },
   paidDate: { type: Date, default: null },
})


export default mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema)