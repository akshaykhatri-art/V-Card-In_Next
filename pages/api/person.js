import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    pool.query(
      "SELECT Forename, SurName, DOB FROM Person WHERE PersonId = ?",
      [id],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Database query failed" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Person not found" });
        }
        res.json(results[0]);
      }
    );
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
