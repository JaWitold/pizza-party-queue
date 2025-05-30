"use client";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Queue} from "@/components/Queue";
import {useQueue} from "@/components/context/QueueContext";
import {use, useEffect} from "react";
import {randomNonce} from "@/components/services/queue/nonce";
import {useRouter} from "next/navigation";

export default function OperatorPage({params} : { params: { secret: string } }) {
    const router = useRouter();
    // @ts-ignore
    const { secret} = use(params);

    const {refreshQueue} = useQueue();

    const consume = async () => {
         await fetch("/api/consume", { method: "POST" })
        refreshQueue();
    };

    const handleSecretCheck = async () => {
        const res = await fetch("/api/secret-check", {
            method: "POST",
            body: JSON.stringify({ secret: btoa(secret + randomNonce())}),
        });

        if (!res.ok) router.push("/")
    }

    useEffect(() => {
        handleSecretCheck()
    }, [])

    return (
        <main className="grid grid-rows-12 grid-cols-3 p-8 text-center h-screen gap-6">
            <Card className="col-span-3 row-span-2 flex flex-col justify-center items-center">
                <CardHeader className="w-full">
                    <CardTitle className="text-4xl md:text-6xl font-bold">Pizza Party Queue Operator Console</CardTitle>
                </CardHeader>
            </Card>
            <Card className="hidden md:block col-span-2 row-span-10 p-4">
                <CardHeader className="py-10">
                    <CardTitle className="text-4xl font-bold">Serve pizza</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <div className="p-8 text-center space-y-4">
                        <Button size="lg" onClick={consume}>Serve Next</Button>
                    </div>
                </CardContent>
               </Card>
            <Queue/>
        </main>
    );
}

