import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import BookStore from '../stores/BookStore';
import { handleRoute, NavLink } from 'fluxible-router';
import queryString from 'query-string';

var Find = React.createClass({
    render() {
        var q = Object.assign({}, this.props.currentRoute.query);
        q.page = 'page' in q ? parseInt(q.page) + 1 : 2;
        console.log('q', q);
        var qs = queryString.stringify(q);
        return (
            <div>
                <ul>
                {
                    this.props.books.map(function(book) {
                        return (
                            <li key={book.ID}>{book.title}</li>
                        )
                    })
                }
                </ul>
                <NavLink href={'/find?' + qs} >Next</NavLink>
            </div>
        );
    }
});

Find = handleRoute(Find);

module.exports = connectToStores(
    Find,
    [BookStore],
    function(context, props) {
        console.log('context', context);
        console.log('props', props);
        return {
            books: context.getStore(BookStore).findBooks()
        }
    }
);
