
export async function up(queryInterface) {
    queryInterface.addConstraint('Users', {
        fields: ['Email'],
        type: 'unique',
        name: 'UserEmailUniqueConstraint'
    });
    queryInterface.addConstraint('Galleries', {
        fields: ['UserId'],
        type: 'foreign key',
        name: 'GalleryToUserForeignConstraint',
        references: {
            table: 'Users',
            field: 'Id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    queryInterface.addConstraint('Pictures', {
        fields: ['GalleryId'],
        type: 'foreign key',
        name: 'PictureToGalleryForeignConstraint',
        references: {
            table: 'Galleries',
            field: 'Id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
}
export async function down(queryInterface) {
    queryInterface.removeConstraint('Users', 'UserEmailUniqueConstraint');
    queryInterface.removeConstraint('Galleries', 'GalleryToUserConstraint');
    queryInterface.removeConstraint('Pictures', 'PictureToGalleryForeignConstraint');
}