import { pool } from '../config/postgres';
import { Degree } from '../interfaces/degree';

const insertDegree = async (item: Degree) => {
  const query = `
    INSERT INTO degree (name)
    VALUES ($1)
    RETURNING *;
  `;
  const values = [item.name];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getDegrees = async () => {
  const result = await pool.query('SELECT * FROM degree ORDER BY id ASC');
  return result.rows;
};

const getDegree = async (id: string) => {
  const result = await pool.query('SELECT * FROM degree WHERE id = $1', [id]);
  return result.rows[0];
};

const updateDegree = async (id: string, data: Degree) => {
  const query = `
    UPDATE degree
    SET name = $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
  `;
  const values = [data.name, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteDegree = async (id: string) => {
  const result = await pool.query('DELETE FROM degree WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0];
};

export { insertDegree, getDegrees, getDegree, updateDegree, deleteDegree };