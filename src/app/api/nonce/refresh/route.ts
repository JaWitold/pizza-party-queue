import { NextResponse } from "next/server";
import {refreshNonce} from "@/components/services/queue/nonce";

export function GET() {
    return NextResponse.json({ nonce: refreshNonce() });
}
