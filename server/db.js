//SEQUELIZER SPEAKS BY ORM TO THE DATABASE WHICH IS IN SQL WITHOUT YOU HAVING TO TYPE IN SQL

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  //DBPROGRAM://USER:PASSWORD@HOST:PORT/DATABASENAME
  "postgres://postgres:Nathangee23!!!@localhost:5432/eleven-journal"
); //URI connection
module.exports = sequelize;
