import fetch from 'node-fetch';

function fixupTHRfind(json) {
    return json.books.map(book => {
        book.rating = parseFloat(book.rating.text);
        delete book.tags;
        delete book.categories;
        return book;
    });
}

module.exports = {
    name: "books",
    read: function(req, resource, params, config, callback) {
        // fetch books from THR
        // how to pass parameters?
        fetch('http://tarheelreader.org/find/?json=1')
            .then(res => res.json())
            .then(json => {
                callback(null, fixupTHRfind(json));
            })
    }
}
