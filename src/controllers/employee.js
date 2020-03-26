const { Employee, City, State } = require('../models');

// Catch all employees of a company
const prepareReadEmployees = ({
    params: {
        company
    }
}) => {
    return {
        company
    }
}

const readEmployees = async (data) => {
    let response;
    try {

        let employees = await (
            Employee.findAll({
                where: {
                  company_id: data.company
                },
                include:[{
                    model: City,
                    as: 'city',
                    include:[{
                        model: State,
                        as: 'state'
                    }]
                }]
            })
        );

        response = {
            json: {
                message: 'Employees successfully consulted!',
                data: employees
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error consulted employees!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

// Create an employee for the company
const prepareCreateEmployee = ({
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
        companyId: company,
        cityId: city,
    }
}

const createEmployee = async (data) => {
    let response;
    try {
        console.log(data);
        let employee = await (
            Employee.create({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,
                address: data.address,
                cpf: data.cpf,
                company_id: data.companyId,
                city_id: data.cityId
            })
        );
        
        response = {
            json: {
                message: 'Employee successfully created!',
                data: employee
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error create employee!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

module.exports = {
    prepareReadEmployees,
    readEmployees,
    prepareCreateEmployee,
    createEmployee
};