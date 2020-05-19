const {
    prepareReadEmployees,
    readEmployees,
    prepareCreateEmployee,
    createEmployee,
    prepareUpdateEmployee,
    updateEmployee,
    prepareDeleteEmployee,
    deleteEmployee
} = require('../controllers/employee');

module.exports = function (app) {
    app.get('/api/employees/:company', async function (req, res) {

        readEmployees(prepareReadEmployees(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.post('/api/employee', async function (req, res) {

        createEmployee(prepareCreateEmployee(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.put('/api/employee', async function (req, res) {

        updateEmployee(prepareUpdateEmployee(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });

    app.delete('/api/employee/:id', async function (req, res) {

        deleteEmployee(prepareDeleteEmployee(req))
           .then((success) => {res.status(success.status).json(success.json)})
           .catch((error) => {res.status(error.status).json(error.json)})
    });
}