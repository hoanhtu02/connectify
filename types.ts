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
                    MessageAttachments: true
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
    type ChatMessageItem = Prisma.MessageGetPayload<{
        include: {
            SenderMessage: {
                select: {
                    id: true;
                    name: true;
                    email: true;
                    image: true;
                }
            },
            MessageAttachments: true
        } & {
            file: File | null;
        }
    }>
}