import React from "react";

function NewBookButton(props) {
        return (
            <div className='newBookContainer'>
                <button id='new-book-btn' className='new-theme-sort-btn' onClick={(function() {props.handleForm(true,true)})
                }>New Book</button>
                {props.children}
            </div>
        )
}

export default NewBookButton;