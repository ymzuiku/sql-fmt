type Escape = (value: string) => string;

const name = "v" + Date.now();
const insertStr = "insert into " + name;
const setStr = `update ${name} ? set ${name}=1`;
const setReg = new RegExp(`(update ${name}|set ${name}=1)`, "g");

const simpleMap = {
  string: 1,
  boolean: 1,
  number: 1,
} as any;

export const core = (format: any, where: any, escape: any) => {
  const sql = (...args: any[]) => {
    const [str, ...rest] = args;
    let out = "";

    str.forEach((s: string, i: number) => {
      out += s;
      const v = rest[i];
      const lowS = s.toLocaleLowerCase();
      const len = lowS.length;
      const where = lowS.lastIndexOf("where");
      const updateSet = lowS.lastIndexOf("set");
      const insert = lowS.lastIndexOf("insert into");
      if (v !== void 0) {
        const kind = typeof v;
        if (simpleMap[kind]) {
          if (v[0] === "#") {
            out += v.replace("#", "");
          } else {
            out += sql.escape(v);
          }
        } else if (where > 0 && where > len - 7) {
          out += sql.where(v);
        } else if (updateSet > 0 && updateSet > len - 5) {
          out += sql.set(v);
        } else if (insert > -1) {
          out += sql.set(v);
        }
      }
    });

    return out;
  };
  sql.values = (
    obj:
      | { [key: string]: string | number }
      | { [key: string]: string | number }[]
  ) => {
    const query = format(insertStr + "?", obj) as string;
    return query.replace(insertStr, "").trim();
  };
  sql.set = (obj: { [key: string]: string | number }) => {
    const query = format(setStr, obj) as string;
    return query.replace(setReg, "").trim();
  };
  sql.where = (obj: {
    [key: string]: string | number | (string | number)[];
  }) => {
    const str = where(obj);
    return str.replace("WHERE ", "").trim();
  };
  sql.escape = escape as Escape;
  sql.createQuery = <T extends Function>(query: T) => {
    return (...args: any[]) => query(sql(...args));
  };

  return sql;
};
