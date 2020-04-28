import React from 'react';
import Header from "./components/mainapp/Header";
import NewBookButton from "./components/mainapp/NewBookButton";
import Cabinet from "./components/mainapp/Cabinet";
import FormMulti from "./components/mainapp/FormMulti";
import {populateBookArray, createNewBook, editBook,
    deleteBook, addNewBook} from "./components/mainapp/ProvideBooksArray";

class BookLibrary extends React.Component{
    constructor(props) {
        super(props);
        this.booksArray = populateBookArray();
        this.handleSaveBook = this.handleSaveBook.bind(this);
        this.handleNewBook = this.handleNewBook.bind(this);
        this.handleEditBook = this.handleEditBook.bind(this);
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
        this.handleFormNeeded = this.handleFormNeeded.bind(this);
        this.handleFormOnEdit = this.handleFormOnEdit.bind(this);
        this.state = {
            isCreating: false,
            isFormNeeded: false,
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        }
        window.addEventListener('resize',this.handleWindowResizing.bind(this))
    }
    handleSaveBook(title, author, numPages, yearPub, bookColor) {
        if (this.state.isCreating) {
            this.handleNewBook(...arguments);
        } else {
            this.handleEditBook(...arguments);
        }
    }
    handleNewBook(title, author, numPages, yearPub, bookColor) {
        const newBook = createNewBook(
            title, author, numPages, yearPub, bookColor, this.booksArray
        );
        addNewBook(this.booksArray, newBook);
    }
    handleEditBook(title, author, numPages, yearPub, bookColor) {
        editBook.apply(this.bookToEdit,[...arguments]);
    }
    handleDeleteBook(indexForStorage) {
        deleteBook(this.booksArray,indexForStorage);
    }
    handleFormOnEdit(book) {
        this.bookToEdit = book;
    }
    handleFormNeeded(isFormNeeded, isCreating) {
        this.setState(
             {
                isFormNeeded: isFormNeeded,
                isCreating: isCreating,
            }
        )
    }
    handleWindowResizing () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return
        }
        this.setState(
            {
                windowHeight: window.innerHeight,
                windowWidth: window.innerWidth
            }
        )
    }
    render() {
        const booksArray = this.booksArray;
        const handleForm = this.handleFormNeeded;
        const handleSave = this.handleSaveBook;
        const handleFormOnEdit = this.handleFormOnEdit;
        const handleDelete = this.handleDeleteBook;
        const isCreating = this.state.isCreating;
        const isFormNeeded = this.state.isFormNeeded;
        const bookToEdit = this.bookToEdit
        return (
            <div className="App" style={{width: window.innerWidth}}>
                <Header />
                <NewBookButton handleForm={handleForm} isFormNeeded={isFormNeeded}/>
                <FormMulti handleForm={handleForm} handleSave={handleSave} isFormNeeded={isFormNeeded}
                           isCreating={isCreating} bookToEdit={bookToEdit}
                    />
                <Cabinet {...{booksArray, handleForm, handleFormOnEdit, isFormNeeded, handleDelete}} />
            </div>
        );
    }
}

export default BookLibrary;
