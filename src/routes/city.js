const {
    prepareGetCitiesByState,
    getCitiesByState
} = require('../controllers/city');

module.exports = function (app) {
    app.get('/api/cities/:state', async function (req, res) {

        getCitiesByState(prepareGetCitiesByState(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}