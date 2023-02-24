import json

# c é uma cidade que é um dicionário
def ordCidade(c):
    return c['nome'] # A lista de dicionários (cidades) é ordenada pelo nome

f = open("../../praticas/p1/mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']

cidades.sort(key = ordCidade)

html = """
<!DOCTYPE html>

<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>
            <h1>Mapa Virtual</h1>
            <h2>Índice</h2> 
        </header>
        <div class="indice">
            <ul class="lista">"""

for c in cidades:
    fcidade = open(f"{c['id']}.html", "w")
    html += f"""
                <li>
                    <a href="{c['id']}.html">{c['nome']}</a>
                </li>
    """

    htmlCidade = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header>
            <h1>Cidade: {c['nome']}</h1>
            <a href="index.html">Voltar atrás</a>
        </header>
        <h2>Informações</h2>
        <div class="informacao">
            <dl>
                <dt>Id</dt><dd>{c['id']}</dd>
                <dt>Nome</dt><dd>{c['nome']}</dd>
                <dt>População</dt><dd>{c['população']}</dd>
                <dt>Descrição</dt><dd>{c['descrição']}</dd>
                <dt>Distrito</dt><dd>{c['distrito']}</dd>
            </dl>
        </div>
        <hr/>
        <h2>Ligações</h2>
        <div class="ligacoes">
            <p>Falta implementar isto!</p>
        </div>
    </body>
</html>
    """
    fcidade.write(htmlCidade)
    fcidade.close()

html += """
            </ul>
        </div>
    </body>
</html>
"""

print(html)
f.close()