import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.NEON_URI, {
  dialect: "postgres",
  logging: false,
});

export default sequelize;
