const routes = require('express').Router();
const { loginHandler, userHandler, logoutHandler, accessValidation } = require('./handler');

routes.post('/login', loginHandler);
routes.get('/user', accessValidation, userHandler);
routes.get('/logout', accessValidation, logoutHandler);

module.exports = routes;