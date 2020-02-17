const {getUsers} = require('../../controllers/users/users');

module.exports = function (app) {

    app.get('/api/users', async function (req, res) {
        getUsers().
        then((data) => {res.send(data)})
    });
}