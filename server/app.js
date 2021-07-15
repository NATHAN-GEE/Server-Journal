require("dotenv").config();
const Express = require("express");
//Import express dependency inot the application

//Top level function allwoing acces to all of our Express methods.
const app = Express();

//ADDING OUR DATABSE TO THE APP THROUGH THE SEQUELIZER
const dbConnection = require("./db");
const controllers = require("./controllers");

app.use(Express.json()); //Must be above all routes
app.use(require("./middleware/validate-jwt"));
app.use("/journal", controllers.journalController); //This is the gate that tells app.js where it lives.
app.use("/user", controllers.userController);
// app.use("/pies", controllers.piecontroller);

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  //.sync() syncs models or schemes to the database
  .then(() => {
    app.listen(3000, () => {
      console.log(`[Server]: App is listening on 3000.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });
