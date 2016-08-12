/*globals document*/

import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory, NavLink } from 'fluxible-router';
import pages from '../configs/routes';

class Application extends React.Component {
    render() {
        var Handler = this.props.currentRoute.handler;

        return (
            <div>
                <NavLink routeName="_navigate">
                    <img src="/public/images/well.png" />
                </NavLink>
                <Handler />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
}

export default provideContext(handleHistory(connectToStores(
    Application,
    [ApplicationStore],
    function (context, props) {
        var appStore = context.getStore(ApplicationStore);
        return {
            pageTitle: appStore.getPageTitle()
        };
    }
)));
