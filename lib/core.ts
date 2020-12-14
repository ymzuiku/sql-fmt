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
      if (v !== void 0) {
        const kind = typeof v;
        if (simpleMap[kind]) {
          if (v[0] === "#") {
            out += v.replace("#", "");
          } else {
            out += sql.escape(v);
          }
        } else if (lowS.lastIndexOf("where") > len - 7) {
          out += sql.where(v);
        } else if (lowS.lastIndexOf("set") > len - 5) {
          out += sql.set(v);
        } else if (lowS.indexOf("insert into") > -1) {
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
  sql.createQuery = <T>(query: T): T => {
    const out = (...args: any[]) => (query as any)(sql(...args));
    return out as any;
  };

  return sql;
};
