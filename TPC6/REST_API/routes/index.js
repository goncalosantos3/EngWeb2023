var express = require('express');
var router = express.Router();
var Person = require('../controllers/person')

/* --------------------------------------- GET ---------------------------------------------- */
/* GET home page. */
router.get('/people', function(req, res) {
  Person.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, message: "Não consegui obter a lista de pessoas!"}))
});

router.get('/people/:id', (req,res) => {
  Person.getPerson(req.params.id)
    .then(dados => {
      res.status(200).json(dados)
    })
    .catch(erro => res.status(521).json({erro: erro, message: "Não consegui obter o registo da pessoa!"}))
})

/* --------------------------------------- POST ---------------------------------------------- */

router.post('/people', (req, res) => {
  Person.addPerson(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(522).json({erro: erro, message: "Não consegui inserir o registo da pessoa!"}))
})

/* --------------------------------------- PUT ----------------------------------------------- */

router.put('/people/:id', (req, res) => {
  Person.updatePerson(req.body, req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(523).json({erro: erro, message: "Não consegui atualizar o registo da pessoa!"}))
})

/* --------------------------------------- DELETE -------------------------------------------- */

router.delete('/people/:id', (req, res) => {
  Person.deleteExame(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(524).json({erro: erro, message: "Não consegui eliminar o registo da pessoa!"}))
})

module.exports = router;