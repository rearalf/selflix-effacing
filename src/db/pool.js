const { Pool } = require('pg')

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

module.exports = pool;