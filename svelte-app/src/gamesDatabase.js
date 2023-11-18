import { SQL } from 'sql.js';

const db = new SQL.Database('games.db');

export async function getGames() {
  const result = await db.query('SELECT * FROM games');
  return result.data;
}
