import actionTypes from './actionTypes';

export const setCurrentSongId = (songId) => ({
    type: actionTypes.SET_CURRENT_SONG_ID,
    songId
});

export const setPlaylistId = (playlistId) => ({
    type: actionTypes.SET_PLAYLIST_ID,
    playlistId
});

export const setCurrentSongDetail = (detailSong) => ({
    type: actionTypes.SET_CURRENT_SONG_DETAIL,
    detailSong
});

export const setIsPlaying = (flag) => ({
    type: actionTypes.IS_PLAYING,
    flag
});

export const setIsLoading = (flag) => ({
    type: actionTypes.IS_LOADING,
    flag
});

export const setIsTyping = (flag) => ({
    type: actionTypes.IS_TYPING,
    flag
});

export const setIsSearching = (flag) => ({
    type: actionTypes.IS_SEARCHING,
    flag
});

export const setAlbumSongs = (albumSongs) => ({
    type: actionTypes.SET_PLAYLIST,
    albumSongs
});

export const setRecentSongsList = (songInfo) => ({
    type: actionTypes.SET_RECENT_SONGS_LIST,
    songInfo
});

export const setSearchResult = (searchResult) => ({
    type: actionTypes.SET_SEARCH_RESULT,
    searchResult
});

export const setSearchText = (searchText) => ({
    type: actionTypes.SET_SEARCH_TEXT,
    searchText
});

export const setSearchParams = (searchParams) => ({
    type: actionTypes.SET_SEARCH_PARAMS,
    searchParams
});
