import React from 'react';

class BookDetails extends React.Component {
    render() {
        const book = this.props.book;
        return (
           <div className={'bookDetails'}>
               <h2>{book.title}</h2>
               <h4><span className={'prefixValues'}>by  </span>{book.author}</h4>
               <h5>{book.numPages} <span>pages</span></h5>
               <h5><span className={'prefixValues'}>Published in </span>{book.yearPub}</h5>
           </div>
        )
    }
}

export default BookDetails;