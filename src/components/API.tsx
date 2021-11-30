const API_KEY = '2263e960ba18fed77ff3467b1f5d9afa59c23bd4da3d46da8b22f678216c5e3c';
const URL = 'https://api.1337co.de/v3/employees';

export const LoadUsers = async () => {
    try {
        const res = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `api-key 14:2021-11-18:lucas.stenberg@tretton37.com ${API_KEY}`
            }
        });
        return await res.json();
    } catch(err) {
        console.error(err)
        return [];
    }
};