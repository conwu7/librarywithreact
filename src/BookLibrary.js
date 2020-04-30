import React from 'react';
import Header from "./components/mainapp/Header";
import NewBookButton from "./components/mainapp/NewBookButton";
import Cabinet from "./components/mainapp/Cabinet";
import FormPopup from "./components/mainapp/FormPopup";
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
    handleFormOnEdit(book) {
        this.bookToEdit = book;
        this.bookToEditClone = {...book};
        //props for FormPopup
    }
    handleEditBook(title, author, numPages, yearPub, bookColor) {
        console.log(this.bookToEdit);
        editBook.apply(this.bookToEdit,[...arguments]);
    }
    handleDeleteBook(indexForStorage) {
        deleteBook(this.booksArray,indexForStorage);
    }
    handleFormNeeded(isFormNeeded, isCreating) {
        if (isCreating) this.bookToEditClone = {};
        // passing empty object here so initial values on form  are set to blank (default)
        this.setState(
             {
                isFormNeeded,
                isCreating,
            }
        )
        if (!isFormNeeded) this.bookToEdit = {};
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
    componentDidMount() {
        window.addEventListener('resize',this.handleWindowResizing.bind(this));
    }

    render() {
        const booksArray = this.booksArray;
        const handleForm = this.handleFormNeeded;
        const handleSave = this.handleSaveBook;
        const handleFormOnEdit = this.handleFormOnEdit;
        const handleDelete = this.handleDeleteBook;
        const bookToEditClone = this.bookToEditClone;
        const {isCreating, isFormNeeded} = this.state;
        return (
            <div className="App" style={{width: window.innerWidth-60}}>
                <Header />
                <NewBookButton handleForm={handleForm} isFormNeeded={isFormNeeded}/>
                <FormPopup {...{handleForm, handleSave, isFormNeeded, isCreating, bookToEditClone}}
                    />
                <Cabinet {...{booksArray, handleForm, handleFormOnEdit, isFormNeeded, handleDelete}} />
            </div>
        );
    }
}

export default BookLibrary;
