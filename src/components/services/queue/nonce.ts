// lib/queue.ts

export const randomNonce: () => string = () => Math.random().toString(36).substring(2, 9).toUpperCase();

let nonce: string = "";

export function getNonce(): string {
    return nonce;
}

export function refreshNonce(): string {
    return nonce = randomNonce();
}
