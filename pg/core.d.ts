declare type Escape = (value: string) => string;
export declare const core: (format: any, where: any, escape: any) => {
    (...args: any[]): string;
    values(obj: {
        [key: string]: string | number;
    } | {
        [key: string]: string | number;
    }[]): string;
    set(obj: {
        [key: string]: string | number;
    }): string;
    where(obj: {
        [key: string]: string | number | (string | number)[];
    }): any;
    escape: Escape;
    createQuery<T extends Function>(query: T): (...args: any[]) => any;
};
export {};
