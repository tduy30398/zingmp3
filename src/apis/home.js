import httpRequest from '../httpRequest';

export const getHome = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: '/home',
                method: 'get',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
