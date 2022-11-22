import routes from '../config';

import { Personal, Home, ZingChart, Radio, Following } from '../pages';

const publicRoutes = [
    { path: routes.mymusic, component: Personal },
    { path: routes.home, component: Home },
    { path: routes.zingchart, component: ZingChart },
    { path: routes.radio, component: Radio },
    { path: routes.following, component: Following },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
