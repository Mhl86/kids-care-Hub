import sequelize from "../db/dbConnection.js";
import { DataTypes } from "sequelize";
import Children from "./Childrens.js";
import Parent from "./Parent.js";
import Caregiver from "./Caregiver.js";

const Notes = sequelize.define("Notes", {
  content: { type: DataTypes.TEXT, allowNull: false },
  childId: { type: DataTypes.INTEGER, allowNull: false },
  authorType: { type: DataTypes.ENUM("parent", "caregiver"), allowNull: false },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
});

export default Notes;
