import fetch from 'node-fetch';
import queryString from 'query-string';

var fields_to_delete = [
    'links',
    'date_gmt',
    'guid',
    'modified_gmt',
    'type',
    'content',
    'excerpt',
    'featured_media',
    'comment_status',
    'ping_status',
    'sticky',
    'format',
    '_links'
];

function fixupTHRfind(json) {
    return json.map(book => {
        book = Object.assign({}, book);
        fields_to_delete.map(field => { delete book[field]; })
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
                callback(null, fixupTHRfind(json));
            })
    }
}
