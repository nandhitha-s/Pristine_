const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../database');
const { v4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined. Please check .env file.');
    process.exit(1);
}

router.post('/signup', async (req, res) => {
    const { name, email, password, phonenumber } = req.body;
    
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        console.log('Email:', email);
        console.log('Password:', password);

        // Check if user already exists
        const userCheck = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const userId = v4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (userid, name, email, passwords, phonenumber) VALUES ($1, $2, $3, $4, $5)',
            [userId, name, email, hashedPassword, phonenumber]
        );

        const token = jwt.sign({ userid: userId }, JWT_SECRET, { expiresIn: '2h' });
        return res.status(201).json({ token });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update the login route similarly
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isValidPassword = await bcrypt.compare(password, user.rows[0].passwords);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userid: user.rows[0].userid }, JWT_SECRET, { expiresIn: '2h' });
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
