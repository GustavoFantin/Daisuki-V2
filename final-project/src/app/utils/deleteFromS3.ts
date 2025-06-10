import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: process.env.AWS_REGION || "us-east-2" });

async function deleteFileFromS3(key: string, bucket: string) {
    const params = {
        Bucket: bucket,
        Key: key,
    };
    await s3.send(new DeleteObjectCommand(params));
}

export async function deleteAvatarFromS3(avatarUrl: string) {
    const bucket = process.env.AWS_S3_BUCKET;
    if (!bucket) {
        throw new Error("AWS_S3_BUCKET is not defined");
    }

    const key = avatarUrl.split("/").slice(-1)[0];
    await deleteFileFromS3(key, bucket);
}
