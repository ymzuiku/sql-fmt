import * as SqlString from "sqlstring";
declare function sql(...args: any[]): string;
declare namespace sql {
    var insert: (obj: any) => string;
    var where: (obj: any) => string;
    var values: (obj: any) => string;
    var set: (obj: any) => string;
    var escape: typeof SqlString.escape;
    var escapeId: typeof SqlString.escapeId;
    var format: typeof SqlString.format;
    var h: import("./help").IHelp;
}
export default sql;
