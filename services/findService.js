import fetch from 'node-fetch';
import queryString from 'query-string';

function fixupTHRfind(json) {
    console.log('fix', json);
    return json.map(book => {
        book = Object.assign({}, book);
        book.title = book.title.rendered;
        return book;
    });
}

module.exports = {
    name: "books",
    read: function(req, resource, params, config, callback) {
        // fetch books from THR
        // how to pass parameters?
        var url = 'http://localhost:8000/wp-json/wp/v2/posts/?categories=3';
        var qs = queryString.stringify(params);
        if (qs) {
            url = url + '&' + qs;
        }
        fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log('json', json);
                callback(null, fixupTHRfind(json));
            })
    }
}
