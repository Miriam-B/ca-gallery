'use strict'

var gBooks;
var STORAGE_KEY = 'books';
var gNextId = 0;
var PAGE_SIZE = 5;
var gPageIdx = 0;

_createBookList();

function _createBookList() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) {
        books = [
            { id: gNextId++, title: 'Norwegian Wood', price: 20, imgUrl: '../img/1', rate: 5 },
            { id: gNextId++, title: 'Kafka on the Shore', price: 15, imgUrl: '../img/2', rate: 8 }
        ];
    }
    gBooks = books;
    gNextId = gBooks[gBooks.length - 1].id + 1;
    saveToStorage(STORAGE_KEY, gBooks);
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(startIdx, startIdx + PAGE_SIZE);
    return books;
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    });
    gBooks.splice(bookIdx, 1);
    saveToStorage(STORAGE_KEY, gBooks);
}

function addBook(name, price) {
    var newBook = {
        id: gNextId++,
        title: name,
        price: price,
        imgUrl: '../img/no_cover',
        rate: 0
    };
    gBooks.push(newBook);
    saveToStorage(STORAGE_KEY, gBooks);
}

function updateBook(id, price) {
    var updatedBook = getBookById(id);
    updatedBook.price = price;
    saveToStorage(STORAGE_KEY, gBooks);
}

function getBookById(id) {
    return gBooks.find(function (book) {
        return book.id === id;
    })
}

function updateRate(diff, id) {
    var book = getBookById(id);
    if (book.rate + diff > 10 || book.rate + diff < 0) return;
    book.rate += diff;
    saveToStorage(STORAGE_KEY, gBooks);
}

function sortBooks(sortBy) {
    gBooks = gBooks.sort(function (bookA, bookB) {
        if (sortBy !== 'title') return bookA[sortBy] - bookB[sortBy];
        return bookA.title.localeCompare(bookB.title);
    });
    saveToStorage(STORAGE_KEY, gBooks);
}

function setPage(diff) {
    if (gPageIdx + diff > gBooks.length / PAGE_SIZE) return gPageIdx;
    if (gPageIdx + diff < 0) return gPageIdx;
    gPageIdx += diff;
    return gPageIdx;
}
