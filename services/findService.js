import fetch from 'node-fetch';
import queryString from 'query-string';

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
        var url = 'http://tarheelreader.org/find/?json=1';
        var qs = queryString.stringify(params);
        if (qs) {
            url = url + '&' + qs;
        }
        console.log('q', qs);
        fetch(url)
            .then(res => res.json())
            .then(json => {
                callback(null, fixupTHRfind(json));
            })
    }
}
