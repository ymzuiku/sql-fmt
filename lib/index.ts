import * as SqlString from "sqlstring";
import { values } from "./values";
import { updateSet } from "./updateSet";
import { insert } from "./insert";
import { where } from "./where";

const simpleMap = {
  string: 1,
  boolean: 1,
  number: 1,
} as any;

const sql = (...args: any[]) => {
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
      if (simpleMap[kind]) {
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
};

sql.insert = insert;
sql.where = where;
sql.values = values;
sql.set = updateSet;
sql.escape = SqlString.escape;
sql.escapeId = SqlString.escapeId;
sql.format = SqlString.format;

export default sql;

/*
sql`insert into fmt ${[
  { name: "dog", age: 10 },
  { name: "dog2", age: 20 },
]}`;

sql`insert into fmt ${[
  { name: "dog", age: 10 },
  { name: "dog2", age: 20 },
]}`;

sql`fish, cat -> select name, age, fish from fmt where ${{
  name: "dog",
  age: [20, 50],
}}`;

sql`dog, fish -> select name, age, fish from fmt where ${{
  "fish.name": "dog.bate",
  "fish.name2": "dog.bate",
  age: [20, 50],
}}`;

sql`update fmt set ${{ name: "dog", age: 20 }}`;
*/
