import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import BookStore from '../stores/BookStore';
import { handleRoute, NavLink } from 'fluxible-router';
import queryString from 'query-string';
import keydown from 'react-keydown';
import selectNext from '../actions/selectNext';

class Find extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var q = Object.assign({}, this.props.currentRoute.query);
        q.page = 'page' in q ? parseInt(q.page) + 1 : 2;
        var qs = queryString.stringify(q);
        return (
            <div>
                <ul>
                {
                    this.props.books.map((book, i) => {
                        var c = i == this.props.selected ? 'selected' : '';
                        return (
                            <li key={book.id} className={c}>{book.title}</li>
                        )
                    })
                }
                </ul>
                <NavLink href={'/find?' + qs} >Next</NavLink>
            </div>
        );
    }

    @keydown('enter')
    handleNext() {
        console.log('here');
        this.context.executeAction(selectNext, {});
    }
};
Find.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

Find = handleRoute(Find);

module.exports = connectToStores(
    Find,
    [BookStore],
    function(context, props) {
        return {
            books: context.getStore(BookStore).findBooks(),
            selected: context.getStore(BookStore).getSelected()
        }
    }
);
