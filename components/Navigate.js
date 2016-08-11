import React from 'react';
import Nav from './Nav';
import pages from '../configs/routes';

class Navigate extends React.Component {
    render() {
        return (
            <div>
                <Nav links={pages} />
            </div>
        );
    }
}

export default Navigate;
