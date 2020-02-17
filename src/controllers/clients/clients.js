const { Client } = require('../../models');

const prepareGetClients = ({
    params: {
        user
    }
}) => {
    return {
        user
    }
}

const getClients = async (data) => {
    let response;
    try {

        let clients = await (
            Client.findAll({
                where: {
                  id_user: data.user
                }
            })
        );

        response = {
            json: {
                message: 'Clients successfully consulted!',
                data: clients
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error consulted clients!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

const prepareSetClient = ({
    body: {
        name,
        cpf,
        date_of_birth,
        phone,
        cep,
        address,
        state,
        city,
        user
    }
}) => {
    return {
        name,
        cpf,
        date_of_birth,
        phone,
        cep,
        address,
        state,
        city,
        user
    }
}

const setClient = async (data) => {
    let response;
    try {

        let client = await (
            Client.create({
                name: data.name,
                cpf: data.cpf,
                date_of_birth: data.date_of_birth,
                phone: data.phone,
                cep: data.cep,
                address: data.address,
                state: data.state,
                city: data.city,
                id_user: data.user
            })
        );
        
        response = {
            json: {
                message: 'Clients successfully consulted!',
                data: client
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error consulted clients!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

module.exports = {
    prepareGetClients,
    getClients,
    prepareSetClient,
    setClient
};