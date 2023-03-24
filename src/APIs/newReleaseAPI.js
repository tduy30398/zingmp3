import { httpRequest } from '../utils';

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
