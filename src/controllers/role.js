const { Role } = require('../models');

const getRoles = async (data) => {
    let response;
    try {

        let roles = await (
            Role.findAll()
        );

        response = {
            json: {
                message: 'Roles successfully consulted!',
                data: roles
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error consulted roles!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

module.exports = {
    getRoles
};