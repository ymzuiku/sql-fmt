import { core } from "./core";
const format = require("sqlutils/mysql/format");
const escape = require("sqlutils/mysql/escape");
const where = require("sqlutils/mysql/buildWhereFromQuery");
const sql = core(format, where, escape);

export default sql;
