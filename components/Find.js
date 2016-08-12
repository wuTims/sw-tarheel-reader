var React = require('react');
var connectToStores = require("fluxible-addons-react").connectToStores;
var BookStore = require('../stores/BookStore');

var Find = React.createClass({
    render() {
        return (
            <div>
                <h2>Some books</h2>
                {
                    this.props.books.map(function(book) {
                        return (
                            <li key={book.ID}>{book.title}</li>
                        )
                    })
                }
            </div>
        );
    }
});

module.exports = connectToStores(
    Find,
    [BookStore],
    function(context, props) {
        return {
            books: context.getStore(BookStore).findBooks()
        }
    }
);
