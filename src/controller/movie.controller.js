const pool = require('../db/pool');

const getAllMovies = (req, res, next) => {
    try {
        pool.query('SELECT COUNT(*) as total_movie FROM movie; SELECT * FROM movie;', (err, result) => {
            if (err) {
                console.error('Error executing SQL query', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                const totalMovies = result[0].rows[0].total_movie;

                const movies = result[1].rows;

                const response = {
                    total_movies: totalMovies,
                    movies,
                };

                res.status(200).json({ response });
            }
        });
    } catch (error) {
        console.log(error)
        res.status(404).json({ error })
    }
}

const createMovie = (req, res) => {
    try {
        const { title,
            description,
            image,
            stock,
            rental_price,
            sale_price,
            available, } = req.body

        const query = 'INSERT INTO movie(title, description, image, stock, rental_price, sale_price, available) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * '
        const values = [title, description, image, stock, rental_price, sale_price, available]

        pool.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting movie into the database', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(201).json({ message: 'Movie created successfully', result: result.rows });
            }
        });
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const updateMovie = (req, res) => {
    try {
        const moviesId = req.params.id;
        const { title,
            description,
            image,
            stock,
            rental_price,
            sale_price,
            available, } = req.body

        pool.query('UPDATE movie SET title = $1, description = $2, image = $3, stock = $4, rental_price = $5, sale_price = $6, available = $7 WHERE id = $8 RETURNING *', [title, description, image, stock, rental_price, sale_price, available, moviesId], (err, result) => {
            if (err) {
                console.error('Error updating movie in the database', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(202).json({ message: 'Movie updated successfully', result: result.rows });
            }
        });
    } catch (error) {

    }
}

const deleteMovie = (req, res) => {
    try {
        const movieId = req.params.id;
        pool.query('DELETE FROM movie WHERE id = $1 RETURNING *', [movieId], (err, result) => {
            if (err) {
                console.error('Error deleting user from the database', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json({ message: 'Movie deleted successfully', result: result.rows });
            }
        });
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports = {
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
}