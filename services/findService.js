var books = require('../dummy/books.json');

var fetch = require('node-fetch');

module.exports = {
    name: "books",
    read: function(req, resource, params, config, callback) {
        // fetch books from THR
        // how to pass parameters?
        fetch('http://tarheelreader.org/find/?json=1')
            .then(res => res.json())
            .then(json => {
                callback(null, json.books);
            });
    }
}
