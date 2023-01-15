import { httpRequest } from '../utils';

export const getHomeAPI = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: 'home',
                method: 'get'
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getChartHomeAPI = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: 'charthome',
                method: 'get'
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
