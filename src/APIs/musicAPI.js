import { httpRequest } from '../utils';

export const getSongAPI = async (songId) => {
    try {
        const response = await httpRequest({
            url: 'song',
            method: 'get',
            params: { id: songId }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getDetailSongAPI = async (songId) => {
    try {
        const response = await httpRequest({
            url: 'infosong',
            method: 'get',
            params: { id: songId }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getDetailPlaylistAPI = async (playlistId) => {
    try {
        const response = await httpRequest({
            url: 'detailplaylist',
            method: 'get',
            params: { id: playlistId }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const searchAPI = async (keyword) => {
    try {
        const response = await httpRequest({
            url: 'search',
            method: 'get',
            params: { keyword }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
