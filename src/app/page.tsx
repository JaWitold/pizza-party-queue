"use client";

import {Card, CardFooter, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Queue} from "@/components/Queue";
import {useQueue} from "@/components/context/QueueContext";
import {useEffect, useState} from "react";
import {Github} from "lucide-react";


export default function HomePage() {
    const [href, setHref] = useState("");
    const { nonce } = useQueue();

    useEffect(() => {
        setHref("/add-to-queue/" + {nonce})
    }, [nonce]);

    return (
        <main className="grid grid-rows-12 grid-cols-3 p-8 text-center h-screen gap-6">
            <Card className="col-span-3 row-span-2 flex flex-col justify-center items-center">
                <CardHeader className="w-full">
                    <CardTitle className="text-4xl md:text-6xl font-bold">Welcome to Pizza Party Queue </CardTitle>
                </CardHeader>
            </Card>
            <Card className="hidden md:block col-span-2 row-span-9 p-4">
                <CardHeader className="py-10">
                    <CardTitle className="text-4xl font-bold">Scan to Join Pizza Queue</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <div className="border-6 border-gray-200 p-4 rounded-3xl p-4">
                        <QRCodeSVG className="" value={process.env.NEXT_PUBLIC_URL + nonce} size={process.env.NEXT_PUBLIC_QRCODE_SIZE}/>
                    </div>
                </CardContent>
                {process.env.NEXT_PUBLIC_DEBUG &&
                    <CardFooter className="py-10 flex justify-center">
                        <Button size="lg" className='w-1/2' asChild>
                            <a href={href}>{process.env.NEXT_PUBLIC_URL}{nonce}</a>
                        </Button>
                    </CardFooter>
                }
            </Card>
            <Queue/>
            <Card className="col-span-3 row-span-2 flex flex-col justify-center items-center">
                <CardHeader className="w-full">
                    <CardTitle className="font-semibold flex items-center justify-center">
                        <Github className="h-5 mx-2"/>
                        <Link href="https://github.com/JaWitold/pizza-party-queue" target='_blank'>https://github.com/JaWitold/pizza-party-queue</Link>
                    </CardTitle>
                </CardHeader>
            </Card>
        </main>
    );
}
