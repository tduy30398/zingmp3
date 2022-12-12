import actionTypes from './actionTypes';

export const setCurrentSongId = (songId) => ({
    type: actionTypes.SET_CURRENT_SONG_ID,
    songId,
});

export const isPlay = (flag) => ({
    type: actionTypes.PLAY,
    flag,
});

export const setAlbumSongs = (albumSongs) => ({
    type: actionTypes.SET_PLAYLIST,
    albumSongs,
});
