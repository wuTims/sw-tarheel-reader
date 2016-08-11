import React from 'react';
import { NavLink } from 'fluxible-router';

class Nav extends React.Component {

    render() {
        const links = this.props.links;

        const linkHTML = Object.keys(links)
            .filter((name) => { return name != 'navigate'})
            .map((name) => {
                var link = links[name];
                return (
                    <li key={link.path}>
                        <NavLink routeName={link.page} replaceState={true}>
                            {link.title}
                        </NavLink>
                    </li>
                );
            });

        return (
                <ul className='THR-menu'>{linkHTML}</ul>
        );
    }
}

Nav.defaultProps = {
    selected: null,
    links: {}
};

export default Nav;
