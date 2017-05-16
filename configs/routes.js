export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: require('../components/Home.jsx')
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        title: 'About',
        handler: require('../components/About.jsx')
    },
    find: {
        path: '/find',
        method: 'get',
        page: 'find',
        title: 'Find',
        handler: require('../components/Find.jsx'),
        action: require('../actions/findBooks')
    },
    _navigate: {
        path: '/navigate',
        method: 'get',
        page: 'navigate',
        title: 'Navigate',
        handler: require('../components/Navigate.jsx')
    }
};
