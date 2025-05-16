import { pool } from "../config/postgres";
import { Company } from "../interfaces/company";

const insertCompany = async (item: Company) => {
  const query = `
    INSERT INTO company (name)
    VALUES ($1)
    RETURNING *;
  `;
  const values = [item.name];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getCompanies = async () => {
  const result = await pool.query("SELECT * FROM company ORDER BY id ASC");
  return result.rows;
};

const getCompany = async (id: string) => {
  const result = await pool.query("SELECT * FROM company WHERE id = $1", [id]);
  return result.rows[0];
};

const updateCompany = async (id: string, data: Company) => {
  const query = `
    UPDATE company
    SET name = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [data.name, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};


const deleteCompany = async (id: string) => {
  const result = await pool.query("DELETE FROM company WHERE id = $1 RETURNING *;", [id]);
  return result.rows[0];
};

export { insertCompany, getCompanies, getCompany, updateCompany, deleteCompany};