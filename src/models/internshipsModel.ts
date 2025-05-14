import { pool } from '../config/postgres';
import { Internship } from '../interfaces/internships';

const insertInternship = async (data: Internship) => {
  const query = `
    INSERT INTO internships (name)
    VALUES ($1)
    RETURNING *;
  `;
  const values = [data.id, data.practiceTitle, data.company, data.location, data.salary, data.modality, data.practiceType, data.workday, data.minimumStudies, data.languages, data.startDate, data.period, data.degree, data.minimumExperience, data.backgroundKnowledge, data.description];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getInternships = async () => {
  const result = await pool.query('SELECT * FROM internships ORDER BY id ASC');
  return result.rows;
};

const getInternship = async (id: string) => {
  const result = await pool.query('SELECT * FROM internships WHERE id = $1', [id]);
  return result.rows[0];
};

const updateInternship = async (id: string, data: Internship) => {
  const query = `
    UPDATE internships
    SET name = $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;
  `;
  const values = [data.id, data.practiceTitle, data.company, data.location, data.salary, data.modality, data.practiceType, data.workday, data.minimumStudies, data.languages, data.startDate, data.period, data.degree, data.minimumExperience, data.backgroundKnowledge, data.description];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteInternship = async (id: string) => {
  const result = await pool.query('DELETE FROM internships WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0];
};

export { insertInternship, getInternships, getInternship, updateInternship, deleteInternship };