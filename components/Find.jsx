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

        this.state = {
            books: this.props.books
        };
    }

    componentDidMount() {
        if(typeof window !== 'undefined'){
            // var idbStorage = require('../services/bookDBService');
            // idbStorage.storeBooks(this.props.books);
            // console.log(this.props.books);
            // console.log(this.props.books);
            // localStorage.books = this.props.books;
            localStorage.books = this.state.books;
        }
    }

    render() {
        var base_url = "http://test.tarheelreader.org";
        var q = Object.assign({}, this.props.currentRoute.query);
        q.page = 'page' in q ? parseInt(q.page) + 1 : 2;
        var qs = queryString.stringify(q);

        return (
            <div>
                <ul className="booklist">
                {
                    this.props.books.map((book, i) => {
                        var cn = ['booklist__item'];
                        if (i === this.props.selected) {
                           cn.push( 'booklist__item--selected');
                        }
                        // console.log(book);
                        return (
                            <li key={book.ID} className={cn.join(' ')}>
                                <NavLink href={base_url+book.link}>{book.title}</NavLink>
                                <p className="thr-author">{book.author}</p>
                                <img src={base_url+book.cover.url} alt=""/>
                            </li>
                        )
                    })
                }
                </ul>
                <NavLink href={'/find?' + qs} >Next</NavLink>
            </div>
        );
    }

    @keydown('right','space')
    handleNext() {
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
        // localStorage.books = context.getStore(BookStore).findBooks();
        return {
            books: context.getStore(BookStore).findBooks(),
            selected: context.getStore(BookStore).getSelected()
        }
    }
);
