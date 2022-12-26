import actionTypes from '../actions/actionTypes';

const initState = {
    recentSongsList: [],
    searchResult: {},
    searchText: '',
    currentSongDetail: null,
    currentSongId: null,
    playlistId: null,
    isPlaying: false,
    isLoading: false,
    isTyping: false,
    isSearching: false,
    albumSongs: null,
};

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG_ID:
            return {
                ...state,
                currentSongId: action.songId,
            };
        case actionTypes.SET_PLAYLIST_ID:
            return {
                ...state,
                playlistId: action.playlistId,
            };
        case actionTypes.SET_CURRENT_SONG_DETAIL:
            return {
                ...state,
                currentSongDetail: action.detailSong,
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
        case actionTypes.IS_TYPING:
            return {
                ...state,
                isTyping: action.flag,
            };
        case actionTypes.IS_SEARCHING:
            return {
                ...state,
                isSearching: action.flag,
            };
        case actionTypes.SET_PLAYLIST:
            return {
                ...state,
                albumSongs: action.albumSongs,
            };
        case actionTypes.SET_RECENT_SONGS_LIST:
            let currentSongsList;
            // Trước khi push bài hát mới nhất vào list, kiểm tra độ dài của list
            // có bằng 15 bài hay ko, nếu là 15 bài thì xóa bài cuối cùng, sau đó
            // push vào như bình thường
            if (action.songInfo) {
                if (state.recentSongsList.length === 15) {
                    state.recentSongsList.pop();
                    currentSongsList = state.recentSongsList;
                }
                currentSongsList = [
                    action.songInfo,
                    ...state.recentSongsList.filter(
                        (song) => song.encodeId !== action.songInfo.encodeId,
                    ),
                ];
            }
            return {
                ...state,
                recentSongsList: currentSongsList,
            };
        case actionTypes.SET_SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.searchResult,
            };
        case actionTypes.SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.searchText,
            };

        default:
            return state;
    }
};

export default musicReducer;
