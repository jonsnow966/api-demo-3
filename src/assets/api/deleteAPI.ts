const BASE = 'https://fake-data-server-2-production.up.railway.app/users';

export const deleteAPI = async (id:number) => {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'DELETE',
    });

    return res.json();
}