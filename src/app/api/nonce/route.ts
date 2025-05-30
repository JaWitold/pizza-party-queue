import { NextResponse } from "next/server";
import {getNonce} from "@/components/services/queue/nonce";

export function GET() {
    return NextResponse.json({ nonce: getNonce() });
}
