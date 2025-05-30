import {useQueue} from "@/components/context/QueueContext";
import {useEffect, useRef} from "react";
import {toast} from "sonner";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";

export const welcomeMessages: string[] = [
    "🍕 Welcome ${name}! You’re now in line for the best slice in town!",
    "🧀 Hey ${name}! Get ready to cheese it up in the pizza queue!",
    "🎉 ${name} just entered the pizza party line—bring your appetite!",
    "⚔️ All hail ${name}! Our newest pizza queue warrior!",
    "🛡️ ${name} joined the crust crusaders. Welcome aboard!",
    "🔥 Welcome ${name}! Your pizza destiny awaits.",
    "🍽️ ${name} has entered the oven zone. Welcome!",
    "🍞 Hot and fresh—${name} just joined the queue!",
    "🌶️ Welcome ${name}! The sauce is strong with you.",
    "🚀 ${name}, your pizza quest begins now!",
    "🥗 ${name}, you bring the toppings, we’ll bring the fire!",
    "👾 Another hungry hero! Welcome, ${name}!",
    "🌕 Welcome to the slice side, ${name}!",
    "💰 ${name} is now queued and ready for dough!",
    "🎯 ${name} just got served… pizza style!",
    "📢 Alert! ${name} has joined the flavor train!",
    "🧊 Welcome ${name}! You’re next in line for a slice of greatness.",
    "🏆 ${name} just leveled up to pizza status!",
    "🍽️🍕 Two pizzas up for ${name}—welcome!",
    "🎊 Welcome ${name}! We saved a slice just for you.",
];

export function Queue() {
    const { queue } = useQueue();
    const prevLength = useRef(queue.length);
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    useEffect(() => {
        if (queue.length > prevLength.current) {
            const newPerson = queue[queue.length - 1];
            const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
            const personalizedMessage = randomMessage.replace("${name}", capitalize(newPerson.name));

            toast.success(personalizedMessage, { duration: 15000 });
        }

        prevLength.current = queue.length;
    }, [queue]);

    return <Card className="col-span-full md:col-span-1 row-span-10 p-4">
        <CardHeader className="py-10">
            <CardTitle className="text-4xl font-bold">Current Queue</CardTitle>
            <CardDescription className="block py-3 md:hidden">Scan QR code on TV to join the queue</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
            <div className="rounded-md border">
                <table className="w-full text-left table-auto">
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead className="px-4 py-2">#</TableHead>
                            <TableHead className="px-4 py-2">Name</TableHead>
                            <TableHead className="px-4 py-2">ETA</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {queue.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="px-4 py-4 text-center text-muted-foreground">
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="mr-2 animate-spin rounded-full h-4 w-4 border-t-2 border-gray-400" />
                                        Waiting for guests to join...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            queue.map((item, i) => (
                                <TableRow
                                    key={i}
                                    className={cn(
                                        "border-t",
                                        i === 0 && "bg-lime-300/30 text-lime-800 font-semibold hover:bg-lime-50"
                                    )}
                                >
                                    <TableCell className="px-4 py-2 font-semibold">{i + 1}</TableCell>
                                    <TableCell className="px-4 py-2 capitalize">{item.name}</TableCell>
                                    <TableCell className="px-4 py-2">{i !== 0 ? `${i * 5} min` : "now"}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>

                </table>
            </div>
        </CardContent>

    </Card>
}