import { getQueue } from "@/components/services/queue/queue";
import { NextResponse } from "next/server";

export async function POST(req: Request)
{
    const {secret} = await req.json();
    if (atob(secret).slice(0, -7) !== process.env.OPERATOR_SECRET) {
        return NextResponse.json({error: "Authentication failed"}, {status: 403});
    }

    return NextResponse.json({ queue: getQueue() });
}
