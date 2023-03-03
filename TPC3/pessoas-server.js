var http = require('http');
var axios = require('axios');
var myPages = require('./myPages');
var fs = require('fs');

// Só é necessário fazer parsing ao URL quando houver query strings ao barulho

http.createServer(function (req, res){
    var d = new Date().toISOString().substring(0, 16)

    console.log(req.method + " " + req.url + " " + d)

    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(myPages.genMainPage())
    }else if(req.url == '/pessoas'){ 
        axios.get('http://localhost:3000/pessoas') // Vai buscar a lista de pessoas
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(myPages.genPeopleList(pessoas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200,)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }else if(req.url == '/pessoasOrdenadas'){ 
        // Vai buscar a lista de pessoas e ordena a lista por ordem ascendente de nomes
        axios.get('http://localhost:3000/pessoas?_sort=nome') 
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(myPages.genPeopleList(pessoas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }else if(req.url.match(/\/pessoas\/p\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9)) 
            .then(function(resp){
                var pessoa = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(myPages.genPersonPage(pessoa, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }else if(req.url == "/distSexo"){
        axios.get('http://localhost:3000/pessoas') 
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(myPages.genSexDist(pessoas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }else if(req.url == "/pessoas/feminino"){
        axios.get('http://localhost:3000/pessoas?sexo=feminino') 
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(myPages.genPeopleList(pessoas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }else if(req.url == "/pessoas/masculino"){
        axios.get('http://localhost:3000/pessoas?sexo=masculino') 
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(myPages.genPeopleList(pessoas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }else if(req.url == "/pessoas/outro"){
        axios.get('http://localhost:3000/pessoas?sexo=outro') 
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(myPages.genPeopleList(pessoas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtenção de dados: ' + erro + '</p>')
            })
    }else if(req.url == "/distDesporto"){
    
    }else if(req.url == "/top10Pro"){

    }else if(req.url.match(/w3.css$/)){ // Página css
        fs.readFile("w3.css", function(err, data){
            if(err){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + err + '</p>')
            }else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(data)
            }
        })
    }else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }

}).listen(7777);

console.log("Servidor à escuta na porta 7777...");
