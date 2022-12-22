import httpRequest from '../httpRequest';

export const getSongAPI = (songId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: 'song',
                method: 'get',
                params: { id: songId },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getDetailSongAPI = (songId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: 'infosong',
                method: 'get',
                params: { id: songId },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const getDetailPlaylistAPI = (playlistId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: 'detailplaylist',
                method: 'get',
                params: { id: playlistId },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const searchAPI = (keyword) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await httpRequest({
                url: 'search',
                method: 'get',
                params: { keyword },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
