import actionTypes from '../actions/actionTypes';

const initState = {
    banners: [],
    newRelease: {},
    hArtistTheme: {},
    hAutoTheme1: {},
    hAutoTheme2: {},
    weekChart: [],
    h100: {},
    hXone: {},
    hAlbum: {},
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banners: action.homeApi?.find((item) => item.sectionType === 'banner').items,
                newRelease: action.homeApi?.find((item) => item.sectionType === 'new-release'),
                hArtistTheme: action.homeApi?.find((item) => item.sectionId === 'hArtistTheme'),
                hAutoTheme1: action.homeApi?.find((item) => item.sectionId === 'hAutoTheme1'),
                hAutoTheme2: action.homeApi?.find((item) => item.sectionId === 'hAutoTheme2'),
                weekChart: action.homeApi?.find((item) => item.sectionType === 'weekChart').items,
                h100: action.homeApi?.find((item) => item.sectionId === 'h100'),
                hXone: action.homeApi?.find((item) => item.sectionId === 'hXone'),
                hAlbum: action.homeApi?.find((item) => item.sectionId === 'hAlbum'),
            };

        default:
            return state;
    }
};

export default appReducer;
