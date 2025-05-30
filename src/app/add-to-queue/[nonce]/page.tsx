"use client";
import {use, useState} from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Queue} from "@/components/Queue";
import {useQueue} from "@/components/context/QueueContext";

export default function AddToQueuePage({ params }: { params: { nonce: string } }) {
    const {refreshQueue} = useQueue();
    const [name, setName] = useState("");
    const router = useRouter();

    // @ts-expect-error
    const { nonce } = use(params); // UNWRAP THE PROMISE

    const handleJoin = async () => {
        const res = await fetch("/api/join", {
            method: "POST",
            body: JSON.stringify({ name, nonce: nonce }),
        });

        if (res.ok) {
            refreshQueue()
            router.push("/");
        }
        else alert("Failed to join queue. Try again later.");
    };

    return (

        <main className="grid grid-rows-12 grid-cols-3 p-8 text-center h-screen gap-6">
            <Card className="col-span-3 row-span-2 flex flex-col justify-center items-center">
                <CardHeader className="w-full">
                    <CardTitle className="text-4xl md:text-6xl font-bold">Join Pizza Party Queue</CardTitle>
                </CardHeader>
            </Card>
            <Card className="hidden md:block col-span-2 row-span-10 p-4">
                <CardContent className="flex flex-col items-center justify-center">
                    <div className="p-8">
                        <h1 className="text-xl font-bold mb-4">Enter Your Name to Join Queue</h1>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name"/>
                        <Button className="mt-4 w-full" onClick={handleJoin}>
                            Join Queue
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Queue/>
        </main>


    )
        ;
}