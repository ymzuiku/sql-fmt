// import { core } from "./core";
// const format = require("sqlutils/mysql/format");
// const escape = require("sqlutils/mysql/escape");
// const where = require("sqlutils/mysql/buildWhereFromQuery");
// const sql = core(format, where, escape);

// export default sql;
import * as SqlString from "sqlstring";

const simpleMap = {
  string: 1,
  boolean: 1,
  number: 1,
} as any;

const sql = (...args: any[]) => {
  const [str, ...rest] = args;
  let out = "";

  str.forEach((s: string, i: number) => {
    out += s;
    const v = rest[i];
    const lowS = s.toLocaleLowerCase();
    const len = lowS.length;
    if (v !== void 0) {
      const kind = typeof v;
      if (lowS.lastIndexOf("where") > len - 7) {
        out += "?";
      } else if (lowS.lastIndexOf("set") > len - 5) {
        out += "?";
      } else if (lowS.indexOf("insert into") > -1) {
        out += "?";
      } else {
        out += "?";
      }
    }
  });

  return SqlString.format(out, rest);
};

export default sql;
