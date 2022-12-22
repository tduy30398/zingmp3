import actionTypes from './actionTypes';
import { getHomeAPI } from '../../APIs';

export const getHome = () => async (dispatch) => {
    try {
        const response = await getHomeAPI();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                homeAPI: response.data.data.items,
            });
        } else {
            dispatch({
                type: actionTypes.GET_HOME,
                homeAPI: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_HOME,
            homeAPI: null,
        });
    }
};
