import { auth } from "@/auth";
import WpStorage from "@/services/storage/WpStorage";
import { Attachment, PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
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
    } = await axios.post(`${process.env.HOST_WP}/wp-json/jwt-auth/v1/token`, {
      username: process.env.WP_USERNAME,
      password: process.env.WP_APP_PASSWORD,
    });
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
    const { cloudId, fileUrl, name, mime, messageId } = await request.json();
    const attachment = await prisma.attachment.create({
      data: {
        cloudId,
        fileUrl,
        name,
        mime,
        messageId,
      },
    });
    return Response.json(attachment, { status: 200 });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json({ message: "Upload failed!", error }, { status: 400 });
  }
}
