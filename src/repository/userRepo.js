import { readFile } from 'fs/promises';

export async function getUsersData(query) {
  const data = JSON.parse(await readFile('./resourses/db.json', 'utf8'));
  const users = data.result.map((user) => {
    return {
      FirstName: user.name.first,
      MiddleNameL: user.name.middle,
      LastName: user.name.last,
      UserName: user.username,
      Status: user.status
    };
  });

  let paginatedUsers = users;
  if (query.page && query.size) {
    const lastIndex = query.page * query.size;
    const firstIndex = lastIndex - query.size;
    paginatedUsers = users.slice(firstIndex, lastIndex);
  }

  if (query.filter && query.filter.Status) {
    paginatedUsers = paginatedUsers.filter(
      (user) => user.Status === query.filter.Status
    );
  }

  return {
    Data: paginatedUsers,
    Count: users.length,
    CountPages: Math.ceil(users.length / query.size || 1)
  };
}

export async function getUserDetails(userId) {
  const data = JSON.parse(await readFile('./resourses/db.json', 'utf8'));
  const userDetails = data.result.find(item => item.id === +userId);
  if (!userDetails) {
    return { message: 'User not found'}
  }

  return {
    Id: userDetails.id,
    FirstName: userDetails.name.first,
    MiddleNameL: userDetails.name.middle,
    LastName: userDetails.name.last,
    UserName: userDetails.username,
    Status: userDetails.status,
    PhoneNumber: userDetails.phoneNumber,
    Emails: userDetails.emails.join(', '),
    Location: Object.entries(userDetails.location).map(([,value]) => value).join(', ')
  };
}
