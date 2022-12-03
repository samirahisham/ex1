const Sequelize = require("sequelize");
const {DataTypes} = require('sequelize');


const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_TYPE,

    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
    timezone: "+00:00",
    dialectOptions: {
      useUTC: true, //for reading from database
      timezone: "+00:00", //for writing to database     
    },
  }
);

sequelize.addHook("beforeDefine", (attributes, model_info) => {
  attributes.isDeleted = {
    type: new Sequelize.DataTypes.BOOLEAN(),
    defaultValue: false,
  };
  attributes.deletedAt = {
    type: new Sequelize.DataTypes.DATE(),
  };
  attributes.deletedBy = {
    type: DataTypes.STRING,
  };
  attributes.createdBy = {
    type: DataTypes.STRING,
  };
  attributes.modifiedBy = {
    type: DataTypes.STRING,
  };
});

module.exports = sequelize;
