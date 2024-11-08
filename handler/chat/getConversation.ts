import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const userSelect = {
    id: true,
    name: true,
    email: true,
    image: true
}
async function getManyByUserId(id: string) {
    return await prisma.conversation.findMany({
        where: {
            Participants: {
                some: {
                    userId: id
                }
            }
        },
        include: {
            Messages: {
                select: {
                    id: true,
                    content: true,
                    senderId: true,
                    createdAt: true,
                    updatedAt: true,
                    MessageAttachments: true,
                },
                take: 1,
                orderBy: {
                    createdAt: "desc"
                }
            },
            Participants: {
                select: {
                    User: {
                        select: userSelect
                    }
                }
            }
        }
    })

}

async function getOneByUserId(id: string) {
    return await prisma.conversation.findFirst({
        where: {
            Participants: {
                some: {
                    userId: id
                }
            }
        },
        include: {
            Messages: {
                include: {
                    MessageAttachments: true,
                    SenderMessage: {
                        select: userSelect
                    }
                },
                take: 1,
                orderBy: {
                    createdAt: "desc"
                }
            },
            Participants: {
                select: {
                    User: {
                        select: userSelect
                    }
                }
            }
        }
    })

}

export { getManyByUserId, getOneByUserId }
