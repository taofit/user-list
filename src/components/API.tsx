const API_KEY = '4f0e5132044efa59f6cc32e00f6d4ddadd8c67b5c3655adfb2d0be31ce329a50';
const URL = 'https://api.1337co.de/v3/employees';

export const LoadUsers = async () => {
    try {
        const res = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `api-key 14:2021-12-02:lucas.stenberg@tretton37.com ${API_KEY}`
            }
        });
        return await res.json();
    } catch(err) {
        console.error(err)
        return [];
    }
};