const BASE = 'https://fake-data-server-2-production.up.railway.app/users';

interface UserData{
    id: number,
    name: string,
    age: number,
}

export const updateAPI = async (user: UserData) =>{
    const res = await fetch(`${BASE}/${user.id}`,{
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({name:user.name, age:user.age}),
    });

    return res.json();
}