type Escape = (value: string) => string;

const name = "v" + Date.now();
const insertStr = "insert into " + name;
const setStr = `update ${name} ? set ${name}=1`;
const setReg = new RegExp(`(update ${name}|set ${name}=1)`, "g");

export const core = (format: any, where: any, escape: any) => {
  const sql = {
    values: (
      obj:
        | { [key: string]: string | number }
        | { [key: string]: string | number }[]
    ) => {
      const query = format(insertStr + "?", obj) as string;
      return query.replace(insertStr, "").trim();
    },
    set: (obj: { [key: string]: string | number }) => {
      const query = format(setStr, obj) as string;
      return query.replace(setReg, "").trim();
    },
    where: (obj: { [key: string]: string | number | (string | number)[] }) => {
      const str = where(obj);
      return str.replace("WHERE ", "").trim();
    },
    escape: escape as Escape,
  };

  return sql;
};
