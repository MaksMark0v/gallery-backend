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
