import sql from "../lib";

describe("help", () => {
  test("help create table", () => {
    const str = `create table dog2(
      id ${sql.h.increment()},
      day ${sql.h.timestamp().notNull().defaultNow()},
      name ${sql.h.varchar(64).notNull()},
      age ${sql.h.tinyint().notNull()},
      ${sql.h.primary("id")},
      ${sql.h.key("name", "day", "age")}
    ) ${sql.h.engine()}`;
    console.log(str);
  });
});
