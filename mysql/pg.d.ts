declare const sql: {
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
    escape: (value: string) => string;
    createQuery<T extends Function>(query: T): (...args: any[]) => any;
};
export default sql;
