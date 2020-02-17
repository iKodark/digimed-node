const { User } = require('../../models');

const getUsers = async () => {

    try {

        const users = await User.findOne({
            raw: true,
            where: {
                login: 'admin'
            }
        });
        console.log(users);
        resposta = {
            json: {
                mensagem: 'Clientes listados com sucesso!',
                users
            }, status: 200
        };
        
    }catch(error){
        console.log(error);
        resposta = { json: { mensagem: 'Erro ao consultar clientes!' }, status: 500 };
    }finally {
        return resposta;
    }
}

module.exports = {
    getUsers
};
