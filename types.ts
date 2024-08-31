import { Prisma } from "@prisma/client";

declare module "@prisma/client" {
    type ChatConversation = Prisma.ConversationGetPayload<{
        include: {
            Messages: {
                select: {
                    id: true;
                    content: true;
                    createdAt: true;
                    updatedAt: true;
                    User: {
                        select: {
                            id: true;
                            name: true;
                            email: true;
                            image: true;
                        }
                    }
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
    }>
}