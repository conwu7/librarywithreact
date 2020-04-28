import React from "react";

class FormLabelAndFields extends React.Component {
    render() {
        return (
            <div className={'formLabelAndFields formWrapper'}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name='title' onChange={this.props.handleChange}
                       value={this.props.values.title}
                />
                <br />
                <label htmlFor="author">Author:</label>
                <input type="text" id="author" name='author' onChange={this.props.handleChange}
                       value={this.props.values.author}
                />
                <br />
                <label htmlFor="numPages" >Pages:</label>
                <input type="number" min="1" max="99999" id="numPages" name='numPages'
                       onChange={this.props.handleChange} value={this.props.values.numPages}/>
                <br />
                <label htmlFor="yearPub" >Year Published:</label>
                <input type="number" id="yearPub" name='yearPub' onChange={this.props.handleChange}
                       value={this.props.values.yearPub}
                />
                <br />
                <label htmlFor="bookColor">Book Color</label>
                <input type="color" id="bookColor" name='bookColor' value={this.props.values.bookColor}
                       onChange={this.props.handleChange}/>
                <br />
            </div>
        )
    }
}

export default FormLabelAndFields;