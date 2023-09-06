import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "full_stack"
});

export const createUsersTable = async () => {
  try {
    const connection = await pool.getConnection();

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address VARCHAR(255) NOT NULL,
        answer VARCHAR(255) NOT NULL,
        role_as INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )
    `);

    connection.release();

    console.log("Users table created successfully!");
    return true;
  } catch (error) {
    console.error("Error creating users table:", error);
    return false;
  }
};

export const createUser = async (name, email, password, phone, address, answer) => {
  try {
    const connection = await pool.getConnection();
    
    await connection.execute(`
      INSERT INTO users (name, email, password, phone, address, answer)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [name, email, password, phone, address, answer]);

    connection.release();

    console.log("User created successfully!");
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

export const findUserByEmail = async (email) => {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    connection.release();

    return rows[0] || null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
};


export const findEmailAndUpdate = async (email, password, answer) => {
  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ? AND answer = ?',
      [email, answer]
    );

    if (rows.length > 0) {
      // Update the password here
      await connection.execute(
        'UPDATE users SET password = ? WHERE email = ?',
        [password, email]
      );

      connection.release();
      return true;
    }

    connection.release();
    return false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const findUserById = async (id) => {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    connection.release();

    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error("Error finding user by id:", error);
    return null;
  }
};



// Function to find a user by ID
export const findById = async (id, req) => {
  try {
    const connection = await pool.getConnection();

    if (!id) {
      // If 'id' is not provided, attempt to use the 'userId' from the request object
      if (!req || !req.user || !req.user.id) {
        throw new Error("User ID not available");
      }
      id = req.user.id;
    }

    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    connection.release();

    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error("Error finding user by id:", error);
    return null;
  }
};



// Function to update a user by ID
export const findByIdAndUpdate = async (id, user) => {
  try {
    const connection = await pool.getConnection();

    // Generate the SQL update statement dynamically based on the provided user object
    const updateFields = [];
    const updateValues = [];

    for (const key in user) {
      if (key !== 'id' && user[key] !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(user[key]);
      }
    }

    // Add the user ID at the end of the values array
    updateValues.push(id);

    // Construct the SQL update statement
    const updateFieldsString = updateFields.join(", ");
    const sql = `UPDATE users SET ${updateFieldsString} WHERE id = ?`;

    const [result] = await connection.execute(sql, updateValues);

    connection.release();

    if (result.affectedRows > 0) {
      return user; // Return the updated user object
    } else {
      return null; // No rows were updated, likely because the user with the given ID doesn't exist
    }
  } catch (error) {
    console.error("Error updating user by ID:", error);
    return null;
  }
};
