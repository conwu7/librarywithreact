import React from "react";

function NewBookButton(props) {
        return (
            <div className='newBookContainer'>
                <button id='newBookBtn' onClick={(function() {props.handleForm(true,true)})
                }>New Book</button>
            </div>
        )
}

export default NewBookButton;