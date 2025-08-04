import { neon } from "@neondatabase/serverless";

import "dotenv/config";

//pravimo sql konekciju koriscnenjem nase baze
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
    //10,2 znaci 8 maksimalnih  brojeva i 2 iza zareza
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("error initializing DB", Error);
    process.exit(1); //znaci failure, 0 uspesno
  }
}
