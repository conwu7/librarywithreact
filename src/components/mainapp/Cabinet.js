import React from 'react';
import Book from './Book';

class Cabinet extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeletedBook = this.handleDeletedBook.bind(this);
        this.setDragElement = this.setDragElement.bind(this);
        this.state = {
            numberOfBooks: this.props.booksArray.length,
            draggedElementId: ''
        }
    }
    handleDeletedBook() {
        this.setState(
            {
                numberOfBooks: this.props.booksArray.length
            }
        )
    }
    setDragElement(id) {
        this.setState(
            {
                draggedElementId: id
            }
        )
    }
    render() {
        const books = this.props.booksArray;
        if (books.length < 1) return null;
        const {handleForm, handleFormOnEdit, handleDelete, isFormNeeded} = this.props
        return (
            <div className='cabinet'>
                {
                    books.map(book => (
                        <Book  key={book.indexForStorage} {...{handleForm, handleFormOnEdit, handleDelete, isFormNeeded}}
                               book={book} handleDeletedBook={this.handleDeletedBook} setDragElement={this.setDragElement}
                               draggedElementId={this.state.draggedElementId}
                        />
                    ))
                }
            </div>
        )
    }
}

export default Cabinet;