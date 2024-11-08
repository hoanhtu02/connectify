import { logger } from "@/utils/logger";
import { CreateChatMessage, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const log = logger.child({ module: "totoro" });
export async function GET(request: Request) {}

export async function POST(request: Request) {
  const { content, conversationId, senderId }: CreateChatMessage =
    await request.json();

  const newMessage = await prisma.message.create({
    data: {
      content,
      conversationId,
      senderId,
    },
  });
  log.info("New message created", newMessage);
  return new Response(JSON.stringify(newMessage), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
