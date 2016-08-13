import Fluxible from 'fluxible';
import Application from './components/Application';
import ApplicationStore from './stores/ApplicationStore';
import RouteStore from './stores/RouteStore';
import BookStore from './stores/BookStore';

import fetchr from 'fluxible-plugin-fetchr';
var fetchrInstance = fetchr({
    xhrPath: '/api'
});

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

app.plug(fetchrInstance);

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(BookStore);

module.exports = app;
