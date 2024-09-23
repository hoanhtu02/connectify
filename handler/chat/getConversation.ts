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
                    messageType: true,
                    createdAt: true,
                    updatedAt: true,
                    Attachments: true,
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
                    Attachments: true,
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
