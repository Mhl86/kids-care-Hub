import sequelize from "../db/dbConnection.js";
import { DataTypes } from "sequelize";

const Activity = sequelize.define("Activity", {
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorType: {
    type: DataTypes.STRING,
    allowNull: false, // "Caregiver" or "Parent"
  },
  childId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
export default Activity;
