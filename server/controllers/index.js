
//LETS US ACCES ALL THE CONTROLLERS IN OUR APP FILE. 
//SO WE DONT HAVE TO LIST EACH ONE OUT.


module.exports = {
  journalController: require("../controllers/journalcontroller"),
  userController: require("../controllers/usercontroller"),
  piecontroller: require('../controllers/piecontroller'),
};
