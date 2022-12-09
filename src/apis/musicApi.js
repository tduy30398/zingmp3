import httpRequest from '../httpRequest';

export const getSongApi = (songId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: '/song',
                method: 'get',
                params: { id: songId },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getDetailSongApi = (songId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: '/infosong',
                method: 'get',
                params: { id: songId },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
