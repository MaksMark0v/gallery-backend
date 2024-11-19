export async function up(queryInterface) {
    await queryInterface.bulkInsert('Users', [{
        Id: 1,
        FirstName: 'Robert',
        Middlename: 'Brew',
        LastName: 'Smooth',
        Email: 'robert.brew-smooth@mail.com',
        IsAdmin: true,
        PasswordHash: 'cl12313kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'xasq22das=='
      }, {
        Id: 2,
        FirstName: 'Jesica',
        LastName: 'Smooth',
        Email: 'jesica.brew-smooth@mail.com',
        IsAdmin: false,
        PasswordHash: 'cl12313kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'xasq22das=='
      }, {
        Id: 3,
        FirstName: 'Mike',
        Middlename: 'Lionel',
        LastName: 'Kavinski',
        Email: 'mike.kv@email.com',
        IsAdmin: false,
        PasswordHash: 'cl12313kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'xasq22das=='
      }]);

      queryInterface.bulkInsert('Galleries', [{
        UserId: 1,
        Name: 'Brews landscapes'
      }, {
        UserId: 2,
        Name: 'Jesicas nature'
      }, {
        UserId: 2,
        Name: 'Jesicas dogs'
      }]);

      queryInterface.bulkInsert('Pictures', [{
        GalleryId: 1,
        Name: 'Great view',
        URL: 'https://cdn.prod.website-files.com/63a02e61e7ffb565c30bcfc7/65ea95887efa5c72ece1abb0_most%20beautiful%20landscapes%20in%20the%20world-p-2000.webp',
        Description: 'Nice'
      }, {
        GalleryId: 1,
        Name: 'Beautiful view',
        URL: 'https://cdn.prod.website-files.com/63a02e61e7ffb565c30bcfc7/65ea95df29209bcb54b1e750_most%20beautiful%20landscapes%20in%20the%20world.webp',
        Description: 'Cool'
      }, {
        GalleryId: 2,
        Name: 'Mountians sunrise',
        URL: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70',
        Description: 'Adorable nature view'
      }, {
        GalleryId: 3,
        Name: 'Bob',
        URL: 'https://images.theconversation.com/files/625049/original/file-20241010-15-95v3ha.jpg?ixlib=rb-4.1.0&rect=4%2C12%2C2679%2C1521&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip',
        Description: 'Running somewhere'
      }, {
        GalleryId: 3,
        Name: 'Patron',
        URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkfPRjRFbi4N4RNBF2ij6MIyJAhcokyjNw1A&s',
        Description: 'Shocked buddy'
      }]);

}

export async function down() {

}