import json

# c é uma cidade que é um dicionário
def ordCidade(c):
    return c['nome'] # A lista de dicionários (cidades) é ordenada pelo nome


f = open("../../praticas/p1/mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
idsCidades = {}
ligacoes = mapa['ligações']
dist = set()

cidades.sort(key = ordCidade)

# -> Ordenar os Distritos por ordem alfabeticas
for c in cidades:
    idsCidades[c['id']] = c['nome']
    dist.add(c['distrito'])

distritos = list(dist)
distritos.sort()
# .

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

for d in distritos:
    html += f"""
                <li>
                    {d}
                    <ul>
    """

    for c in cidades:
        if c['distrito'] == d:
            fcidade = open(f"{c['id']}.html", "w")
            html += f"""
                <li>
                    <a href="{c['id']}">{c['nome']}</a>
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
            <a href="../">Voltar atrás</a>
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
            <ul>"""
                
            for l in ligacoes:
                if l['origem'] == c['id'] or l['destino'] == c['id']:
                    htmlCidade += f"""
                <li>
                    <dl>
                        <dt>Id</dt><dd>{l['id']}</dd>
                        <dt>Origem</dt><dd><a href={l['origem']}>{idsCidades[l['origem']]}</a></dd>
                        <dt>Destino</dt><dd><a href={l['destino']}>{idsCidades[l['destino']]}</a></dd>
                        <dt>Distância</dt><dd>{l['distância']}</dd>
                    </dl>
                </li>
            """

            htmlCidade += f"""
            </ul>
        </div>
    </body>
</html>
    """
            fcidade.write(htmlCidade)
            fcidade.close()

    html += f"""
                </ul>
            </li>
    """


html += """
            </ul>
        </div>
    </body>
</html>
"""

print(html)
f.close()