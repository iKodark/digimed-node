const {
    getStates
} = require('../controllers/state');

module.exports = function (app) {
    app.get('/api/states', async function (req, res) {

        getStates(req)
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}