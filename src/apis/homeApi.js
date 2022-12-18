import httpRequest from '../httpRequest';

export const getHomeApi = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: 'home',
                method: 'get',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
