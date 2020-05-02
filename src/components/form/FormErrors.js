import React from "react";

export default class FormErrors extends React.Component {

    render() {
        const {errors, touched} = this.props;
        const {title, author, numPages, yearPub} = this.props.errors;
        if (!title && !author && !numPages && !yearPub) return null;
        const allErrorsUntouched = Object.keys(errors).every(
            inputName => !touched[inputName]
        )
        if (allErrorsUntouched) return null //If all the errors are from untouched inputs, return null
        return (
            <div className={'errorDiv'}>
                {Object.keys(errors).map(inputName => (
                    (touched[inputName] && errors[inputName]) ? <p key={inputName}>{errors[inputName]}</p>
                        : null
                ))}
            </div>
        )
    }
}