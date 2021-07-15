const { DataTypes } = require("sequelize");
const db = require("../db");

const Journal = db.define("journal", {
  title: {
    type: DataTypes.STRING,
    allownull: false,
  },
  date: {
      type: DataTypes.STRING,
      allownull:false
  },
  entry: {
    type: DataTypes.STRING,
    allownull: false,
    },
    owner: {
      type: DataTypes.INTEGER
  }
});

module.exports = Journal;
