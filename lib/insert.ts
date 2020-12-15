import * as SqlString from "sqlstring";

export const insert = (obj: any) => {
  const isList =
    obj[0] && Object.prototype.toString.call(obj) === "[object Array]";

  if (!isList) {
    const keys = Object.keys(obj);
    const subKey = keys.map((k) => SqlString.escapeId(k));

    const outValues = keys.map((k) => {
      const v = obj[k];
      return SqlString.escape(v);
    });
    return `(${subKey.join(", ")}) VALUES (${outValues.join(", ")})`;
  }

  // 兼容 values (list1), (list2)
  const keys = Object.keys(obj[0]);
  const subKey = keys.map((k) => SqlString.escapeId(k));

  const outValues = obj.map((subObj: any) => {
    const subVal = keys.map((k) => {
      const v = subObj[k];
      return SqlString.escape(v);
    });
    return "(" + subVal.join(", ") + ")";
  });

  return `(${subKey.join(", ")}) VALUES ${outValues.join(", ")}`;
};
