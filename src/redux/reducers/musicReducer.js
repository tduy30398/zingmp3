import actionTypes from '../actions/actionTypes';

const initState = {
    currentSongId: null,
    isPlaying: false,
    albumSongs: null,
    isLoading: false,
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG_ID:
            return {
                ...state,
                currentSongId: action.songId,
            };
        case actionTypes.IS_PLAYING:
            return {
                ...state,
                isPlaying: action.flag,
            };
        case actionTypes.IS_LOADING:
            return {
                ...state,
                isLoading: action.flag,
            };
        case actionTypes.SET_PLAYLIST:
            return {
                ...state,
                albumSongs: action.albumSongs || null,
            };

        default:
            return state;
    }
};

export default musicReducer;
