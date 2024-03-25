require('dotenv').config();
const { data } = require('./data');
const jwt = require('jsonwebtoken');

const accessValidation = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            status: 'error',
            message: 'token diperlukan'
        })
    }
    const token = authorization.split(' ')[1];
    const secret = process.env.SECRET_KEY;
    try {
        const jwtDecode = jwt.verify(token, secret);
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'token invalid'
        })
    }
    next();
}
const loginHandler = (req, res) => {
    console.log({ req })
    const payload = {
        username: req.body.username,
        password: req.body.password,
    }
    const isPasswordValid = data.find(user => user.username === payload.username && user.password === payload.password);
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret);
    if (isPasswordValid) {
        return res.status(200).json({
            status: 'success',
            message: 'Login Successfully',
            token: token,
        })
    }
    return res.status(400).json({
        status: 'error',
        message: 'Invalid username or password'
    })
}
const userHandler = (req, res) => {
    return res.status(200).json({
        status: 'success',
        data: data,
    });
}
const logoutHandler = (req, res) => {
    res.status(200).json(data);
}

module.exports = { loginHandler, userHandler, logoutHandler, accessValidation }