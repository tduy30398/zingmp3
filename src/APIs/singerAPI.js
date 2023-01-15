import { httpRequest } from '../utils';

export const getSingerAPI = (name) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: 'artist',
                method: 'get',
                params: { name }
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
