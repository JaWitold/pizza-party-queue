import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import { Github } from "lucide-react";
import Link from "next/link";


export function Footer() {
    return  <Card className="col-span-3 row-span-2 flex flex-col justify-center items-center">
    <CardHeader className="w-full">
        <CardTitle className="text-sm text-md font-semibold flex items-center justify-center">
            <Github className="h-5 mx-2"/>
            <Link href="https://github.com/JaWitold/pizza-party-queue" target='_blank'>https://github.com/JaWitold/pizza-party-queue</Link>
        </CardTitle>
    </CardHeader>
</Card>
}