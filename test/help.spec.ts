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
    expect(str).toBe("insert into fmt (`name`, `age`) VALUES ('dog', 10)");
  });
  test("insert list", () => {
    const str = sql`insert into fmt ${[
      { name: "dog", age: 10 },
      { name: "dog2", age: 20 },
    ]}`;
    expect(str).toBe(
      "insert into fmt (`name`, `age`) VALUES ('dog', 10), ('dog2', 20)"
    );
  });
});
