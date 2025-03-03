import { DataTypes } from "sequelize";

export async function up(queryInterface) {
    queryInterface.addColumn('Users', 'AvatarUrl', {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'URL to user avatar image'
    });
}
export async function down(queryInterface) {
    queryInterface.removeColumn('Users', 'AvatarUrl');
}
