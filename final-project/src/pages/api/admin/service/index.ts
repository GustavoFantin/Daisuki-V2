import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import Service from "@/models/services.model";
import { uploadFileToS3 } from "@/app/utils/s3Uploader";
import { getStripePriceId } from "@/app/utils/getStripePriceId";
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
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
    }

    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }

        if (!files.avatar) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }

        const file = Array.isArray(files.avatar)
            ? files.avatar[0]
            : files.avatar;

        const avatarUrl = await uploadFileToS3(file);

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const getValue = (v: any) => (Array.isArray(v) ? v[0] : v);

            const price_id = await getStripePriceId(
                getValue(fields.name),
                avatarUrl
            );

            await connectDB();

            const service = await Service.create({
                avatar: avatarUrl,
                name: getValue(fields.name),
                height: Number(getValue(fields.height)),
                age: Number(getValue(fields.age)),
                nationality: getValue(fields.nationality),
                self_introduction: getValue(fields.self_introduction),
                price: Number(getValue(fields.price)),
                available_time: getValue(fields.available_time),
                price_id,
            });

            res.status(201).json(service);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error on creating service." });
        }
    });
}
