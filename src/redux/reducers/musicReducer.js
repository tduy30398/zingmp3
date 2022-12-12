import actionTypes from '../actions/actionTypes';

const initState = {
    currentSongId: null,
    isPlaying: false,
    albumSongs: null,
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG_ID:
            return {
                ...state,
                currentSongId: action.songId,
            };
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag,
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
