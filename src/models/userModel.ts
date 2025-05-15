import { pool } from "../config/postgres";
import { User } from "../interfaces/user";

const insertUser = async (data: User) => {
  const query = `
    INSERT INTO users (email, password, username)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [data.email, data.password, data.username];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const getUserById = async (id: string) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const getUserByNameAndEmail = async (name: string, email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE name = $1 AND email = $2', [name, email]);
  return result.rows[0];
};

export { insertUser, getUserByEmail, getUserById, getUserByNameAndEmail };