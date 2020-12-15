import sql from "../lib";

describe("update set", () => {
  test("update set", () => {
    const str = sql`update fmt set ${{ name: "dog4", age: 14 }} where ${{
      age: [5, 6],
    }}`;
    expect(str).toBe(
      "update fmt set `name` = 'dog4', `age` = 14 where ((`age` = 5 OR `age` = 6))"
    );
  });
});
