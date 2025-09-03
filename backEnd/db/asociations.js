import Caregiver from "../models/Caregiver.js";
import Children from "../models/Childrens.js"; // make sure file name is correct
import Parent from "../models/Parent.js";
import Note from "../models/Notes.js"; // singular
import Activity from "../models/Activity.js"; // import Activity
import sequelize from "./dbConnection.js";

// Caregiver <-> Children
Caregiver.hasMany(Children, { foreignKey: "Caregiver_Id" });
Children.belongsTo(Caregiver, { foreignKey: "Caregiver_Id" });

// Parent <-> Children
Parent.hasMany(Children, { foreignKey: "Parent_Id" });
Children.belongsTo(Parent, { foreignKey: "Parent_Id" });

// Children <-> Notes
Children.hasMany(Note, { foreignKey: "childId", as: "Notes" });
Note.belongsTo(Children, { foreignKey: "childId" });

// Children <-> Activities
Children.hasMany(Activity, { foreignKey: "childId", as: "Activities" });
Activity.belongsTo(Children, { foreignKey: "childId" });

// Sync database
sequelize
  .sync({ alter: true }) // alter:true updates tables without dropping
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Sync error:", err));
