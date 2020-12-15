import * as SqlString from "sqlstring";

export const where = (obj: any) => {
  const keys = Object.keys(obj);

  const outValues = keys.map((k) => {
    const v = obj[k];
    if (Object.prototype.toString.call(v) === "[object Array]") {
      const list = v.map((v2: any) => {
        return `${SqlString.escapeId(k)} = ${SqlString.escape(v2)}`;
      });
      return "(" + list.join(" OR ") + ")";
    }
    return `${SqlString.escapeId(k)} = ${SqlString.escape(v)}`;
  });

  return `(${outValues.join(" AND ")})`;
};

/*
sql`select name, age, fish from fmt where ${{name:'dog', age:[10, 20]}}`;

sql`select name, age, fish from fmt where fish.name=dog.${data} and fish.name=${fish}`;
*/
