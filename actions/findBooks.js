var books = require('../dummy/books.json');

module.exports = function (context, payload, callback) {
    context.dispatch('BOOKS_RECEIVED', {
        books: books
    });
    callback();
};
