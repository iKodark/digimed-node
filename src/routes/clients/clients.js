const {
    prepareGetClients,
    getClients,
    prepareSetClient,
    setClient
} = require('../../controllers/clients/clients');

module.exports = function (app) {
    app.get('/api/get/clients/:user', async function (req, res) {

        getClients(prepareGetClients(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.post('/api/set/client', async function (req, res) {
        console.log(req.body);
        setClient(prepareSetClient(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}