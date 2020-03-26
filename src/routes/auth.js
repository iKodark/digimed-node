const {
    signUp,
    prepareSignup,
    login,
    prepareLogin
} = require('../controllers/auth');

module.exports = function (app) {
    app.post('/api/signup', async function (req, res) {

           signUp(prepareSignup(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.post('/api/login', async function (req, res) {
        
        login(prepareLogin(req))
        .then((success) => {res.status(success.status).json(success.json)})
        .catch((error) => {res.status(error.status).json(error.json)})
 });
}