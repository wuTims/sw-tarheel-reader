import React from 'react';
import { NavLink, navigateAction } from 'fluxible-router';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';

if (process.env.BROWSER) {
    require('../css/menuStyle.scss');
}

class Nav extends React.Component {

    render() {
        const selected = this.props.currentRoute;
        const links = this.props.links;

        const linkHTML = Object.keys(links).map((name, i) => {
            var link = links[name];
            console.log('i', i);
            return (
                <MenuItem 
                    className='AriaMenuButton-menuItem'
                    tag='li'
                    value={link.path}
                    key={i}>
                {link.title}
                </MenuItem>
            );
        });

        var cb = this.handleSelection.bind(this);
        return (
            <Wrapper className='AriaMenuButton' onSelection={cb}>
                <Button className='AriaMenuButton-trigger'>
                    <img src="/public/images/well.png" />
                </Button>
                <Menu>
                    <ul className='AriaMenuButton-menu'>{linkHTML}</ul>
                </Menu>
            </Wrapper>
        );
    }

    handleSelection(value, event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('select', value, event);
        this.context.executeAction(navigateAction, {
            method: 'GET',
            url: value });
        console.log('after');
    }
}

Nav.contextTypes = {
    getStore:      React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
};

Nav.defaultProps = {
    selected: null,
    links: {}
};

export default Nav;
