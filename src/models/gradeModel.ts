import { pool } from '../config/postgres';
import { Grade } from '../interfaces/grade';

const insertGrade = async (item: Grade) => {
  const query = `
    INSERT INTO grades (name)
    VALUES ($1)
    RETURNING *;
  `;
  const values = [item.name];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getGrades = async () => {
  const result = await pool.query('SELECT * FROM grades ORDER BY id ASC');
  return result.rows;
};

const getGrade = async (id: string) => {
  const result = await pool.query('SELECT * FROM grades WHERE id = $1', [id]);
  return result.rows[0];
};

const updateGrade = async (id: string, data: Grade) => {
  const query = `
    UPDATE grades
    SET name = $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
  `;
  const values = [data.name, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteGrade = async (id: string) => {
  const result = await pool.query('DELETE FROM grades WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0];
};

export { insertGrade, getGrades, getGrade, updateGrade, deleteGrade };