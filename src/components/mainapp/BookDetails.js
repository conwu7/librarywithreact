import React from 'react';
import * as helper from './helper';

class BookDetails extends React.Component {
    render() {
        const book = this.props.book;
        const bookColor = book.bookColor;
        const textColorToUse = helper.isContrastLow(bookColor, "#000000") ? 'antiquewhite' : 'black';
        return (
           <div className={'bookDetails'} style={{backgroundColor: book.bookColor, color: textColorToUse}}>
               <h2>{book.title.toUpperCase()}</h2>
               <h4><span className={'prefixValues'}>by  </span>{book.author}</h4>
               <h5>{book.numPages} <span>pages</span></h5>
               <h5><span className={'prefixValues'}>Published in </span>{book.yearPub}</h5>
           </div>
        )
    }
}

export default BookDetails;