const { State } = require('../models');

const getStates = async (data) => {
    let response;
    try {

        let states = await (
            State.findAll()
        );

        response = {
            json: {
                message: 'States successfully consulted!',
                data: states
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error consulted states!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

module.exports = {
    getStates
};