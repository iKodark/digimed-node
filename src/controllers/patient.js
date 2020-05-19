const { City, State, Patient } = require('../models');

// Catch all patients of a company
const prepareReadPatients = ({
    params: {
        company
    }
}) => {
    return {
        company
    }
}

const readPatients = async(data) => {
    let response;
    try {

        let patients = await (
            Patient.findAll({
                where: {
                    companies_id: data.company
                },
                include: [{
                    model: City,
                    as: 'city',
                    include: [{
                        model: State,
                        as: 'state'
                    }]
                }]
            })
        );

        response = {
            json: {
                message: 'Patients successfully consulted!',
                data: patients
            },
            status: 200
        }
    } catch (error) {
        console.log(error);
        response = {
            json: {
                message: 'Error consulted patients!'
            },
            status: 500
        }
    } finally {
        return response;
    }
}

// Create an patient for the company
const prepareCreatePatient = ({
    body: {
        firstName,
        lastName,
        phone,
        email,
        address,
        cpf,
        company,
        city
    }
}) => {

    return {
        firstName,
        lastName,
        phone,
        email,
        address,
        cpf,
        companies_id: company,
        cities_id: city
    }
}

const createPatient = async(data) => {
    let response;
    try {

        let patient = await (
            Patient.create({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,
                address: data.address,
                cpf: data.cpf,
                companies_id: data.companies_id,
                cities_id: data.cities_id
            })
        );

        response = {
            json: {
                message: 'Patient successfully created!',
                data: patient
            },
            status: 200
        }
    } catch (error) {
        console.log(error);
        response = {
            json: {
                message: 'Error create patient!'
            },
            status: 500
        }
    } finally {
        return response;
    }
}

const prepareUpdatePatient = ({
    body: {
        id,
        firstName,
        lastName,
        phone,
        email,
        address,
        cpf,
        city
    }
}) => {

    return {
        id,
        firstName,
        lastName,
        phone,
        email,
        address,
        cpf,
        cities_id: city
    }
}

const updatePatient = async(data) => {
    let response;
    try {

        let patient = await Patient.update(
            data, {
                where: {
                    id: data.id
                },
                returning: true,
                plain: true
            }
        );

        response = {
            json: {
                message: 'Patient successfully updated!',
                data
            },
            status: 200
        }
    } catch (error) {
        console.log(error);
        response = {
            json: {
                message: 'Error update patient!'
            },
            status: 500
        }
    } finally {
        return response;
    }
}

const prepareDeletePatient = ({
    params: {
        id
    }
}) => {

    return {
        id
    }
}

const deletePatient = async(data) => {
    let response;
    try {

        let patient = await Patient.destroy({

            where: {
                id: data.id
            }
        });

        response = {
            json: {
                message: 'Patient successfully updated!',
                patient
            },
            status: 200
        }
    } catch (error) {
        console.log(error);
        response = {
            json: {
                message: 'Error update patient!'
            },
            status: 500
        }
    } finally {
        return response;
    }
}

module.exports = {
    prepareReadPatients,
    readPatients,
    prepareCreatePatient,
    createPatient,
    prepareUpdatePatient,
    updatePatient,
    prepareDeletePatient,
    deletePatient
};