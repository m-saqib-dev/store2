interface Credentials{
    email:string,
    password:string
}

const BASE_URL = import.meta.env.VITE_API_URL;

export async function login({email,password}:Credentials) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        }),
    });
    return response.json();
}

export async function logout() {
    const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    return response.json();
}

export async function checkSession() {
    const response = await fetch(`${BASE_URL}/session`, {
        method: 'GET',
        credentials: 'include',
    });
    return response.json();
}
