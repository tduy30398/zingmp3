import actionTypes from '../actions/actionTypes';

const initState = {
    banners: [],
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banners: action.homeData?.find((item) => item.sectionType === 'banner').items,
            };

        default:
            return state;
    }
};

export default appReducer;
