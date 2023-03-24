import actionTypes from './actionTypes';
import { getHomeAPI, getChartHomeAPI, getNewReleaseAPI, getTop100API } from '../../APIs';

export const getHome = () => async (dispatch) => {
    try {
        const response = await getHomeAPI();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                homeAPI: response.data.data.items
            });
        } else {
            dispatch({
                type: actionTypes.GET_HOME,
                homeAPI: null
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_HOME,
            homeAPI: null
        });
    }
};

export const getTop100 = () => async (dispatch) => {
    try {
        const response = await getTop100API();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TOP_100,
                top100API: response.data.data
            });
        } else {
            dispatch({
                type: actionTypes.GET_TOP_100,
                top100API: null
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOP_100,
            top100API: null
        });
    }
};

export const getChartPage = () => async (dispatch) => {
    try {
        const response = await getChartHomeAPI();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CHART_PAGE,
                chartPageAPI: response.data.data
            });
        } else {
            dispatch({
                type: actionTypes.GET_CHART_PAGE,
                chartPageAPI: null
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CHART_PAGE,
            chartPageAPI: null
        });
    }
};

export const getNewRelease = () => async (dispatch) => {
    try {
        const response = await getNewReleaseAPI();

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_RELEASE,
                newReleaseAPI: response.data.data
            });
        } else {
            dispatch({
                type: actionTypes.GET_NEW_RELEASE,
                newReleaseAPI: null
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_RELEASE,
            newReleaseAPI: null
        });
    }
};
