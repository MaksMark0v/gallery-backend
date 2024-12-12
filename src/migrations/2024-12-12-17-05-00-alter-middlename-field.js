export async function up(queryInterface) {
    await queryInterface.renameColumn('Users', 'Middlename', 'MiddleName');
}

export async function down(queryInterface) {
    await queryInterface.renameColumn('Users', 'MiddleName', 'Middlename');
}