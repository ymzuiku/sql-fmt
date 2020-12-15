import sql from "../lib";

describe("where", () => {
  test("where simple", () => {
    const str = sql`select * from fmt where ${{ name: "dog", age: 10 }}`;
    expect(str).toBe("select * from fmt where (`name` = 'dog' AND `age` = 10)");
  });

  test("where or", () => {
    const str = sql`select * from fmt where ${{
      name: ["dog", "dog2"],
      age: [5, 20],
    }}`;
    expect(str).toBe(
      "select * from fmt where ((`name` = 'dog' OR `name` = 'dog2') AND (`age` = 5 OR `age` = 20))"
    );
  });

  test("where single", () => {
    const str = sql`select * from fmt where name=${"dog2"} or age = ${10}`;
    expect(str).toBe("select * from fmt where name='dog2' or age = 10");
  });

  // test("where OR", () => {
  //   const str = sql`insert into fmt ${[
  //     { name: "dog", age: 10 },
  //     { name: "dog2", age: 20 },
  //   ]}`;
  //   expect(str).toBe(
  //     "insert into fmt (`name`, `age`) VALUES ('dog', 10), ('dog2', 20)"
  //   );
  // });
});
