import React from "react";

function NewBookButton(props) {
        if (props.isFormNeeded) return null;
        return (
            <div>
                <button onClick={(function() {props.handleForm(true,true)})
                }>New Book</button>
            </div>
        )
}

export default NewBookButton;