export async function  getUserData() {
    const data = await fetch('./resourses/db.json');
    console.log(data.json());
}