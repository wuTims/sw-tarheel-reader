var fetch = require('node-fetch');


var myInit = { method: 'GET',
               headers: {"Content-Type": "application/json"}
            }



module.exports = function (context, payload, callback) {
    context.service.read('books', payload.query, {}, function(err, books) {
        if (err) {
            callback(err);
        } else {
            context.dispatch('BOOKS_RECEIVED', {
            books: books
            });
            console.log(books);
            
            callback();
        }
    });
    // console.log("fetch books");
    // fetch('http://tarheelreader.org/find?json=1', myInit)
    //     .then((response) => {
    //         var contentType = response.headers.get("content-type");
    //         if(contentType && contentType.indexOf("application/json") !== -1){
    //             return response.json();
    //         }
    //     })
    //     .then((responseJson) => {
    //         console.log(responseJson);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

};
