const { Pool } = require('pg')
const bcrypt = require('bcrypt');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
})

// Create the Movies table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    stock INT,
    rental_price DOUBLE PRECISION,
    sale_price DOUBLE PRECISION,
    available BOOLEAN
  )
`, (err, result) => {
    if (err) {
        console.error('Error creating the movies table', err);
    } else {
        console.log('Movies table created successfully', result);
    }
});

// Create the User table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE  NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN
  )
`, (err, result) => {
    if (err) {
        console.error('Error creating the user table', err);
    } else {
        console.log('User table created successfully', result);
    }
});


if (process.env.INICIALIZACION_COMPLETADA !== 'true') {
    (async () => {
        try {
            const hashedPassword = await bcrypt.hash('admin', 10);
            pool.query('SELECT * FROM "public"."users"', (err, result) => {
                if (err) {
                    console.error('Error executing SQL SELECT query', err);
                } else {
                    const user = result.rows[0];
                    if (!user) {
                        pool.query('INSERT INTO users(name, email, password, is_admin) VALUES($1, $2, $3, $4) RETURNING *', ['admin', 'admin@admin.com', hashedPassword, true], (err, result) => {
                            if (err) {
                                console.error('Error executing SQL query', err);

                            } else {
                                console.log({ result: result.rows });
                            }
                        })
                    }
                }
            })
        } catch (error) {
            console.error('Error durante la inicialización:', error);
        }
    })()
}

module.exports = pool;