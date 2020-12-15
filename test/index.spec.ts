import sql from "../lib/mysql";

describe("test mysql", () => {
  test("insert into", () => {
    const str = sql`insert into dog ${{ dog: "dipu", age: 20 }}`;
    console.log(str);
    expect(str).toMatch(/name='\\'hello\\'/);
  });

  test("set", () => {
    const str = sql`SELECT * FROM users WHERE name=${"'hello' and 1=1"}`;
    expect(str).toMatch(/name='\\'hello\\'/);
  });

  test("set # string", () => {
    const str = sql`SELECT * FROM users ${"#where name = '20' and 1=1"}`;
    console.log(str);
    expect(str).toMatch(/where name = '20'/);
  });

  test("template SET", () => {
    const str = sql`UPDATE uers SET ${{ dog: "hello", age: 20 }}`;
    expect(str).toMatch(/dog='hello'/);
  });

  test("template set", () => {
    const str = sql`UPDATE uers set ${{ dog: "hello", age: 20 }}`;
    expect(str).toMatch(/dog='hello'/);
  });

  test("template where", () => {
    const str = sql`SELECT * FROM users WHERE ${{
      name: "hello",
      age: [20, 30],
    }}`;
    expect(str).toMatch(/name='hello' AND/);
  });

  test("template group", () => {
    const str = sql`SELECT * FROM users join (select * from dog where ${{
      "users.name": "dog.name",
    }}) WHERE ${{
      name: "hello",
      age: [20, 30],
    }}`;
    expect(str).toMatch(/name='hello' AND/);
  });
});
