import * as requester from "../lib/request";

const server = `${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_BACKEND_URL : import.meta.env.VITE_BACKEND_URL}products`;

export const getPaginatedProducts = async (page = 1, limit = 10, sort = "asc", maxPrice = 1000, gender = "", age = "", trending = false, sale = false, sizes = []) => {
    try {
        const sizesParam = sizes.length ? `&sizes=${sizes.join(",")}` : "";
        const res = await requester.get(`${server}?page=${page}&limit=${limit}&sort=${sort}&maxPrice=${maxPrice}&gender=${gender}&age=${age}&trending=${trending}&sale=${sale}${sizesParam}`);

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