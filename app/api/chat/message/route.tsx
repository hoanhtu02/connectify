import { logger } from "@/utils/logger";

const log = logger.child({ module: "totoro" });
export async function GET(request: Request) {}

export async function POST(request: Request) {
  log.info("POST request");

  return new Response("POST request");
}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
