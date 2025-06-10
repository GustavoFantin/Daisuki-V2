import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import Service from "@/models/services.model";
import { uploadFileToS3 } from "@/app/utils/s3Uploader";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
    }

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }

        if (!files.avatar) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }

        // formidable v2: files.avatar can be array, handle accordingly
        const file = Array.isArray(files.avatar)
            ? files.avatar[0]
            : files.avatar;

        const avatarUrl = await uploadFileToS3(file);

        try {
            const {
                name,
                height,
                age,
                nationality,
                self_introduction,
                price,
                available_time,
                price_id,
            } = fields;

            const service = await Service.create({
                avatar: avatarUrl,
                name,
                height,
                age,
                nationality,
                self_introduction,
                price,
                available_time,
                price_id,
            });

            res.status(201).json(service);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error on creating service." });
        }
    });
}
