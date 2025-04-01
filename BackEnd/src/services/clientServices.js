import { query } from "../db.js";

export const getClients = async () => {
  const { rows } = await query("SELECT * FROM clients WHERE isDeleted = false");
  return rows;
};

export const checkForEmail = async (emailToCheck) => {
  const { rows } = await query("SELECT * FROM clients WHERE email=$1", [
    emailToCheck,
  ]);
  return rows[0];
};

export const createClient = async (clientData) => {
  const { name, email, job, rate, isActive } = clientData;

  const { rows } = await query(
    "INSERT INTO clients (name, email, job, rate, isActive) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, job, rate, isActive]
  );

  return rows[0];
};

export const updateClient = async (clientData, clientId) => {
  const { name, email, job, rate, isActive } = clientData;
  const { rows } = await query(
    "UPDATE clients SET name = $1, email = $2, job = $3, rate = $4, isActive = $5 WHERE id = $6 RETURNING *",
    [name, email, job, rate, isActive, clientId]
  );
  return rows[0];
};

export const deleteClient = async (userId) => {
  try {
    const { rows: client } = await query(
      "SELECT * FROM clients WHERE id = $1",
      [userId]
    );

    if (!client || client.length === 0) {
      return { message: "Client not found" };
    }

    const { rows: updatedClient } = await query(
      "UPDATE clients SET isDeleted = true WHERE id = $1 RETURNING *",
      [userId]
    );

    return { message: "Client deleted", updatedClient };
  } catch (err) {
    console.error("Error in deleting client:", err);
  }
};

export const searchClient = async (searchTerm) => {
  const { rows } = await query(
    `SELECT * FROM clients WHERE (name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1) AND isDeleted = false`,
    [`%${searchTerm}%`]
  );
  return rows;
};
