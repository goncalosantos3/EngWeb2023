var Emd = require('../models/emd')

// Emd list
module.exports.list = () => {
    return Emd
        .find({},{nome:1, dataEMD: 1, resultado: 1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getOne = id => {
    return Emd
        .find({_id: id})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.modalidades = () => {
    return Emd
        .distinct('modalidade')
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.trueRes = () => {
    return Emd
        .find({resultado: true})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.modalidade = m => {
    return Emd  
        .find({modalidade: m})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.atlFem = () => {
    return Emd  
        .find({género: 'F'}, {_id: 0, nome: 1})
        .sort({nome: 1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.clube = c => {
    return Emd  
        .find({clube: c}, {_id: 0, nome: 1})
        .sort({_id: 0, nome: 1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}