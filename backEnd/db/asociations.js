import Caregiver from "../models/Caregiver.js";
import Children from "../models/Childrens.js";
import Parent from "../models/Parents.js";
import sequelize from "./dbConnection.js";

Caregiver.hasMany(Children, { foreignKey: "Caregiver_Id" });
Children.belongsTo(Caregiver, { foreignKey: "Caregiver_Id" });

Parent.hasMany(Children, { foreignKey: "Parent_Id" });
Children.belongsTo(Parent, { foreignKey: "Parent_Id" });

sequelize.sync();
