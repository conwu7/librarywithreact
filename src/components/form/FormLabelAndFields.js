import React from "react";

class FormLabelAndFields extends React.Component {
    render() {
        const {titleError, authorError, numPagesError, yearPubError, touched} = this.props
        return (
            <div className={'formLabelAndFields formWrapper'}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name='title' onChange={this.props.handleChange}
                       value={this.props.values.title} onBlur={this.props.handleBlur}
                       className={titleError && touched.title? 'invalid':''}
                />
                <br />
                <label htmlFor="author">Author:</label>
                <input type="text" id="author" name='author' onChange={this.props.handleChange}
                       value={this.props.values.author} onBlur={this.props.handleBlur}
                       className={authorError && touched.author? 'invalid':''}
                />
                <br />
                <label htmlFor="numPages" >Pages:</label>
                <input type="number" min="1" max="999999" id="numPages" name='numPages'
                       onChange={this.props.handleChange} value={this.props.values.numPages}
                       onBlur={this.props.handleBlur}
                       className={numPagesError && touched.numPages? 'invalid':''}
                />
                <br />
                <label htmlFor="yearPub" >Year Published:</label>
                <input type="number" id="yearPub" name='yearPub'
                       onChange={this.props.handleChange} value={this.props.values.yearPub}
                       onBlur={this.props.handleBlur}
                       className={yearPubError && touched.yearPub? 'invalid':''}
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