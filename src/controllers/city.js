const { City } = require('../models');

const prepareGetCitiesByState = ({
    params: {
        state
    }
}) => {
    return {
        state
    }
}

const getCitiesByState = async (data) => {
    let response;
    try {
        
        let cities = await (
            City.findAll({
                where: {
                    states_id: data.state
                }
            })
        );

        response = {
            json: {
                message: 'Cities successfully consulted!',
                data: cities
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error consulted cities!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

module.exports = {
    prepareGetCitiesByState,
    getCitiesByState
};