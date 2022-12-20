import actionTypes from './actionTypes';

export const setCurrentSongId = (songId) => ({
    type: actionTypes.SET_CURRENT_SONG_ID,
    songId,
});

export const setPlaylistId = (playlistId) => ({
    type: actionTypes.SET_PLAYLIST_ID,
    playlistId,
});

export const setCurrentSongDetail = (detailSong) => ({
    type: actionTypes.SET_CURRENT_SONG_DETAIL,
    detailSong,
});

export const setIsPlaying = (flag) => ({
    type: actionTypes.IS_PLAYING,
    flag,
});

export const setIsLoading = (flag) => ({
    type: actionTypes.IS_LOADING,
    flag,
});

export const setAlbumSongs = (albumSongs) => ({
    type: actionTypes.SET_PLAYLIST,
    albumSongs,
});
