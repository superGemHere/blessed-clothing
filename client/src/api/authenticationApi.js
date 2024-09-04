const server = `${import.meta.env.VITE_SERVER_URL}users`;
import { post } from '../lib/request'; 

export const register = async (email, password, repeatPassword) => {
    try {
        if (password !== repeatPassword) {
            throw new Error("Passwords do not match.");
        }

        const res = await fetch(`${server}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, repeatPassword }),
            credentials: 'include'
        });

        if (!res.ok) {
            const result = await res.json();
            throw result;
        }

        return await res.json();
    } catch (err) {
        throw err;
    }
};

export const login = async (email, password) => {
    try {
        const res = await fetch(`${server}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        if (!res.ok) {
            const result = await res.json();
            throw result;
        }

        return await res.json();
    } catch (err) {
        throw err;
    }
};

export const logout = async () => {
    try {
        const res = await fetch(`${server}/logout`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP error on Logout! status: ${res.status}. Message: ${errorText}`);
        }

        return await res.json();
    } catch (err) {
        throw err;
    }
};

export const getUserInfo = async (setUser) => {
    try {
        let response = await fetch(`${server}/getAccessToken`, {
            method: 'GET',
            credentials: 'include' // Important to send cookies with the request
        });

        if (response.status === 401) { // Access token expired
            const refreshResponse = await fetch(`${server}/refresh-token`, {
                method: 'POST',
                credentials: 'include' // Include cookies in the request
            });

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                response = await fetch(`${server}/getAccessToken`, {
                    method: 'GET',
                    credentials: 'include'
                });
            } else {
                console.error('Error refreshing token:', refreshResponse.statusText);
                return;
            }
        }

        if (response.ok) {
            const data = await response.json();
            setUser({ email: data.email, userId: data.userId });
        } else {
            console.error('Error fetching access token:', response.statusText);
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
};
