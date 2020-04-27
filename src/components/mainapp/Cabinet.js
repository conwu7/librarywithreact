import React from 'react';
import Book from './Book';

class Cabinet extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Book />
            </div>
        )
    }
}

export default Cabinet;