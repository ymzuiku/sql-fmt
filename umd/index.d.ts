import * as SqlString from "sqlstring";
declare const sql: {
    (...args: any[]): string;
    insert: (obj: any) => string;
    where: (obj: any) => string;
    values: (obj: any) => string;
    set: (obj: any) => string;
    escape: typeof SqlString.escape;
    escapeId: typeof SqlString.escapeId;
    format: typeof SqlString.format;
};
export default sql;
