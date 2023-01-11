import actionTypes from '../actions/actionTypes';

const initState = {
    banners: [],
    newRelease: {},
    hArtistTheme: {},
    hAutoTheme1: {},
    hAutoTheme2: {},
    chart: {},
    rank: [],
    weekChart: [],
    h100: {},
    hXone: {},
    hAlbum: {},
    top100_1: null,
    top100_2: null,
    top100_3: null,
    top100_4: null,
    top100_5: null,
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banners: action.homeAPI?.find((item) => item.sectionType === 'banner').items,
                newRelease: action.homeAPI?.find((item) => item.sectionType === 'new-release'),
                hArtistTheme: action.homeAPI?.find((item) => item.sectionId === 'hArtistTheme'),
                hAutoTheme1: action.homeAPI?.find((item) => item.sectionId === 'hAutoTheme1'),
                hAutoTheme2: action.homeAPI?.find((item) => item.sectionId === 'hAutoTheme2'),
                chart: action.homeAPI?.find((item) => item.sectionId === 'hZC').chart,
                rank: action.homeAPI?.find((item) => item.sectionId === 'hZC').items,
                weekChart: action.homeAPI?.find((item) => item.sectionType === 'weekChart').items,
                h100: action.homeAPI?.find((item) => item.sectionId === 'h100'),
                hXone: action.homeAPI?.find((item) => item.sectionId === 'hXone'),
                hAlbum: action.homeAPI?.find((item) => item.sectionId === 'hAlbum'),
            };
        case actionTypes.SET_TOP_100:
            return {
                ...state,
                top100_1: action.top100API?.find((item) => item.title === 'Nổi bật'),
                top100_2: action.top100API?.find((item) => item.title === 'Nhạc Việt Nam'),
                top100_3: action.top100API?.find((item) => item.title === 'Nhạc Châu Á'),
                top100_4: action.top100API?.find((item) => item.title === 'Nhạc Âu Mỹ'),
                top100_5: action.top100API?.find((item) => item.title === 'Nhạc Hòa Tấu'),
            };

        default:
            return state;
    }
};

export default appReducer;
