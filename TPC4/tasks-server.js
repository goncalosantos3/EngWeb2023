var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux functions
// Esta função serve para retirar a informação dos campos de um formulário e devolver 
// essa informação à callback function
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var tasksServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // Home page
                if(req.url == "/"){
                    axios.get("http://localhost:3000/tasks")
                    .then(response => {
                        var tasks = response.data
                        // Render page with all the completed and not completed tasks
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(templates.homePage(tasks, d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                        res.end()
                    })
                }else if(/\/edit\/[0-9]+/.test(req.url)){ // Edição de uma tarefa
                    var task = req.url.substring(6)
                    console.log(task)
                    axios.get("http://localhost:3000/tasks")
                    .then(response => {
                        var tasks = response.data
                        // Render page with all the completed and not completed tasks
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(templates.editTask(tasks, task, d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a tarefa pedida... Erro: " + erro)
                        res.end()
                    })
                }else if(/\/delete\/\w+/.test(req.url)){ // Remoção de uma tarefa
                    var id = req.url.substring(8)
                    console.log(id)
                    axios.delete('http://localhost:3000/tasks/' + id)
                    .then(resp => {
                        console.log("Delete " + id + " :: " + resp.status);
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write('<p>Registo apagado: ' + id + '</p>')
                        res.end('<a href="/">Go back to the home page</a>')
                    }).catch(error => {
                        console.log('Erro: ' + error);
                        res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end("<p>Unable to delete record: " + id + "</p>")
                    })
                }   
                break
            case "POST":
                if(req.url == "/"){ // Inserção de uma nova task
                    collectRequestBodyData(req, result =>{
                        if(result){ // A informção do formulário foi corretamente extraída
                            axios.post('http://localhost:3000/tasks', result)
                            .then(resp => {
                                console.log(resp.data);
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Registo inserido:' + JSON.stringify(resp.data) + '</p>')
                                res.end('<a href="/">Go back to the home page</a>')
                            }).catch(error => {
                                console.log('Erro: ' + error);
                                res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end('<p>Unable to insert record...</p>')
                            });
                        }else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

tasksServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})




