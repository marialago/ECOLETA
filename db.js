//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//criar um objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

//utilixar o banco de dados para nossas operações
//importar do git hub se precisar
//  db.serialize(() => {
//});
