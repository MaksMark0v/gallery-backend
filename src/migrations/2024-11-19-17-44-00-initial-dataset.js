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
    }, {
        Id: 4,
        FirstName: 'Alice',
        LastName: 'Wonder',
        Email: 'alice.wonder@mail.com',
        IsAdmin: false,
        PasswordHash: 'gfh123kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'xyzq22das=='
    }, {
        Id: 5,
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'john.doe@mail.com',
        IsAdmin: false,
        PasswordHash: 'hyu123kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'uvwq22das=='
    }, {
        Id: 6,
        FirstName: 'Jane',
        LastName: 'Smith',
        Email: 'jane.smith@mail.com',
        IsAdmin: false,
        PasswordHash: 'tyu123kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'abcq22das=='
    }, {
        Id: 7,
        FirstName: 'Chris',
        LastName: 'Evans',
        Email: 'chris.evans@mail.com',
        IsAdmin: false,
        PasswordHash: 'fgj123kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'mnoq22das=='
    }, {
        Id: 8,
        FirstName: 'Emma',
        LastName: 'Stone',
        Email: 'emma.stone@mail.com',
        IsAdmin: false,
        PasswordHash: 'wer123kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'pqrs22das=='
    }, {
        Id: 9,
        FirstName: 'Olivia',
        LastName: 'Brown',
        Email: 'olivia.brown@mail.com',
        IsAdmin: false,
        PasswordHash: 'tyu654kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'hijk22das=='
    }, {
        Id: 10,
        FirstName: 'Liam',
        LastName: 'Davis',
        Email: 'liam.davis@mail.com',
        IsAdmin: false,
        PasswordHash: 'poi876kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'lmno22das=='
    }, {
        Id: 11,
        FirstName: 'Sophia',
        LastName: 'Wilson',
        Email: 'sophia.wilson@mail.com',
        IsAdmin: false,
        PasswordHash: 'zxc987kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'abcd22das=='
    }, {
        Id: 12,
        FirstName: 'James',
        LastName: 'Martin',
        Email: 'james.martin@mail.com',
        IsAdmin: false,
        PasswordHash: 'bgt654kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'efgh22das=='
    }, {
        Id: 13,
        FirstName: 'Lucas',
        LastName: 'Garcia',
        Email: 'lucas.garcia@mail.com',
        IsAdmin: false,
        PasswordHash: 'nmz852kjsalj3qalskdjaHGDDlkjclkjxlkc===',
        PasswordSalt: 'ijkl22das=='
    }]);

    await queryInterface.bulkInsert('Galleries', [{
        UserId: 1,
        Name: 'Brews landscapes'
    }, {
        UserId: 2,
        Name: 'Jesicas nature'
    }, {
        UserId: 2,
        Name: 'Jesicas dogs'
    }, {
        UserId: 4,
        Name: 'Alice adventures'
    }, {
        UserId: 5,
        Name: 'Johns portraits'
    }, {
        UserId: 6,
        Name: 'Jane travels'
    }, {
        UserId: 7,
        Name: 'Chris scenes'
    }, {
        UserId: 8,
        Name: 'Emma art'
    }, {
        UserId: 9,
        Name: 'Olivia nature'
    }, {
        UserId: 10,
        Name: 'Liam adventures'
    }]);

    await queryInterface.bulkInsert('Pictures', [{
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
    }, {
        GalleryId: 4,
        Name: 'Alice in Wonderland',
        URL: 'https://example.com/alice_in_wonderland.jpg',
        Description: 'A journey through wonderland'
    }, {
        GalleryId: 5,
        Name: 'John’s Portrait',
        URL: 'https://example.com/john_portrait.jpg',
        Description: 'A beautiful portrait of John'
    }, {
        GalleryId: 6,
        Name: 'Jane’s Travels',
        URL: 'https://example.com/jane_travel.jpg',
        Description: 'Jane travels the world'
    }, {
        GalleryId: 7,
        Name: 'Chris’s Scene',
        URL: 'https://example.com/chris_scene.jpg',
        Description: 'Chris captures a scene'
    }, {
        GalleryId: 8,
        Name: 'Emma’s Art',
        URL: 'https://example.com/emma_art.jpg',
        Description: 'Emma’s masterpiece'
    }, {
        GalleryId: 9,
        Name: 'Olivia’s Nature',
        URL: 'https://example.com/olivia_nature.jpg',
        Description: 'Beautiful nature captured by Olivia'
    }, {
        GalleryId: 10,
        Name: 'Liam’s Adventure',
        URL: 'https://example.com/liam_adventure.jpg',
        Description: 'Liam’s amazing adventure'
    }]);
}

export async function down() {
    // Ваш код для відкату змін, якщо це необхід
}