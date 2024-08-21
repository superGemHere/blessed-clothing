const server = `${import.meta.env.VITE_SERVER_URL}users`;
import { post } from '../lib/request'; 

export const register = async (email, password, repeatPassword) => {
    try {
        // Check if passwords match
        if (password !== repeatPassword) {
            throw new Error("Passwords do not match.");
        }

        // Perform the fetch request
        const res = await fetch(`${server}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, repeatPassword }),
            credentials: 'include'
        });

        const result = await res.json();

        // Check if the response is ok
        if (!res.ok) {
            throw result;
        }

        return result;
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
            const errorText = await res.text();
            throw new Error(`HTTP error on Login! status: ${res.status}. Message: ${errorText}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Login error:", err);
        throw err.message;
    }
};

export const logout = async () => {
    try{

        const res =  await fetch(`${server}/logout`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`HTTP error on Login! status: ${res.status}. Message: ${errorText}`);
        }

        const data = await res.json();
        return data;
    }catch(err){
        throw err;
    }
}


export const getUserInfo = (setUser) => fetch(`${server}/getAccessToken`, {
    method: 'GET',
    credentials: 'include' // Important to send cookies with the request
  })
    .then(response => response.json())
    .then(data => {
      if (data.accessToken) {
        // Set user info instead of accessToken directly
        setUser({ email: data.email, userId: data.userId });
        console.log('Access Token:', data.accessToken);
      }
    })
    .catch((err) => console.error('Error fetching access token:', err.message));
