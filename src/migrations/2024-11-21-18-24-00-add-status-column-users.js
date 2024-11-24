
import { DataTypes } from "sequelize";
export async function up(queryInterface) {
    queryInterface.addColumn('Users', 'Status', {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'User status, for example active, paused, disabled, banned etc'
    });
}
export async function down(queryInterface) {
    queryInterface.removeColumn('Users', 'Status');
}