import { DataTypes } from "sequelize";

export async function up(queryInterface) {
   queryInterface.addColumn('Galleries', 'Description', {
    type: DataTypes.TEXT,
    allowNull: true
  });
}

export async function down(queryInterface) {
  queryInterface.removeColumn('Galleries', 'Description');
}
