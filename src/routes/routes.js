import routes from '../configs';

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
} from '../pages';

import { AllSearch } from '../components/Search/AllSearch';
import { SongsSearch } from '../components/Search/SongsSearch';

const publicRoutes = [
    { path: routes.mymusic, component: Personal },
    { path: routes.home, component: Home },
    { path: routes.zingchart, component: ZingChart },
    { path: routes.radio, component: Radio },
    { path: routes.following, component: Following },
    { path: routes.new, component: NewMusic },
    { path: routes.hub, component: Category },
    { path: routes.top100, component: Top100 },
    { path: routes.mv, component: MV },
    { path: routes.mysong, component: MySong },
    { path: routes.playlist, component: Playlist },
    { path: routes.history, component: History },
    { path: routes.album, component: Album },
    { path: routes.playlistAlbum, component: Album },
    { path: routes.weekchart, component: WeekChart },
    { path: routes.search_all, component: Search, subComponent: AllSearch },
    { path: routes.search_songs, component: Search, subComponent: SongsSearch },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
