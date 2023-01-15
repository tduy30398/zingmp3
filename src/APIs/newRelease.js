import { httpRequest } from '../utils';

export const getNewReleaseAPI = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: 'newreleasechart',
                method: 'get'
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
