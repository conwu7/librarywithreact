import * as helper from "./helper";

// Use local storage values otherwise new array
function populateBookArray() {
    // returns an array of book Objects
    const bookArray = [];
    if (localStorage.getItem('storageIndexReact')) {
        bookArray.indexForStorage = localStorage.getItem('storageIndexReact');
        for (let i=0; i < localStorage.length; i++) {
            let keyLS = localStorage.key(i);
            if (!keyLS.includes('REACTBK')) {continue}
            let objDeConverted = JSON.parse(localStorage.getItem(keyLS));
            bookArray.push(objDeConverted);
        }
    } else {
        bookArray.indexForStorage = 0;
        let book1 = createNewBook('Flowers for Algernon','Daniel Keyes',
            234, 1958, "#008b8b",bookArray);
        let book2 = createNewBook('If I stay', 'Gayle Forman',
            360, 2009, "#b8860b",bookArray);
        bookArray.push(book1,book2);
        helper.updateLocalStorageBook(book1);
        helper.updateLocalStorageBook(book2);
    }
    bookArray.sort(function(a, b) {
        return a.indexForStorage - b.indexForStorage;
    });
    return bookArray;
}

function createNewBook(title, author, numPages, yearPub, bookColor, bookArray) {
    bookArray.indexForStorage ++;
    localStorage.setItem('storageIndexReact',bookArray.indexForStorage);
    return {
        title,
        author,
        numPages,
        yearPub,
        bookColor,
        read: false,
        'indexForStorage': bookArray.indexForStorage
    }
}
function addNewBook(booksArray, bookObj) {
    booksArray.push(bookObj)
    helper.updateLocalStorageBook(bookObj);
}
function deleteBook(booksArray, indexForStorage) {
    const bookArrayIndex = booksArray.findIndex(obj => Number(obj.indexForStorage) === Number(indexForStorage));
    helper.removeLocalStorageBook(booksArray[bookArrayIndex]);
    console.log(bookArrayIndex);
    booksArray.splice(bookArrayIndex,1);

}
function editBook(title, author, numPages, yearPub, bookColor) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.yearPub = yearPub;
    this.bookColor = bookColor;
    helper.updateLocalStorageBook(this);
}
function toggleReadStatus(bool) {
    this.read = bool;
}

export {populateBookArray, addNewBook, createNewBook, deleteBook, editBook, toggleReadStatus};

