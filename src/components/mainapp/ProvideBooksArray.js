import * as helper from "./helper";

// Use local storage values otherwise new array
function populateBookArray() {
    // returns an array of book Objects
    const bookArray = [];
    if (localStorage.getItem('storageIndexReact')) {
        bookArray.indexForStorage = localStorage.getItem('storageIndexReact');
        if (localStorage.getItem('ReactBookSort')) {
            const customSort = JSON.parse(localStorage.getItem('ReactBookSort'));
            const length = customSort.length;
            for (let i = 0; i < length; i++) {
                bookArray.push(JSON.parse(localStorage.getItem('REACTBK' + customSort[i])))
            }
        } else {
            for (let i = 0; i < localStorage.length; i++) {
                let keyLS = localStorage.key(i);
                if (!keyLS.includes('REACTBK')) {
                    continue
                }
                let objDeConverted = JSON.parse(localStorage.getItem(keyLS));
                bookArray.push(objDeConverted);
            }
        }
    } else {
        bookArray.indexForStorage = 0;
        createMockBooks(bookArray);
    }
    if (!localStorage.getItem('ReactBookSort')) {
        bookArray.sort(function(a, b) {
            return a.indexForStorage - b.indexForStorage;
        })
    }
    return bookArray;
}
function createMockBooks(bookArray) {
    let book1 = createNewBook('Flowers for Algernon','Daniel Keyes',
        234, 1958, "#008b8b",bookArray);
    let book2 = createNewBook('If I stay', 'Gayle Forman',
        360, 2009, "#b8860b",bookArray);
    bookArray.push(book1,book2);
    helper.updateLocalStorageBook(book1);
    helper.updateLocalStorageBook(book2);
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
function getAndSaveSort(indexForStorage) {
    const sortArray = [...document.getElementsByClassName('bookContainer')].reduce((sortArray,currentBook)=>(
        [...sortArray, currentBook.id.slice(4)]
    ),[])
    if (indexForStorage) sortArray.splice(sortArray.indexOf(indexForStorage.toString()),1);
    localStorage.setItem('ReactBookSort',JSON.stringify(sortArray))
}

export {populateBookArray, addNewBook, createNewBook, deleteBook, editBook, getAndSaveSort};

