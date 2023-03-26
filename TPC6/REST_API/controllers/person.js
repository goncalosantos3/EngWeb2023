var Person = require('../models/person')

// Person list
module.exports.list = () => {
    return Person.find()
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getPerson = id => {
    return Person.findOne({_id: id})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addPerson = p => {
    console.dir(p)
    return Person.create(p)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updatePerson = (p, id) => {
    return Person.updateOne({_id: id}, p)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deletePerson = id => {
    return Person.deleteOne({_id: id})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}