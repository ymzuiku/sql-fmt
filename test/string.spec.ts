import sql from "../lib";

describe("string", () => {
  test("string simple", () => {
    const str = sql`select * from fmt where name = ${"dog"}`;
    expect(str).toBe("select * from fmt where name = 'dog'");
  });

  test("string #", () => {
    const str = sql`select * from fmt where #${"name"} = ${"dog"}`;
    expect(str).toBe("select * from fmt where name = 'dog'");
  });
});
