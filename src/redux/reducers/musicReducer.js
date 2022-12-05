import actionTypes from '../actions/actionTypes';

const initState = {
    currentSongId: null,
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG_ID:
            return {
                ...state,
                currentSongId: action.songId,
            };

        default:
            return state;
    }
};

export default musicReducer;
