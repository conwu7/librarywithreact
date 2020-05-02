import React from 'react';
import BookDetails from "./BookDetails";
import BookAction from "./BookAction";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.onEditClick = this.onEditClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    onEditClick() {
        this.props.handleFormOnEdit(this.props.book);
        this.props.handleForm(true, false);
    }
    handleDelete() {
        if (!window.confirm('Are you sure you want to delete this book?')) return
        this.props.handleDelete(this.props.book.indexForStorage);
        this.props.handleDeletedBook();
    }
    render() {
        const {book, isFormNeeded} = this.props;
        return (
            <div className='bookContainer'>
                <BookDetails book={book}/>
                <BookAction book={book} onEditClick={this.onEditClick} isFormNeeded={isFormNeeded}
                handleDelete={this.handleDelete}
                />
            </div>
        )
    }
}

export default Book;