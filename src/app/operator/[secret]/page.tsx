"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Queue } from "@/components/Queue";
import { useQueue } from "@/components/context/QueueContext";
import { use, useCallback, useEffect } from "react";
import { randomNonce } from "@/components/services/queue/nonce";
import { useRouter } from "next/navigation";
import {ChevronRight} from "lucide-react";

export default function OperatorPage({ params }) {
  const router = useRouter();
  // @ts-expect-error shit
  const { secret } = use(params);

  const { refreshQueue } = useQueue();

  const consume = async () => {
    await fetch("/api/consume", { method: "POST" });
    refreshQueue();
  };

  const handleSecretCheck = useCallback(async () => {
    const res = await fetch("/api/secret-check", {
      method: "POST",
      body: JSON.stringify({ secret: btoa(secret + randomNonce()) }),
    });

    if (!res.ok) router.push("/");
  }, [secret, router]);

  useEffect(() => {
    handleSecretCheck();
  }, [handleSecretCheck]);

  return (
    <main className="grid grid-rows-12 grid-cols-3 p-8 text-center h-screen gap-6">
      <Card className="col-span-3 row-span-1 flex flex-col justify-center items-center">
        <CardHeader className="w-full">
          <CardTitle className="text-2xl md:text-6xl font-bold">
            Pizza Party Queue Operator Console
          </CardTitle>
        </CardHeader>
      </Card>
     <Queue/>
      <Card className="col-span-full row-span-2 p-4 flex flex-col items-center justify-center">

        <CardContent className="">
          <div className="p-8 text-center space-y-4">
            <Button size="lg" className="w-100 h-16 text-xl" onClick={consume}>
              Serve Next <ChevronRight/>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
