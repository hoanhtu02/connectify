import { Prisma } from "@prisma/client";

declare module "@prisma/client" {
    type ChatConversation = Prisma.ConversationGetPayload<{
        include: {
            Messages: {
                include: {
                    SenderMessage: {
                        select: {
                            id: true;
                            name: true;
                            email: true;
                            image: true;
                        }
                    },
                    Attachments: true
                }
            },
            Participants: {
                select: {
                    User: {
                        select: {
                            id: true;
                            name: true;
                            email: true;
                            image: true;
                        }
                    }
                }
            }
        }
    }> & { total?: number; page?: number }
    type ChatMessage = Prisma.MessageGetPayload<{
        include: {
            SenderMessage: {
                select: {
                    id: true;
                    name: true;
                    email: true;
                    image: true;
                }
            },
            Attachments: true
        }
    }>
}