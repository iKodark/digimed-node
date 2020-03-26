const { Company } = require('../models');

const getCompanies = async (data) => {
    let response;
    try {

        let companies = await (
            Company.findAll()
        );

        response = {
            json: {
                message: 'Companies successfully consulted!',
                data: companies
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error consulted companies!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

module.exports = {
    // prepareGetClients,
    getCompanies,
    // prepareSetClient,
    // setClient
};