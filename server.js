const express = require("express");
const server = express();

//pegar banco de dados
const db = require("./database/db");
//configurar pasta publica
server.use(express.static("public"));
//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});
//configurar caminhos da aplicação/ pag inicial
// req: requisição,pedido / res: resposta
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um titulo" });
});
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
  //console.log(req.query);
});

server.post("/savepoint", (req, res) => {
  //req.body: corpo do forms
  // console.log(req.body)

  // inserir dados no banco de dados
  const query = `
   INSERT INTO places(
       image,
       name,
       address,
       address2,
       state,
       city,
      items
) VALUES (?,?,?,?,?,?,?);
`;
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }

    console.log("Cadastrado com sucesso");
    console.log(this);

    return res.render("create-point.html", { saved: true });
  }
  db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
  const search = req.query.search;
  if ((search = "")) {
    // pesquisa vazia
    return res.render("search-results.html"), { total: 0 };
  }

  // pegar dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE = '%${search}%'`, function (
    err,
    rows
  ) {
    if (err) {
      return console.log(err);
    }
    console.log(rows);

    const total = rows.length;
    //mostrar as pag do html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total });
  });
});

//ligar servidor
server.listen(3000);
