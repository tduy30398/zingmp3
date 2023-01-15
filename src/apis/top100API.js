import { httpRequest } from '../utils';

export const getTop100API = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: 'top100',
                method: 'get'
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
