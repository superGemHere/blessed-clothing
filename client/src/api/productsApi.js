import * as requester from "../lib/request";

const server = `${import.meta.env.VITE_BACKEND_URL}products`;

export const getPaginatedProducts = async (page = 1, limit = 10) => {
    try {
        const res = await requester.get(`${server}?page=${page}&limit=${limit}`);

        if (!res.ok) {
            const result = await res.json();
            throw result;
        }
        const result = await res.json();
        return result;
    } catch (err) {
        throw err;
    }
};

export const getAllProducts = async () => {
    try {
        const res = await requester.get(server);

        if (!res.ok) {
            const result = await res.json();
            throw result;
        }
        const result = await res.json();
        return result;
    } catch (err) {
        throw err;
    }
}

export const getSingleProduct = async (id) => {
    try {
        const res = await requester.get(`${server}/${id}`);

        if (!res.ok) {
            const result = await res.json();
            throw result;
        }
        const result = await res.json();
        return result;
    } catch (err) {
        throw err;
    }
}