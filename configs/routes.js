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
    navigate: {
        path: '/navigate',
        method: 'get',
        page: 'navigate',
        title: 'Navigate',
        handler: require('../components/Navigate')
    }
}; 
