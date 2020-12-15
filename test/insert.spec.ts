import sql from "../lib";

describe("inert", () => {
  test("insert simple", () => {
    const str = sql`insert into fmt ${{ name: "dog", age: 10 }}`;
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
