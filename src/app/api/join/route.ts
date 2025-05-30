import { NextResponse } from "next/server";
import { addToQueue } from "@/components/services/queue/queue";

export async function POST(req: Request) {
    const { name, nonce } = await req.json();
    if (!name || !nonce) return NextResponse.json({ error: "Invalid" }, { status: 400 });
    if (name.length < 3 || name.length > 20) return NextResponse.json({ error: "Invalid" }, { status: 400 });

    // const cookies = req.headers.get("cookie") || "";
    // if (cookies.includes("joined=true")) {
    //     return NextResponse.json({ error: "Already joined" }, { status: 403 });
    // }

    const success = addToQueue(name);
    if (!success) return NextResponse.json({ error: "Queue full" }, { status: 400 });

    const response = NextResponse.json({ success: true });
    response.headers.append("Set-Cookie", "joined=true; Path=/; Max-Age=3600");

    return response;
}
