import React from 'react';
import * as helper from './helper';
import menuIcon from '../../menu-icon.svg';

export default class BookDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuExpanded: false
        }
        this.handleMenu = this.handleMenu.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

    }
    handleMenu(e) {
        if (this.props.sortMode) return
        clearTimeout(this.closeMenu);
        if (e.type === 'mouseenter') {
            this.setState(()=>({
                menuExpanded: true
            }))
            return;
        }
        this.setState((prevState)=>({
            menuExpanded: !prevState.menuExpanded
        }))
    }
    handleMouseLeave() {
        this.closeMenu = setTimeout(()=>{
            this.setState({
                menuExpanded: false
            })
        },300)
    }
    render() {
        const {book, showMenuIcon, onEditClick, handleDelete, sortMode} = this.props;
        const bookColor = book.bookColor;
        const textColorToUse = helper.isContrastLow(bookColor, "#000000") ? 'antiquewhite' : 'black';
        return (
            <div className={'bookDetails'} style={{backgroundColor: bookColor, color: textColorToUse}}
                 onMouseLeave={this.handleMouseLeave}
            >
                <h2>{book.title.toUpperCase()}</h2>
                <br />
                <h4><span className={'prefixValues'}>by  </span>{book.author}</h4>
                <h5>{book.numPages} <span>pages</span></h5>
                <h5><span className={'prefixValues'}>Published in </span>{book.yearPub}</h5>
                {showMenuIcon &&
                <div className='book-menu-container'>
                    <div className={'menu-icon-container'+(this.state.menuExpanded?' active':'')}>
                        <img draggable={false} src={menuIcon} alt='Menu Icon' className='menu-icon'
                            onClick={this.handleMenu} style={{cursor: sortMode?'inherit':'pointer'}}/>
                    </div>
                    <div className={'menu-list-container '+ (this.state.menuExpanded && 'active')}
                         id='menu-list-container' onMouseEnter={this.handleMenu}>
                        <button type='button' className='menu-button menu-edit' onClick={onEditClick}>Edit</button>
                        <button type='button' className='menu-button menu-delete' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                }
            </div>
        )
    }
}
