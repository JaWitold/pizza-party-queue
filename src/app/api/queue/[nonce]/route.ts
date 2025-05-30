import { getQueue } from "@/components/services/queue/queue";
import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ queue: getQueue() });
}
