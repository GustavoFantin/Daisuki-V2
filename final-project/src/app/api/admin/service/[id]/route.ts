import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import { uploadFileToS3 } from "@/app/utils/s3Uploader";
import Service from "@/models/services.model";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const form = new formidable.IncomingForm();
    const buffers: Uint8Array[] = [];
    const reader = req.body?.getReader();
    if (!reader) {
        return NextResponse.json({ error: "No body found" }, { status: 400 });
    }
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffers.push(value);
    }
    // const buffer = Buffer.concat(buffers);

    return new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.parse(req as any, async (err, fields, files) => {
            if (err) {
                resolve(NextResponse.json({ error: err }, { status: 500 }));
                return;
            }
            try {
                const service = await Service.findById(params.id);
                if (!service) {
                    resolve(
                        NextResponse.json(
                            { message: "Service not found" },
                            { status: 404 }
                        )
                    );
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
                    params.id,
                    modifiedData,
                    {
                        new: true,
                    }
                );

                resolve(NextResponse.json(updatedService, { status: 200 }));
            } catch (error) {
                console.error(error);
                resolve(
                    NextResponse.json(
                        { message: "Unable to update service" },
                        { status: 500 }
                    )
                );
            }
        });
    });
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const service = await Service.findByIdAndDelete(params.id);
        if (!service) {
            return NextResponse.json(
                { message: "Service not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(service, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Unable to delete service" },
            { status: 500 }
        );
    }
}
