1. Quantos exames estão registados?
db.exames.count()
2. Quantos exames tiveram um resultado válido?
3. Qual a distribuição dos exames por género?
db.exames.find({género: 'M'}).count()/db.exames.find().count()*100
db.exames.find({género: 'F'}).count()/db.exames.find().count()*100
4. Qual a distribuição dos exames por modalidade?
db.exames.find({modalidade: m})
5. Quantos atletas federados do "GDGoma" fizeram EMD?
db.exames.find({clube: "GDGoma"}).count()
6. Quantos atletas do género feminino que praticam Triatlo fizeram EMD?
db.exames.find({género: "F", modalidade: "Triatlo"}).count()