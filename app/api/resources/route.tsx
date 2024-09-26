import { auth } from "@/auth";
import WpStorage from "@/services/storage/WpStorage";
import { Attachment } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session)
      return Response.json(
        { message: "Forbidden!", error: new Error("Invalid auth, forbidden!") },
        { status: 403 }
      );
    const {
      data: { token },
    } = await axios.post(
      "https://connectify.webtuhan.id.vn/wp-json/jwt-auth/v1/token",
      {
        username: process.env.WP_USERNAME,
        password: process.env.WP_APP_PASSWORD,
      }
    );
    return NextResponse.json({ token }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session)
      return Response.json({ message: "Forbidden!" }, { status: 403 });
    const formData = await request.formData();
    const {
      source_url,
      id,
      title: { raw },
      mime_type,
    } = await WpStorage.uploadFile(formData);
    return Response.json(
      {
        message: "Upload success!",
        data: {
          cloudId: id,
          fileUrl: source_url,
          name: raw,
          mime: mime_type,
        } as Attachment,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);

    return Response.json({ message: "Upload failed!", error }, { status: 400 });
  }
}
