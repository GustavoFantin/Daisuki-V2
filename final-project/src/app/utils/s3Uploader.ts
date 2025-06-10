import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import type { File as FormidableFile } from "formidable";

export const uploadFileToS3 = async (file: FormidableFile) => {
    const s3 = new S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });

    const fileContent = fs.readFileSync(file.filepath);
    const fileExt = path.extname(file.originalFilename || "");
    const key = `daisuki/${uuidv4()}${fileExt}`;

    const command = new PutObjectCommand({
        Bucket: "mcphils",
        Key: key,
        Body: fileContent,
        ContentType: file.mimetype || undefined,
    });

    await s3.send(command);

    fs.unlinkSync(file.filepath);

    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
