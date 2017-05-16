import queryString from 'query-string';

var fetch = require('node-fetch');


var myInit = { method: 'GET',
               headers: {"Content-Type": "application/json"}
            }

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

if(typeof window !== 'undefined'){
    var idbStorage = require('./bookDBService');
}         

function fixupTHRfind(json) {
    console.log(json);

    if(typeof window !== 'undefined'){
        localStorage.books = json;
    }       
    // idbStorage.storeBooks(json);
    return json.books.map(book => {
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
        // var url = 'http://localhost:8000/wp-json/wp/v2/posts/?categories=3';
        var url = 'http://test.tarheelreader.org/find?json=1';

        var qs = queryString.stringify(params);
        if (qs) {
            url = url + '&' + qs;
        }
        console.log(url);

        fetch(url, myInit)
            .then((response) => {
                var contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1){
                    return response.json();
                }
            })
            .then((responseJson) => {
                // console.log(responseJson);
                callback(null, fixupTHRfind(responseJson));
            })
            .catch((error) => {
                console.error(error);
            });


        // fetch(url)
        //     .then((res) => {
        //         res.json(); 
        //         console.log(res.json());
        //     })
        //     .then((json) => {
        //         console.log(json);
        //         callback(null, fixupTHRfind(json));
        //     })
    }
}
