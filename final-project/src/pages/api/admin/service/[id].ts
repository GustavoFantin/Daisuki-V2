import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import Service from "@/models/services.model";
import { uploadFileToS3 } from "@/app/utils/s3Uploader";
import { connectDB } from "@/lib/mongodb";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    await connectDB();

    if (req.method === "PUT") {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).json({ error: err });
                return;
            }
            try {
                const service = await Service.findById(id);
                if (!service) {
                    res.status(404).json({ message: "Service not found" });
                    return;
                }

                let avatarUrl = service.avatar;
                if (files.avatar) {
                    const file = Array.isArray(files.avatar)
                        ? files.avatar[0]
                        : files.avatar;
                    avatarUrl = await uploadFileToS3(file);
                }

                const modifiedData = {
                    avatar: avatarUrl,
                    name: fields.name ?? service.name,
                    height: fields.height ?? service.height,
                    age: fields.age ?? service.age,
                    nationality: fields.nationality ?? service.nationality,
                    self_introduction:
                        fields.self_introduction ?? service.self_introduction,
                    price: fields.price ?? service.price,
                    available_time:
                        fields.available_time ?? service.available_time,
                    price_id: fields.price_id ?? service.price_id,
                };

                const updatedService = await Service.findByIdAndUpdate(
                    id,
                    modifiedData,
                    { new: true }
                );
                res.status(200).json(updatedService);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Unable to update service" });
            }
        });
        return;
    }

    if (req.method === "DELETE") {
        try {
            const service = await Service.findByIdAndDelete(id);
            if (!service) {
                res.status(404).json({ message: "Service not found" });
                return;
            }
            res.status(200).json(service);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Unable to delete service" });
        }
        return;
    }

    res.status(405).json({ message: "Method Not Allowed" });
}
