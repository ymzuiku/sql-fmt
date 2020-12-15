import * as SqlString from "sqlstring";
import { values } from "./values";
import { updateSet } from "./updateSet";
import { insert } from "./insert";
import { where } from "./where";
import { help, sqlHelpKey } from "./help";

const simpleMap = {
  string: 1,
  boolean: 1,
  number: 1,
} as any;

function sql(...args: any[]) {
  const [str, ...rest] = args;
  let out = "";

  str.forEach((s: string, i: number) => {
    const v = rest[i];
    const lowS = s.toLocaleLowerCase();

    out += s.replace(/(\#)/, "");

    const len = lowS.length;
    const where = lowS.lastIndexOf("where");
    const updateSet = lowS.lastIndexOf("set");
    const str = lowS.lastIndexOf("#");
    if (v !== void 0) {
      const kind = typeof v;
      if (v.sqlHelpKey === sqlHelpKey) {
        out += v;
      } else if (simpleMap[kind]) {
        if (str > -1 && str >= len - 1) {
          out += v;
        } else {
          out += SqlString.escape(v);
        }
      } else if (where > 0 && where > len - 7) {
        out += sql.where(v);
      } else if (updateSet > 0 && updateSet > len - 5) {
        out += sql.set(v);
      } else {
        if (
          Object.prototype.toString.call(v) === "[object Array]" &&
          simpleMap[typeof v[0]]
        ) {
          // select
          out += sql.values(v);
        } else {
          // values
          out += sql.insert(v);
        }
      }
    }
  });
  return out;
}

sql.insert = insert;
sql.where = where;
sql.values = values;
sql.set = updateSet;
sql.escape = SqlString.escape;
sql.escapeId = SqlString.escapeId;
sql.format = SqlString.format;
sql.h = help;

export default sql;
