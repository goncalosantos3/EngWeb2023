const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')

/* -------------------------------------- GET ----------------------------------------- */

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.tasks()
    .then(tasks => {
      res.render('index', { tlist: tasks, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das tasks"})
    })
});

/* GET edit form. */
router.get('/tasks/edit/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.tasks()
    .then(tasks => {
      var task
      for(let i=0; i<tasks.length; i++){
        if(tasks[i].id == parseInt(req.params.idTask)){
          task = tasks[i]
        }
      }

      res.render('editFormPage', { tlist: tasks, t: task, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da task"})
    })
});

/* GET delete confirmation page. */
router.get('/tasks/delete/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.idTask)
    .then(task => {
      res.render('deleteConfirm', {t: task, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao editar o registo da task"})
    })
});

router.get('/tasks/delete/:idTask/confirm', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.deleteTask(req.params.idTask)
    .then(resp => {
      res.render('taskDeleted.pug')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao eliminar o registo da task"})
    })
});

/* -------------------------------------- POST ----------------------------------------- */

/* POST add task. */
router.post('/', function(req, res, next){
  var data = new Date().toISOString().substring(0, 16)
  Task.addTask(req.body)
    .then(task => {
      res.render('addTaskConfirm', {t: task, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao adicionar o registo da task"})
    })
})

/* POST edit task. */
router.post('/tasks/edit/:idTask', function(req, res, next){
  var data = new Date().toISOString().substring(0, 16)
  Task.editTask(req.body)
    .then(task => {
      res.render('editTaskConfirm', {t: task, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao editar o registo da task"})
    })
})

module.exports = router;
