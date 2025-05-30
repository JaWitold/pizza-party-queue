"use client";

import {Card, CardFooter, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Queue} from "@/components/Queue";
import {useQueue} from "@/components/context/QueueContext";
import {useEffect, useState} from "react";


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
            <Card className="hidden md:block col-span-2 row-span-10 p-4">
                <CardHeader className="py-10">
                    <CardTitle className="text-4xl font-bold">Scan to Join Pizza Queue</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <div className="border-6 border-gray-200 p-4 rounded-3xl p-4">
                        <QRCodeSVG className="" value={"https:/http://10.255.255.254:3000/add-to-queue/" + nonce} size={400}/>
                    </div>
                </CardContent>
                <CardFooter className="py-10 flex justify-center">
                    <Button size="lg" className='w-1/2' asChild>
                        <a href={href}>http://10.255.255.254:3000/add-to-queue/{nonce}</a>
                    </Button>
                </CardFooter>
            </Card>
            <Queue/>

        </main>
    );
}
