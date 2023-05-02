var express = require('express');
var router = express.Router();
var Emd = require('../controllers/emd')

// Devolve a lista de EMD apenas com os campos "id", "nome", "data" e "resultado"
// Devolve a lista de EMD com resultado "true"
// Devolve a lista de EMD referentes à modalidade passada como parâmetro, X
router.get('/api/emd', function(req, res, next) {
  let resu = req.query.res
  let modalidade = req.query.modalidade
  
  if(resu != undefined && resu == "OK"){
    Emd.trueRes()
      .then(emds => {
        console.dir(emds)
        res.status(200).jsonp(emds)
      })
      .catch(erro => {
        res.status(504).jsonp({error: "Erro na obtenção dos emds: " + erro})
      })
  }else if(modalidade != undefined){
    console.dir(modalidade)
    Emd.modalidade(modalidade)
      .then(emds => {
        console.dir(emds)
        res.status(200).jsonp(emds)
      })
      .catch(erro => {
        res.status(505).jsonp({error: "Erro na obtenção dos emds: " + erro})
      })
  }else{
    Emd.list()
      .then(lista => {
        console.dir(lista)
        res.status(200).jsonp(lista)
      })
      .catch(erro => {
        res.status(501).jsonp({error: "Erro na obtenção da lista: " + erro})
      })
  }
});

// Devolve a informação completa de um EMD
router.get('/api/emd/:id', function(req, res, next) {
  Emd.getOne(req.params.id)
    .then(emd => {
      console.dir(emd)
      res.status(200).jsonp(emd)
    })
    .catch(erro => {
      res.status(502).jsonp({error: "Erro na obtenção do EMD: " + erro})
    })
});

// Devolve a lista de modalidades, sem repetições
router.get('/api/modalidades', function(req, res, next) {
  Emd.modalidades()
    .then(modalidades => {
      console.dir(modalidades)
      res.status(200).jsonp(modalidades)
    })
    .catch(erro => {
      res.status(503).jsonp({error: "Erro na obtenção das modalidades: " + erro})
    })
});

// Devolve uma lista ordenada alfabeticamente com os nomes dos atletas de género feminino
// Devolve uma lista ordenada alfabeticamente com os nomes dos atletas do clube X
router.get('/api/atletas', function(req, res, next) {
  let gen = req.query.gen
  let clube = req.query.clube

  if(gen != undefined && gen == "F")
    Emd.atlFem()
      .then(nomes => {
        console.dir(nomes)
        res.status(200).jsonp(nomes)
      })
      .catch(erro => {
        res.status(506).jsonp({error: "Erro na obtenção dos nomes dos atletas femininos: " + erro})
      })
  else if(clube != undefined)
    Emd.clube(clube)
    .then(nomes => {
      console.dir(nomes)
      res.status(200).jsonp(nomes)
    })
    .catch(erro => {
      res.status(506).jsonp({error: "Erro na obtenção dos nomes dos atletas do clube" + clube + ": " + erro})
    })
});

module.exports = router;
