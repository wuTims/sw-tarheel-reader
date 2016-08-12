var books = require('../dummy/books.json');

module.exports = {
    name: "books",
    read: function(req, resource, params, config, callback) {
        // We would do some kind of database call here.
        callback(null, books);
    }
}
