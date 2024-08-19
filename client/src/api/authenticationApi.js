const server = `${import.meta.env.VITE_SERVER_URL}users`;
import { post } from '../lib/request'; 

export const register = async (email, password, repeatPassword) => {
    try {
        // Check if passwords match
        if (password !== repeatPassword) {
            throw new Error("Passwords do not match");
        }

        // Perform the fetch request
        const res = await fetch(`${server}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        // Check if the response is ok
        if (!res.ok) {
            // Read the response text for debugging
            const errorText = await res.text();
            throw new Error(`HTTP error! status: ${res.status}. Message: ${errorText}`);
        }

        // Parse and return the result
        const result = await res.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error("Registration error:", err);
        throw err.message;
    }
};
