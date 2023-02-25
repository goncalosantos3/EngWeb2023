var http = require('http');
var url = require('url'); 
var fs = require('fs'); // Módulo File System

var myServer = http.createServer(function (req, res){
    console.log(req.method + " " + req.url);

    var pedido = url.parse(req.url, true).pathname;

    if (pedido.length == 1){ // Pedido == "/" -> ficheiro principal (index.html)
        fs.readFile('index.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

            if(err){
                res.write("ERRO: na leitura do ficheiro :: " + err);
            }else{
                res.write(data);
            }
            res.end();
        }); 
    }else if(pedido == "/style.css"){ // Ficheiro CSS
        fs.readFile(pedido.substring(1), function(err, data){

            if(err){
                res.write("ERRO: na leitura do ficheiro :: " + err);
            }else{
                res.write(data);
            }
            res.end();
        });
    }else{ // Ficheiro html de uma cidade 
        // pedido.substring(1) retira o primeiro caracter da string que é o "/"
        fs.readFile(pedido.substring(1) + ".html", function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

            if(err){
                res.write("ERRO: na leitura do ficheiro :: " + err);
            }else{
                res.write(data);
            }
            res.end();
        });
    }
});
 
myServer.listen(7777);
console.log("Servidor à escuta na porta 7777...");

// O segundo parâmetro de fs.readFile é uma callback function. 
// Uma callback function é uma função que executa quando outra acaba a sua execução
// Ou seja, quando o SO acabar de ler o ficheiro a função que tá no segundo parâmetro é invocada