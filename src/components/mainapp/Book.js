import React from 'react';
import BookDetails from "./BookDetails";
import BookAction from "./BookAction";
import {getAndSaveSort} from "./ProvideBooksArray";
import {moveStuffAround} from "./helper";
import {animated, useTransition} from "react-spring";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.onEditClick = this.onEditClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
        this.handleCancelDelete = this.handleCancelDelete.bind(this);
        this.state = {
            confirmDeleteNeeded: false
        }
    }
    onEditClick() {
        this.props.handleFormOnEdit(this.props.book);
        this.props.handleForm(true, false);
    }
    handleDelete() {
        this.setState(
            {
                confirmDeleteNeeded: true
            }
        )
    }
    handleConfirmDelete() {
        this.props.handleDelete(this.props.book.indexForStorage);
        this.props.handleDeletedBook();
        this.setState(
            {
                confirmDeleteNeeded: false
            }
        )
    }
    handleCancelDelete() {
        this.setState(
            {
                confirmDeleteNeeded: false
            }
        )
    }
    handleDragStart(e) {
        if (this.state.confirmDeleteNeeded || e.target.tagName === 'IMG') return
        e.target.style.opacity = '0.2';
        this.props.setDragElement(e.target.id);
        e.dataTransfer.setData('text',e.target.firstElementChild.firstChild.textContent)
    }
    handleDragEnd(e) {
        e.preventDefault();
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
            <div id={'book'+book.indexForStorage} className='bookContainer' onDragStart={this.handleDragStart}
                 draggable={!this.state.confirmDeleteNeeded && 'true'}
                 onDragEnd={this.handleDragEnd} onDragOver={this.handleDragOver} onDrop={this.handleDrop}
                 onDragEnter={this.handleDragEnter}
            >
                <BookDetails book={book}/>
                <BookAction book={book} onEditClick={this.onEditClick} isFormNeeded={isFormNeeded}
                handleDelete={this.handleDelete}
                />
                <ConfirmDeletePopup confirmDeleteNeeded={this.state.confirmDeleteNeeded}
                handleConfirmDelete={this.handleConfirmDelete}
                handleCancelDelete={this.handleCancelDelete} book={book}
                />
            </div>
        )
    }
}

function ConfirmDeletePopup(passProps) {
    const {confirmDeleteNeeded, handleCancelDelete, handleConfirmDelete, book} = passProps;
    const transitions = useTransition(confirmDeleteNeeded, null, {
        from: {opacity: 0, marginLeft: window.innerWidth},
        enter: {opacity: 1, transform: 'scale(1)', width: window.innerWidth, marginLeft: 0},
        leave: {opacity: 0, width: 0},
        config: {mass: 1, tension: 250, friction: 50}, //change mass back to 1, tension to 250
    })
    return transitions.map(({ item, key, props }) =>
        item &&
        <animated.div key={key} style={props} className='confirmDeleteContainer'>
            <div className='confirmDeleteWrapper'>
                <div className='formTitle'>
                    <h2>Are you sure you want to delete this book?</h2>
                </div>
                <BookDetails book={book}/>
                <div className='confirmDeleteButtonContainer'>
                    <div style={{display: 'inline-block'}}>
                        <button type='button' id='dontDelete' className='dontDelete' onClick={handleCancelDelete}
                        >No, Go Back</button>
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <button type="button" id='yesDelete' className='yesDelete' onClick={handleConfirmDelete}
                        >Yes, Delete</button>
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default Book;