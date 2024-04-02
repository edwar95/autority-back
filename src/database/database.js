import { Sequelize } from 'sequelize';
import * as config from '../config/sequelize.js';
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

export const sequelize = new Sequelize('tasks', sequelizeConfig.username, sequelizeConfig.password, {
  host: sequelizeConfig.host,
  dialect: sequelizeConfig.dialect,
});
