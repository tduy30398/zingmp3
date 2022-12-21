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
} from '../pages';

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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
