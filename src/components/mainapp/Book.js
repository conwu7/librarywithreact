import React from 'react';
import BookDetails from "./BookDetails";
import BookAction from "./BookAction";

class Book extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <BookDetails />
                <BookAction />
            </div>
        )
    }
}

export default Book;