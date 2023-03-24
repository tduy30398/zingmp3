import { httpRequest } from '../utils';

export const getSingerAPI = async (name) => {
    try {
        const response = await httpRequest({
            url: 'artist',
            method: 'get',
            params: { name }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
