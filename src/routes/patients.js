const {
    prepareReadPatients,
    readPatients,
    prepareCreatePatient,
    createPatient,
    prepareUpdatePatient,
    updatePatient,
    prepareDeletePatient,
    deletePatient
} = require('../controllers/patient');

module.exports = function(app) {
    app.get('/api/patients/:company', async function(req, res) {

        readPatients(prepareReadPatients(req))
            .then((success) => { res.status(success.status).json(success.json) })
            .catch((error) => { res.status(error.status).json(error.json) })
    });

    app.post('/api/patient', async function(req, res) {

        createPatient(prepareCreatePatient(req))
            .then((success) => { res.status(success.status).json(success.json) })
            .catch((error) => { res.status(error.status).json(error.json) })
    });

    app.put('/api/patient', async function(req, res) {

        updatePatient(prepareUpdatePatient(req))
            .then((success) => { res.status(success.status).json(success.json) })
            .catch((error) => { res.status(error.status).json(error.json) })
    });

    app.delete('/api/patient/:id', async function(req, res) {

        deletePatient(prepareDeletePatient(req))
            .then((success) => { res.status(success.status).json(success.json) })
            .catch((error) => { res.status(error.status).json(error.json) })
    });
}