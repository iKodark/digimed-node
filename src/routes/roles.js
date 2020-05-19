const {
    getRoles
} = require('../controllers/role');

module.exports = function (app) {
    app.get('/api/roles', async function (req, res) {

        getRoles(req)
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}