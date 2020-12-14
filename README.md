# sql-fmt

> Base by [sqlstring](https://www.npmjs.com/package/sqlutils) and [sqlutils](https://github.com/mysqljs/sqlstring)

Simple SQL escape and format for MySQL \ Postgres and easy create Ojbect to SQL, support typescript.

- **sql.escape**: Use `sqlstring` escape SQL string
- **sql.values**: Format and escape JS `{ key : value }` to SQL `(key1, key2) VALUES (value1, value2)`
- **sql.where**: Format and escape JS `{ key : value }` to SQL `(key1='value1' AND key2='value2')`
- **sql.set**: Format and escape JS `{ key : value }` to SQL `key1='value1', key2='value2'`

## Install

```sh
$ npm install sql-fmt
```

In javascript use MySQL

```js
const sql = require("sql-fmt"); // MySQL
```

or use Postgres

```js
const sql = require("sql-fmt/pg"); // Postgres
```

# Use

Single word:

```js
console.log(sql`SELECT * FROM users WHERE name=${"'hello' and 1=1"};`);
//out: SELECT * FROM users WHERE name='\'hello\' and 1=1'
```

Where:

```js
console.log(sql`SELECT * FROM users WHERE ${{ name: "hello", age: [20, 30] }}`);
//out: SELECT * FROM users WHERE (name='hello' AND (age=20 OR age=30))
```

Insert:

```js
console.log(sql`INSERT INTO users ${{ dog: "ff", age: 20 }};`);
//out: INSERT INTO users (dog,age) VALUES ('ff',20);
```

Update set:

```js
console.log(
  sql`UPDATE users SET ${{ dog: "ff", age: 20 }} where ${{
    name: "apple",
  }};`
);
//out: UPDATE users SET dog='ff',age=20 where (name='apple');
```

No escape insert string, but need alert to SQL injection:

use `#` start string, sql-fmt can remove `#` before insert.

```js
console.log(sql`SELECT * FROM users ${"#where name = '20' and 1=1"}`);
//out: SELECT * FROM users where name = '20' and 1=1
```

# API

Auto use sql template insert `where`\ `set` \ `values` \ `escape` in string template

## sql.escape

```js
console.log(`SELECT * FROM users WHERE name=${sql.escape("hello")};`);
//out: SELECT * FROM users WHERE name='hello';

console.log(`SELECT * FROM users WHERE name=${sql.escape("'hello' OR 1=1")}`);
//out: SELECT * FROM users WHERE name='\'hello\' OR 1=1';
```

## sql.values

```js
console.log(`INSERT INTO users ${sql.values({ dog: "ff", age: 20 })};`);
//out: INSERT INTO users (dog,age) VALUES ('ff',20);

console.log(
  `INSERT INTO users ${sql.values([
    { dog: "aa", age: 10 },
    { dog: "bb", age: 20 },
  ])};`
);
//out: INSERT INTO users (dog,age) VALUES ('aa',10),('bb',20);
```

## sql.where

```js
console.log(`SELECT * FROM users WHERE ${sql.where({ dog: "ff", age: 20 })};`);
//out: SELECT * FROM users WHERE (dog='ff' AND age=20);

console.log(
  `SELECT * FROM users WHERE ${sql.where({ dog: ["aa", "bb"], age: 20 })};`
);
//out: SELECT * FROM users WHERE ((dog='aa' OR dog='bb') AND age=20);
```

## sql.set

```js
console.log(
  `UPDATE users SET ${sql.set({ dog: "ff", age: 20 })} where ${sql.where({
    name: "apple",
  })};`
);
//out: UPDATE users SET dog='ff',age=20 where (name='apple');
```

## sql.createQuery

Cache mysql.query or pg.query and use sql template

```js
const query = sql.createQuery(mysql.query);

console.log(query`INSERT INTO users ${{ dog: "ff", age: 20 }};`);
//out: INSERT INTO users (dog,age) VALUES ('ff',20);
```
