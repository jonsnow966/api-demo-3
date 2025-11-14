const BASE = 'https://fake-data-server-2-production.up.railway.app/users';

interface UserData{
    name: string;
    age: number;
}

export const createAPI = async(user: UserData) => {
    const res = await fetch(BASE,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(user),
    })

    return res.json();
}
