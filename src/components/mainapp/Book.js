import React from 'react';
import BookDetails from "./BookDetails";
import BookAction from "./BookAction";
import {getAndSaveSort} from "./ProvideBooksArray";
import {moveStuffAround} from "./helper";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.onEditClick = this.onEditClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
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
    handleDragStart(e) {
        e.target.style.opacity = '0.2';
        this.props.setDragElement(e.target.id);
        e.dataTransfer.setData('text',e.target.firstElementChild.firstChild.textContent)
    }
    handleDragEnd(e) {
        e.target.style.opacity = "1";
    }
    handleDragEnter(e) {
        e.preventDefault();
        moveStuffAround(e, this.props.draggedElementId);
        getAndSaveSort();
    }
    handleDragOver(e) {
        e.preventDefault();
    }
    handleDrop(e) {
        e.preventDefault();
    }
    componentDidMount() {
        getAndSaveSort();
    }
    render() {
        const {book, isFormNeeded} = this.props;
        return (
            <div id={'book'+book.indexForStorage} className='bookContainer' draggable='true' onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd} onDragOver={this.handleDragOver} onDrop={this.handleDrop}
                 onDragEnter={this.handleDragEnter}
            >
                <BookDetails book={book}/>
                <BookAction book={book} onEditClick={this.onEditClick} isFormNeeded={isFormNeeded}
                handleDelete={this.handleDelete}
                />
            </div>
        )
    }
}

export default Book;