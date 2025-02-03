import { DataTypes } from "sequelize";

export async function up(queryInterface) {
  console.log(1, 'Add column Description to Galleries');
   queryInterface.addColumn('Galleries', 'Description', {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Gallery description'
  });
}

export async function down(queryInterface) {
  queryInterface.removeColumn('Galleries', 'Description');
}
