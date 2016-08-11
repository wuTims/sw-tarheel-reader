import React from 'react';
import { NavLink } from 'fluxible-router';
import links from '../configs/routes';

class Navigate extends React.Component {
    render() {
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
            <div>
                <ul className='THR-menu'>{linkHTML}</ul>
            </div>
        );
    }
}

export default Navigate;
