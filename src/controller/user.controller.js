const pool = require('../db/pool');

const getAllUsers = (req, res) => {
    try {
        pool.query('SELECT COUNT(*) as total_users FROM users; SELECT * FROM users;', (err, result) => {
            if (err) {
                res.status(400).json({ errorMessage: err.message, errorName: err.name, error: err });
            } else {
                const totalUsers = result[0].rows[0].total_movie;
                const users = result[1].rows;
                const response = {
                    total_users: totalUsers,
                    users,
                };

                res.status(200).json({ response });
            }
        })
    } catch (error) {
        res.status(500).json({ errorMessage: 'Internal server error', error });
    }
}

const getUser = (req, res) => {
    try {
        const userId = req.params.id
        const query = "SELECT * FROM users WHERE id = $1"
        const values = [userId]
        pool.query(query, values, (err, result) => {
            if (err) {
                res.status(400).json({ errorMessage: err.message, errorName: err.name, error: err });
            } else {
                const user = result.rows[0]
                res.status(200).json({ user });
            }
        })
    } catch (error) {
        res.status(500).json({ errorMessage: 'Internal server error', error });
    }
}

const createUser = (req, res) => {
    try {
        const { name, email, password, is_admin } = req.body
        const query = 'INSERT INTO users(name, email, password, is_admin) VALUES($1, $2, $3, $4) RETURNING *'
        const values = [name, email, password, is_admin]
        pool.query(query, values, (err, result) => {
            if (err) {
                res.status(400).json({ errorMessage: err.message, errorName: err.name, error: err });
            } else {
                res.status(201).json({ message: 'User created successfully', result: result.rows });
            }
        })

    } catch (error) {
        res.status(500).json({ errorMessage: 'Internal server error', error });
    }
}

const updateUser = (req, res) => {
    try {
        const userId = req.params.id
        const { name, email, password, is_admin } = req.body
        const query = 'UPDATE users SET name = $1, email = $2, password = $3, is_admin = $4 WHERE id = $5 RETURNING *'
        const values = [name, email, password, is_admin, userId]
        pool.query(query, values, (err, result) => {
            if (err) {
                res.status(400).json({ errorMessage: err.message, errorName: err.name, error: err });
            } else {
                res.status(202).json({ message: 'User updated successfully', result: result.rows });
            }
        });
    } catch (error) {
        res.status(500).json({ errorMessage: 'Internal server error', error });
    }
}

const deletedUser = (req, res) => {
    try {
        const userId = req.params.id
        pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId], (err, result) => {
            if (err) {
                res.status(400).json({ errorMessage: err.message, errorName: err.name, error: err });
            } else {
                res.json({ message: 'User deleted successfully', result: result.rows });
            }
        });
    } catch (error) {
        res.status(500).json({ errorMessage: 'Internal server error', error });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deletedUser
}