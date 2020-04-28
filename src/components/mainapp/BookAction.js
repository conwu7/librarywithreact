import React from 'react';
import {updateLocalStorageBook} from './helper';
import TrashIcon from "../../trash.svg";

class BookAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            read: this.props.book.read
        };
        this.handleToggleRead = this.handleToggleRead.bind(this);
    }
    handleToggleRead () {
        const book = this.props.book;
        book.read = book.read === false;
        this.setState({
            read: book.read
        })
        updateLocalStorageBook(book);
    }

    trashStyle = {
        height: '30px',
        backgroundColor: 'inherit',
        color: 'inherit',
        border: '1px solid gray',
        margin: '0',
        verticalAlign: 'middle'
    }
    render() {
        const isRead = this.state.read;
        const {onEditClick, isFormNeeded, handleDelete} = this.props;
        return (
            <div className={'bookActionContainer'}
                 style={{height: '50px',padding: 0}}>
                <button className={'editBtn modifyBook'} style={this.trashStyle} disabled={isFormNeeded}
                        onClick={onEditClick} type='button'
                >Edit</button>
                {isRead?
                    <button className={'readBtn modifyBook'} style={this.trashStyle} disabled={isFormNeeded}
                            onClick={this.handleToggleRead}
                    >Read</button>
                  : <button className={'readBtn unread modifyBook'} style={this.trashStyle} disabled={isFormNeeded}
                            onClick={this.handleToggleRead}
                    >Unread</button>
                }
                <button className={'deletebtn modifyBook'} style={this.trashStyle} type='button'
                        disabled={isFormNeeded} onClick={handleDelete}
                >
                    <img alt="Trash Icon" style={{height: '20px',backgroundColor: 'inherit'}}
                             src={TrashIcon}/>
                </button>
            </div>
        )
    }
}

export default BookAction;