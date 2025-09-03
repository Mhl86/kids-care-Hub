import sequelize from "../db/dbConnection.js";
import { DataTypes } from "sequelize";

const Children = sequelize.define("Children", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  Parent_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Caregiver_Id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Children;
