import paths from '../configs';

import {
    Personal,
    Home,
    ZingChart,
    Radio,
    Following,
    NewMusic,
    Category,
    Top100,
    MV,
    MySong,
    Playlist,
    History,
    Album,
    WeekChart,
    Search,
    Singer,
} from '../pages';

import { AllSearch } from '../components/Search/AllSearch';
import { SongsSearch } from '../components/Search/SongsSearch';
import { SingersSearch } from '../components/Search/SingersSearch';
import { MVsSearch } from '../components/Search/MVsSearch';
import { AlbumsSearch } from '../components/Search/AlbumsSearch';

const publicRoutes = [
    { path: paths.MYMUSIC, component: Personal },
    { path: paths.HOME, component: Home },
    { path: paths.ZINGCHART, component: ZingChart },
    { path: paths.RADIO, component: Radio },
    { path: paths.FOLLOWING, COMPONENT: Following },
    { path: paths.NEW, component: NewMusic },
    { path: paths.HUB, component: Category },
    { path: paths.TOP100, component: Top100 },
    { path: paths.MV, component: MV },
    { path: paths.MYSONG, component: MySong },
    { path: paths.PLAYLIST, component: Playlist },
    { path: paths.HISTORY, component: History },
    { path: paths.ALBUM, component: Album },
    { path: paths.PLAYLISTALBUM, component: Album },
    { path: paths.WEEKCHART, component: WeekChart },
    { path: paths.SINGER, component: Singer },
    { path: paths.SEARCH_ALL, component: Search, subComponent: AllSearch },
    { path: paths.SEARCH_SONGS, component: Search, subComponent: SongsSearch },
    { path: paths.SEARCH_PLAYLIST, component: Search, subComponent: AlbumsSearch },
    { path: paths.SEARCH_ARTIST, component: Search, subComponent: SingersSearch },
    { path: paths.SEARCH_MV, component: Search, subComponent: MVsSearch },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
