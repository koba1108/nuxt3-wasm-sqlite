import initSqlJs, {Database} from "sql.js";

export default defineNuxtPlugin(async () => {
  const appConfig = useAppConfig()
  console.log({ appConfig })
  const locateFile = (file: string) => `/nuxt3-wasm-sqlite/wasm/${file}`
  const SQL = await initSqlJs({locateFile});
  const db = new SQL.Database();

  // テーブル作成＆テストデータ投入
  createUserTable(db);
  createSeedUsers(db);

  return {
    provide: {
      db
    }
  }
})

const createUserTable = (db: Database): Database => {
  return db.run("CREATE TABLE users (id, name, createdAt, updatedAt);");
}

const createSeedUsers = (db: Database): Database => {
  const now = new Date().toLocaleString();
  const users = [
    {id: 1, name: 'Alice', createdAt: now, updatedAt: now},
    {id: 2, name: 'Bob', createdAt: now, updatedAt: now},
    {id: 3, name: 'Carol', createdAt: now, updatedAt: now},
  ];
  users.forEach((user) => {
    const query = 'INSERT INTO users VALUES ($id, $name, $createdAt, $updatedAt);';
    db.run(query, {
      $id: user.id,
      $name: user.name,
      $createdAt: user.createdAt,
      $updatedAt: user.updatedAt,
    });
    console.log(`Inserted user: ${user.name}`);
  });
  console.log('Inserted seed users.');
  return db;
}
