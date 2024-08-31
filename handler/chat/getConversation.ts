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
                    Attachments: {
                        select: {
                            id: true,
                            fileUrl: true,
                            thumbUrl: true,
                        }
                    },
                    SenderMessage: {
                        select: userSelect
                    }
                },
                take: 10,
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
                select: {
                    id: true,
                    content: true,
                    messageType: true,
                    createdAt: true,
                    updatedAt: true,
                    Attachments: {
                        select: {
                            id: true,
                            fileUrl: true,
                            thumbUrl: true,
                        }
                    },
                    SenderMessage: {
                        select: userSelect
                    }
                },
                take: 10,
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
