import { Prisma, PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    console.log(req.nextUrl.searchParams)
    const page = req.nextUrl.searchParams.get('page') || 0;
    const limit = req.nextUrl.searchParams.get('limit') || 10;
    const search = req.nextUrl.searchParams.get('search') || "";
    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        email: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            },
            take: Number(limit),
            skip: Number(page) * Number(limit)
        });
        return Response.json({ users }, { status: 200 });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }

}