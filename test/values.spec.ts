import sql from "../lib";

describe("values", () => {
  test("values simple", () => {
    const str = sql`insert into fmt (name, age) values (${["cat", "5"]})`;
    expect(str).toBe("insert into fmt (name, age) values ('cat', '5')");
  });
});
