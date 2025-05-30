// app/api/join/route.ts
import { NextResponse } from "next/server";
import {consumeQueue, getQueue} from "@/components/services/queue/queue";

export async function POST() {
    consumeQueue()
    return NextResponse.json({ queue: getQueue() });
}
