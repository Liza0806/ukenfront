declare global {
    interface FetchEvent extends Event {
        request: Request;
        respondWith(response: Response | Promise<Response>): void;
    }
}


interface BeforeInstallPromptEvent extends Event {
    preventDefault(): void;
    prompt(): Promise<void>;
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

export {};