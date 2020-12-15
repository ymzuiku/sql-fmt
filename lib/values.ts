import * as SqlString from "sqlstring";

export const values = (obj: any) => {
  // if (isId) {
  //   const list = obj.map((v: string) => {
  //     return SqlString.escapeId(v);
  //   });
  //   return `${list.join(", ")}`;
  // }
  const list = obj.map((v: string) => {
    return SqlString.escape(v);
  });
  return `${list.join(", ")}`;
};
