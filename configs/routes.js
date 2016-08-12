export default {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        title: 'Home',
        handler: require('../components/Home')
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        title: 'About',
        handler: require('../components/About')
    },
    find: {
        path: '/find',
        method: 'get',
        page: 'find',
        title: 'Find',
        handler: require('../components/Find'),
        action: require('../actions/findBooks')
    },
    _navigate: {
        path: '/navigate',
        method: 'get',
        page: 'navigate',
        title: 'Navigate',
        handler: require('../components/Navigate')
    }
};
