const { Employee, City, State, Role } = require('../models');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

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
                  companies_id: data.company
                },
                include:[{
                    model: City,
                    as: 'city',
                    include:[{
                        model: State,
                        as: 'state'
                    }]
                },{
                    model: Role,
                    as: 'role',
                }
                ]
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
        password,
        company,
        city,
        role
    }
}) => {

    return {
        firstName,
        lastName,
        phone,
        email,
        address,
        cpf,
        password,
        companies_id: company,
        cities_id: city,
        roles_id: role
    }
}

const createEmployee = async (data) => {
    let response;
    try {
        data.password = await(bcrypt.hash(data.password, 10));

        let employee = await (
            Employee.create({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,
                address: data.address,
                cpf: data.cpf,
                password: data.password,
                companies_id: data.companies_id,
                cities_id: data.cities_id,
                roles_id: data.roles_id
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

const prepareUpdateEmployee = ({
    body: {
        id,
        firstName,
        lastName,
        phone,
        email,
        address,
        cpf,
        city,
        role
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
        cities_id: city,
        roles_id: role
    }
}

const updateEmployee = async (data) => {
    let response;
    try {

        let employee = await Employee.update(
            data,
            {
                where: {
                    id: data.id
                },
                returning: true,
                plain: true
            }
        );
        
        response = {
            json: {
                message: 'Employee successfully updated!',
                data
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error update employee!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

const prepareDeleteEmployee = ({
    params: {
        id
    }
}) => {

    return {
        id
    }
}

const deleteEmployee = async (data) => {
    let response;
    try {

        let employee = await Employee.destroy({

                where: {
                    id: data.id
                }
            }
        );
        
        response = {
            json: {
                message: 'Employee successfully updated!',
                employee
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error update employee!'
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
    createEmployee,
    prepareUpdateEmployee,
    updateEmployee,
    prepareDeleteEmployee,
    deleteEmployee
};