// const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// };

const buildOptions = (data) => {
    const options = {
            credentials: 'include',
    };

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json',
        };
    }

    // const token = getCookie('accessToken'); // Change here to get token from cookies

    // if (token){
    //     options.headers = {
    //         ...options.headers,
    //         'X-Authorization': token,
    //     };
    // }

    return options;
};

const request = async (method, url, data) => {
    const response = await fetch(url, {
        ...buildOptions(data),
        method,
    });

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        console.log('Error on request:', result)
        throw result;
    }

    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');
