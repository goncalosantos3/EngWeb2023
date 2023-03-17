var axios = require('axios')

module.exports.tasks = () => {
    return axios.get('http://localhost:3000/tasks')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getTask = id => {
    return axios.get('http://localhost:3000/tasks/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addTask = t => {
    return axios.post('http://localhost:3000/tasks', t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.editTask = t => {
    return axios.put('http://localhost:3000/tasks/' + t.id, t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteTask = id => {
    return axios.delete('http://localhost:3000/tasks/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

