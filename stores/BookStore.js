import BaseStore from 'fluxible/addons/BaseStore';

class BookStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.books = [];
    }
    handleBooksReceived(payload) {
        this.books = payload.books;
        this.emitChange();
    }
    findBooks() {
        return this.books;
    }
    dehydrate() {
        return {
            books: this.books
        };
    }
    rehydrate(state) {
        this.books = state.books;
    }
};

BookStore.storeName = "BookStore";
BookStore.handlers = {
        "BOOKS_RECEIVED": "handleBooksReceived"
};

export default BookStore;
