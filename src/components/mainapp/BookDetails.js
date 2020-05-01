import React from 'react';
import * as helper from './helper';

class BookDetails extends React.Component {
    render() {
        const book = this.props.book;
        const bookColor = book.bookColor;
        const textColorToUse = helper.isContrastLow(bookColor, "#000000") ? 'antiquewhite' : 'black';
        return (
           <div className={'bookDetails'} style={{backgroundColor: bookColor, color: textColorToUse}}
                onClick={(event => {
                    const scale = event.target.classList.contains('bookDetails') ? event.target : event.target.parentElement;
                    scale.style.transform = scale.style.transform === 'scale(1.5)' ? 'scale(1)' : 'scale(1.5)';
                    event.preventDefault();
                })}
           >
               <h2>{book.title.toUpperCase()}</h2>
               <br />
               <h4><span className={'prefixValues'}>by  </span>{book.author}</h4>
               <h5>{book.numPages} <span>pages</span></h5>
               <h5><span className={'prefixValues'}>Published in </span>{book.yearPub}</h5>
           </div>
        )
    }
}
export default BookDetails;