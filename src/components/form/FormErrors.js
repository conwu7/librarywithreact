import React from "react";

class FormErrors extends React.Component {
    render() {
        const errors = this.props.errors; //Object containing errors for each field
        if (Object.keys(errors).length === 0) return null;
        return (
            <div className={'errorDiv'}>
                {/* Add a p element for each error message*/}
            </div>
        )
    }
}

export default FormErrors;