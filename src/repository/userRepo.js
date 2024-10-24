import { readFile, writeFile } from 'fs/promises';

export async function getUsersData({ page, size, filter }) {
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

  let filterdUser = users;
  if (filter && filter.Status) {
    filterdUser = filterdUser.filter(
      (user) => user.Status === filter.Status
    );
  }

  let paginatedUsers = filterdUser;
  if (page && size) {
    const lastIndex = page * size;
    const firstIndex = lastIndex - size;
    paginatedUsers = paginatedUsers.slice(firstIndex, lastIndex);
  }

  return {
    Data: paginatedUsers,
    Count: filterdUser.length,
    CountPages: Math.ceil(filterdUser.length / size || 1)
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
    Location: Object.entries(userDetails.location)
    .map(([,value]) => typeof value === 'object' ? Object.values(value).flat() : value)
    .join(', ')
  };
}

export async function saveUser(userData, userId) {
  const dataBase = JSON.parse(await readFile('./resourses/db.json', 'utf8'));
  let userObject = {};
  if (userId) {
    const existedUserDataIndex = dataBase.result.findIndex(item => item.id === +userId);
    if (!existedUserDataIndex) {
      throw new Error('User not found');
    }
    dataBase.result[existedUserDataIndex] = userData;
    userObject.id = userId;
  } else {
    const highestId = dataBase.result.slice(-1).pop().id;
    const newUserData = userData;
    newUserData.id = highestId + 1;
    userObject = newUserData;
    dataBase.result.push(userObject);
  }

  await writeFile('./resourses/db.json', JSON.stringify(dataBase));
  return userObject.id;
}
