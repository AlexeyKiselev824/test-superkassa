import pg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const db = new pg.Client(process.env.db_URL);

try {
    await db.connect();
} catch (error) {
    console.error('could not connect to postgres', error);
}

// debag
await db.query(`DELETE FROM ${process.env.db_name}`);

export default db;