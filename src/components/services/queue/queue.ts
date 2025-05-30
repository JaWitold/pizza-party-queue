// lib/queue.ts
export type QueueItem = { name: string; addedAt: number };

const queue: QueueItem[] = [];

export function getQueue() {
    return queue;
}

export function addToQueue(name: string): boolean {
    const maxSize = parseInt(process.env.MAX_QUEUE_SIZE || "10");
    if (queue.length >= maxSize) return false;
    queue.push({ name, addedAt: Date.now() });
    return true;
}

export function consumeQueue(): QueueItem | null {
    return queue.shift() ?? null;
}
