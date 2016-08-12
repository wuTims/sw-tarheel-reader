module.exports = function (context, payload, callback) {
    context.service.read('books', {}, {}, function(err, books) {
        console.log('serice.read resp', err, books);
        if (err) {
            callback(err);
        } else {
            context.dispatch('BOOKS_RECEIVED', {
            books: books
            });
            callback();
        }
    });
};
