const { User } = require('../../models');
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
        login,
        password
    }
}) => {
    return {
        login,
        password
    }
}

const login = async (data) => {
    let response;
    try {

        let user = await User.findOne({
            raw: true,
            where: {
                login: data.login
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
            user = {
                id: user.id,
                login: user.login,
                name: user.name
            };
            console.log(user);
            response = {
                json: {
                    message: 'Successfully authenticated user!',
                    data: user,
                    token
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
                message: 'Error registering user!'
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