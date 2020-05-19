const { Employee } = require('../models');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

const prepareSignup = ({
    body: {
        name,
        login,
        password
    }
}) => {
    return {
        name,
        login,
        password
    }
}

const signUp = async (data) => {
    let response;
    try {
        data.password = await(bcrypt.hash(data.password, 10));

        let user = await (
            User.create({
                name: data.name,
                login: data.login,
                password: data.password
            })
        );
        
        response = {
            json: {
                message: 'User successfully created!',
                data: user
            }, status: 200
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error registering user!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

const prepareLogin = ({
    body: {
        email,
        password
    }
}) => {
    return {
        email,
        password
    }
}

const login = async (data) => {
    let response;
    try {

        let user = await Employee.scope('withPassword').findOne({
            raw: true,
            where: {
                email: data.email
            }
        });
        
        if(user) {
            
            var auth = (await bcrypt.compare(data.password, user.password));
        }

        if(user) {

            var token = jwt.sign(user, 'oroshi', {
                expiresIn: 3600
            });
        }

        if(auth && token) {
            
            data = {
                user: {
                    id: user.id,
                    login: user.email,
                    name: user.firstName,
                    company: user.companies_id,
                    role: user.roles_id
                },
                token
            };
            response = {
                json: {
                    message: 'Successfully authenticated user!',
                    data
                }, status: 200
            }
        }else{

            response = {
                json: {
                    message: 'Unregistered user!'
                }, status: 400
            }
        }
    }catch(error) {
        console.log(error);
        response = {
            json: {
                message: 'Error authenticated user!'
            }, status: 500
        }
    }finally {
        return response;
    }
}

module.exports = {
    signUp,
    prepareSignup,
    login,
    prepareLogin
};