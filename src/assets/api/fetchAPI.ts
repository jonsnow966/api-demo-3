const BASE = 'https://fake-data-server-2-production.up.railway.app/users';

export const fetchAPI = async ()=>{
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const res = await fetch(BASE, {
        method: 'GET'
    });
    
    return res.json();
}