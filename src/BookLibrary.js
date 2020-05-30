import React from 'react';
import Header from "./components/mainapp/Header";
import NewBookButton from "./components/mainapp/NewBookButton";
import Cabinet from "./components/mainapp/Cabinet";
import FormPopup from "./components/mainapp/FormPopup";
import {populateBookArray, createNewBook, editBook,
    deleteBook, addNewBook, getAndSaveSort} from "./components/mainapp/ProvideBooksArray";
import {getDarkModeSetting, saveDarkModeSetting} from "./components/mainapp/helper";

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
        this.handleThemeToggle = this.handleThemeToggle.bind(this);
        this.handleUpdatedTheme = this.handleUpdatedTheme.bind(this);
        this.handleSortMode = this.handleSortMode.bind(this);
        this.state = {
            isCreating: false,
            isFormNeeded: false,
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            darkMode: getDarkModeSetting() || false,
            themeToggleClicked: false,
            sortMode: false
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
        if (this.state.isFormNeeded) return;
        this.bookToEdit = book;
        this.bookToEditClone = {...book};
        //props for FormPopup
    }
    handleEditBook(title, author, numPages, yearPub, bookColor) {
        editBook.apply(this.bookToEdit,[...arguments]);
    }
    handleDeleteBook(indexForStorage) {
        deleteBook(this.booksArray,indexForStorage);
        getAndSaveSort(indexForStorage);
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
    handleThemeToggle () {
        if (!this.state.themeToggleClicked) {
            this.setState({themeToggleClicked: true})
        }
        this.setState(prevState => (
            {
                darkMode: !prevState.darkMode
            }
            ),this.handleUpdatedTheme
        )
    }
    handleUpdatedTheme () {
        saveDarkModeSetting(this.state.darkMode);
        const body = document.querySelector('body');
        const pageHeader = document.querySelector('.header');
        if (this.state.darkMode) {
            body.style.backgroundColor = 'darkslategray';
            pageHeader.style.color = 'antiquewhite';
        } else {
            body.style.backgroundColor = 'antiquewhite';
            pageHeader.style.color = 'darkslategray';
        }
    }
    handleSortMode() {
        this.setState(prevState=>({
            sortMode: !prevState.sortMode
        }))
    }
    componentDidMount() {
        window.addEventListener('resize',this.handleWindowResizing.bind(this));
        this.handleUpdatedTheme();
    }

    render() {
        const booksArray = this.booksArray;
        const handleForm = this.handleFormNeeded;
        const handleSave = this.handleSaveBook;
        const handleFormOnEdit = this.handleFormOnEdit;
        const handleDelete = this.handleDeleteBook;
        const bookToEditClone = this.bookToEditClone;
        const {isCreating, isFormNeeded, sortMode, darkMode} = this.state;
        return (
            <div className="App" style={{width: window.innerWidth}}>
                <Header />
                <NewBookButton handleForm={handleForm} isFormNeeded={isFormNeeded}>
                    <button type='button' className='new-theme-sort-btn dark-mode-btn' id='dark-mode-btn'
                            onClick={this.handleThemeToggle}>{darkMode?'Light Theme':'Dark Theme'}</button>
                    <button type='button' className={'new-theme-sort-btn sort-books-btn '+(sortMode?'active':'')}
                            onClick={this.handleSortMode} id='sort-books-btn'
                            >
                                {sortMode?'Turn Off Sort Mode':'Sort Books'}
                    </button>
                </NewBookButton>
                <FormPopup {...{handleForm, handleSave, isFormNeeded, isCreating, bookToEditClone}}
                    />
                <Cabinet {...{booksArray, handleForm, handleFormOnEdit, isFormNeeded, handleDelete, sortMode}} />
            </div>
        );
    }
}

export default BookLibrary;
