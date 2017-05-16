import IDBStore from '../node_modules/idb-wrapper/idbstore';


console.log(IDBStore);

var books = new IDBStore({
	dbVersion: 1,
	storeName: 'books',
	keyPath: 'id',
	autoIncrement: true,
	onStoreReady: function(){
		console.log('Store ready!');
	}
});

console.log(books);

var onsuccess = function(id){
	console.log("Book inserted. insertId: " + id);
}
var onerror = function(error){
	console.log(error);
}

exports.storeBooks = function(jsonBooks){
	books.put( jsonBooks, onsuccess, onerror);
}

