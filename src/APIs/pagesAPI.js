import { httpRequest } from '../utils';

export const getHomeAPI = async () => {
    try {
        const response = await httpRequest({
            url: 'home',
            method: 'get'
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getChartHomeAPI = async () => {
    try {
        const response = await httpRequest({
            url: 'charthome',
            method: 'get'
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getTop100API = async () => {
    try {
        const response = await httpRequest({
            url: 'top100',
            method: 'get'
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getNewReleaseAPI = async () => {
    try {
        const response = await httpRequest({
            url: 'newreleasechart',
            method: 'get'
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
