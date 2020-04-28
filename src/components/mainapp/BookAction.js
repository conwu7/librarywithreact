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
    render() {
        const isRead = this.state.read;
        const {onEditClick, isFormNeeded, handleDelete} = this.props;
        return (
            <div className={'bookActionContainer'}>
                <button className={'editBtn modifyBook'}  disabled={isFormNeeded}
                        onClick={onEditClick} type='button'
                ><span className='buttonText'>Edit</span></button>
                {isRead?
                    <button className={'readBtn modifyBook'}  disabled={isFormNeeded}
                            onClick={this.handleToggleRead}
                    ><span className='buttonText'>Read</span></button>
                  : <button className={'readBtn unread modifyBook'}  disabled={isFormNeeded}
                            onClick={this.handleToggleRead}
                    ><span className='buttonText'>Unread</span></button>
                }
                <button className={'deleteBtn modifyBook'} type='button'
                        disabled={isFormNeeded} onClick={handleDelete}
                >
                    <img alt="Trash Icon"
                             src={TrashIcon}/>
                </button>
            </div>
        )
    }
}

export default BookAction;