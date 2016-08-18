import BaseStore from 'fluxible/addons/BaseStore';

class BookStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.books = [];
        this.selected = -1;
    }
    handleBooksReceived(payload) {
        this.books = payload.books;
        this.emitChange();
    }
    findBooks() {
        return this.books;
    }
    getSelected() {
        return this.selected;
    }
    selectNext() {
        this.selected = (this.selected + 1) % this.books.length;
        this.emitChange();
    }
    dehydrate() {
        return {
            books: this.books,
            selected: this.selected
        };
    }
    rehydrate(state) {
        this.books = state.books;
        this.selected = state.selected;
    }
};

BookStore.storeName = "BookStore";
BookStore.handlers = {
        "BOOKS_RECEIVED": "handleBooksReceived",
        "SELECT_NEXT": "selectNext"
};

export default BookStore;
