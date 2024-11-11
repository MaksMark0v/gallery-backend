import Sequelize, { Model } from 'sequelize';

import db from '../lib/db.js';


class Migration extends Model {
}

const model = Migration.init({
    Name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    AppliedAt: {
         type: Sequelize.DATE
         }
  }, {
    sequelize: db,
    tableName: '_migrations'
  });

  export default model;
