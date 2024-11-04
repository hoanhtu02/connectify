import { Prisma } from "@prisma/client";
const userSelect = {
    id: true,
    name: true,
    email: true,
    image: true
}
declare module "@prisma/client" {
    type ChatConversation = Prisma.ConversationGetPayload<{
        include: {
            Messages: {
                include: {
                    SenderMessage: {
                        select: typeof userSelect
                    },
                    MessageAttachments: true
                }
            },
            Participants: {
                select: {
                    User: {
                        select: typeof userSelect
                    }
                }
            }
        }
    }> & { total?: number; page?: number }

    type ChatMessageItem = Prisma.MessageGetPayload<{
        include: {
            SenderMessage: {
                select: typeof userSelect
            },
            MessageAttachments: true
        }
    }> & {
        file: File[];
    }

    type CreateChatMessage = Prisma.MessageGetPayload<{
        select: {
            conversationId: true,
            content: true,
            attachments: true,
            senderId: true,
            id: true
        }
    }> & {
        file: File[];
    }
}