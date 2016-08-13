module.exports = function (context, payload, callback) {
    console.log('payload', payload);
    context.service.read('books', payload.query, {}, function(err, books) {
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
