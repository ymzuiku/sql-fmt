import * as SqlString from "sqlstring";

export interface IHelp extends String {
  comment: (str: string) => IHelp;
  engine: () => IHelp;
  default: (str: string) => IHelp;
  defaultNow: () => IHelp;
  notNull: () => IHelp;
  increment: () => IHelp;
  bigIncrement: () => IHelp;
  int: () => IHelp;
  tinyint: () => IHelp;
  smallint: () => IHelp;
  mediumint: () => IHelp;
  bigint: () => IHelp;
  varchar: (len: number) => IHelp;
  now: () => IHelp;
  timestamp: () => IHelp;
  notExists: () => IHelp;
  createAt: () => IHelp;
  updateAt: () => IHelp;
  createAndUpdate: () => IHelp;
  primary: (key: string) => IHelp;
  unique: (...args: string[]) => IHelp;
  key: (...args: string[]) => IHelp;
}

export const sqlHelpKey = "sql" + Date.now();

function _help(str = ""): IHelp {
  const code = new String(str) as any;
  code.sqlHelpKey = sqlHelpKey;

  const add = (s: string) => {
    return help(code + " " + s);
  };

  const obj = {
    engine: () => add("ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"),
    comment: (str: string) => add(SqlString.escape(str)),
    default: (str: string) => add("DEFAULT " + SqlString.escape(str)),
    defaultNow: (str: string) => add("DEFAULT CURRENT_TIMESTAMP"),
    notNull: () => add("NOT NULL"),
    increment: () => add("int unsigned NOT NULL AUTO_INCREMENT"),
    bigIncrement: () => add("bigint unsigned NOT NULL AUTO_INCREMENT"),
    int: () => add("int"), // -2147483648~2147483648 | 0~4294967295
    tinyint: () => add("tinyint"), // -127~127 | 0~255
    smallint: () => add("smallint"), // -32768~32768 | 0~65535
    mediumint: () => add("mediumint"), // -8388608~8388608 | 0~16777215
    bigint: () => add("bigint"), // -9223372036854775808~9223372036854775808 | 0~18446744073709551615
    varchar: (len: number) => add(`varchar(${len})`),
    now: () => add("CURRENT_TIMESTAMP"),
    notExists: () => add("not exists"),
    timestamp: () => add("timestamp"),
    createAt: () =>
      add("create_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP"),
    updateAt: () =>
      add("update_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP"),
    createAndUpdate: () =>
      add(
        `create_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, update_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
      ),
    primary: (str: string) => add(`primary(${str})`),
    unique: (...args: string[]) => add(`unique(${args.join(",")})`),
    key: (...args: string[]) =>
      add(`key index_${args.join("_")}(${args.join(",")})`),
  };

  Object.assign(code, obj);

  return code;
}

export const help = _help();
