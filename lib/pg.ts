import { core } from "./core";
const format = require("sqlutils/pg/format");
const escape = require("sqlutils/pg/escape");
const where = require("sqlutils/pg/buildWhereFromQuery");
const sql = core(format, where, escape);

export default sql;
