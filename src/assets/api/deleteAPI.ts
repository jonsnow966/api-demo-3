const BASE = 'https://fake-data-server-2-production.up.railway.app/users';

export const deleteAPI = async (id:number) => {
    const res = await fetch(`${BASE}/${id}`, {
        method: 'DELETE',
    });
    await res.json();

    await new Promise(resolve => setTimeout(resolve, 1200));

    return {success : true};
}