// pages/api/register.js
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs"
const prisma = new PrismaClient();
export async function POST(req: Request) {
    const { email, password, repeatPassword, name } = await req.json();

    // Validate dữ liệu trước khi lưu vào cơ sở dữ liệu
    if (!email || !email.includes('@')) {
        return new Response('Email is invalid', { status: 400, headers: { 'Content-Type': "text/plain" } });
    }

    if (!password || password.length < 6) {
        return new Response('Password must be at least 6 characters', { status: 400, headers: { 'Content-Type': "text/plain" } });
    }

    if (password !== repeatPassword) {
        return new Response('Passwords do not match', { status: 400, headers: { 'Content-Type': "text/plain" } });
    }
    if (await prisma.user.findUnique({ where: { email } })) {
        return new Response('Email already exists', { status: 400, headers: { 'Content-Type': "text/plain" } });
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        if (!hash) {
            return new Response('Password hash failed', { status: 500, headers: { 'Content-Type': "text/plain" } });
        }
        await prisma.$transaction(async (tx) => {
            const { id } = await tx.user.create({
                data: {
                    email,
                    name,
                    password: hash,
                    image: "https://ui-avatars.com/api/?name=" + name,
                },
            });

            await tx.account.create({
                data: {
                    userId: id,
                    type: "credentials",
                    provider: "credentials",
                    providerAccountId: id,
                },
            });
        });
        return new Response("User create successfully", { status: 200, headers: { 'Content-Type': "text/plain" } });
    } catch (error) {
        return new Response('Failed to create account', { status: 400, headers: { 'Content-Type': "text/plain" } });
    }
}
