// myPages.js
// 2023-03-03 by sawyer kkkkkkkkkk
// HTML templates generating functions

exports.genMainPage = function(){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Main Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <center><h1>Página Inicial sobre Pessoas</h1></center>
            <ul class="w3-ul w3-center">
                <li class="w3-padding-large"><a href="/pessoas">Lista de Pessoas</a></li>
                <li class="w3-padding-large"><a href="/pessoasOrdenadas">Lista de Pessoas Ordenada</a></li>
                <li class="w3-padding-large"><a href="/distSexo">Distribuição por Sexo</a></li>
                <li class="w3-padding-large"><a href="/distDesporto">Distribuição por Desporto</a></li>
                <li class="w3-padding-large"><a href="/top10Pro">Top 10 Profissões</a></li>
            </ul>
        </body>
    </html>
    `
    return pagHTML
}

exports.genPeopleList = function(lista, data){
    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Pessoas</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Cidade</th>
                        </tr>
    `

    for(let i = 0; i < lista.length; i++){
        pagHTML += `
                        <tr>
                            <td>${lista[i].id}</td>
                            <td>
                                <a href="/pessoas/${lista[i].id}">${lista[i].nome}</a>
                            </td>
                            <td>${lista[i].idade}</td>
                            <td>${lista[i].sexo}</td>
                            <td>${lista[i].morada.cidade}</td>
                        </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div> 
        </body>
    </html>
    `

    return pagHTML
}

exports.genPersonPage = function(p, d){
    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>${p.nome}</h1>
                </header>
                <div class="container">
                    <p>Preencher com os outros campos...</p>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                </footer>
            </div> 
        </body>
    </html>
    `
    return pagHTML
}

exports.genSexDist = function(pessoas, data){
    var feminino = 0
    var masculino = 0
    var outro = 0

    for(let i = 0; i < pessoas.length; i++){
        if(pessoas[i].sexo == "feminino"){
            feminino++
        }else if(pessoas[i].sexo == "masculino"){
            masculino++
        }else{
            outro++
        }
    }

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Distribuição por Sexo</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <h1>Distribuição por Sexo</h1>
            <table class="w3-table w3-striped">
                <tr>
                    <th>Sexo</th>
                    <th>Quantidade</th>
                </tr>
                <tr>
                    <td>Feminino</td>
                    <td><a href="/pessoas/feminino">${feminino}</a></td>
                </tr>
                <tr>
                    <td>Masculino</td>
                    <td><a href="/pessoas/masculino">${masculino}</a></td>
                </tr>
                <tr>
                    <td>Outro</td>
                    <td><a href="/pessoas/outro">${outro}</a></td>
                </tr>
            </table>
            <footer class="w3-container">
                <h5>Generated in EngWeb2023 ${data}</h5>
            </footer>
        </body>
    </html>
    `
    
    return pagHTML
}

exports.genDespDist = function(pessoas, data){
    var desportos = {}

    for(let i = 0; i < pessoas.length; i++){
        for(let j = 0; j < pessoas[i].desportos.length; j++){
            if(pessoas[i].desportos[j] in desportos){
                desportos[pessoas[i].desportos[j]] += 1
            }else{
                desportos[pessoas[i].desportos[j]] = 1
            }
        }
    }

    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About Desportos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Distribuição por Desportos</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Desporto</th>
                            <th>Quantidade</th>
                        </tr>
    `

    for(var desporto in desportos){
        pagHTML +=`
                <tr>
                    <td>${desporto}</td>
                    <td><a href="/distDesporto/${desporto}">${desportos[desporto]}</a></td>
                </tr>
        `
    } 

    pagHTML += `
                    </table>
                </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div> 
        </body>
    </html>
    `
    return pagHTML
}

exports.genDespList = function(pessoas, desporto, data){
    console.log("Desporto: " + desporto)
    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About ${desporto}</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Pessoas que praticam o desporto: ${desporto}</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Cidade</th>
                        </tr>
    `

    for(let i = 0; i < pessoas.length; i++){
        if(desporto in pessoas[i].desportos){
            pagHTML += `
                        <tr>
                            <td>${pessoas[i].id}</td>
                            <td>
                                <a href="/pessoas/${pessoas[i].id}">${pessoas[i].nome}</a>
                            </td>
                            <td>${pessoas[i].idade}</td>
                            <td>${pessoas[i].sexo}</td>
                            <td>${pessoas[i].morada.cidade}</td>
                        </tr>
            `
        }
    }

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div> 
        </body>
    </html>
    `
    return pagHTML
}

exports.genTop10Pro = function(pessoas, d){
    profissoes = {}
    
    for(let i = 0; i < pessoas.length; i++){
        if(pessoas[i].profissao in profissoes){
            profissoes[pessoas[i].profissao] += 1
        }else{
            profissoes[pessoas[i].profissao] = 1
        }
    }

    // Create items array
    var items = Object.keys(profissoes).map(function(key) {
        return [key, profissoes[key]];
    });
  
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
  
    items = items.slice(0, 10)

    var pagHTML = ` 
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>About Profissões</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Top 10 profissões mais exercidas</h1>
                </header>

                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Profissão</th>
                            <th>Quantidade</th>
                        </tr>
    `

    for(let i = 0; i < items.length; i++){
        pagHTML += `
                    <tr>
                        <td>${items[i][0]}</td>
                        <td><a href="top10Pro/${items[i][0]}">${items[i][1]}</a></td>
                    </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023 ${d}</h5>
                </footer>
            </div> 
        </body>
    </html>
    `
    return pagHTML
}