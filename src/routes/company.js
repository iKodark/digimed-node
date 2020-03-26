const {
    getCompanies
} = require('../controllers/company');

module.exports = function (app) {
    app.get('/api/companies', async function (req, res) {

        getCompanies(req)
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}