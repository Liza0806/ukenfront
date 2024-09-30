declare global {
    interface FetchEvent extends Event {
        request: Request;
        respondWith(response: Response | Promise<Response>): void;
    }
}
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}
export {};