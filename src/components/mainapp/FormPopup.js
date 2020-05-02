import React from 'react';
import {Formik} from 'formik';
import FormLabelAndFields from '../form/FormLabelAndFields';
import SaveCancel from '../form/SaveCancel';
import * as validateBook from './validation';
import BookDetails from './BookDetails';
import {animated, useTransition} from "react-spring";

export default function FormPopup(passProps) {
    const {bookToEditClone, isCreating, handleSave, handleForm, isFormNeeded} = passProps;
    const transitions = useTransition(isFormNeeded, null, {
        from: {opacity: 0, marginLeft: window.innerWidth},
        enter: {opacity: 1, transform: 'scale(1)', width: window.innerWidth, marginLeft: 0},
        leave: {opacity: 0, width: 0},
        config: {mass: 1, tension: 250, friction: 50}, //change mass back to 1, tension to 250
    })
    return transitions.map(({ item, key, props }) =>
        item &&
        <animated.div key={key} style={props} className='formContainer'>
            <FormMulti {...{bookToEditClone, isCreating, handleSave, handleForm, isFormNeeded}}/>
        </animated.div>
    )
}

class FormMulti extends React.Component {
    constructor(props) {
        super(props);
        this.onCancel = this.onCancel.bind(this);
        this.cachedBookToEdit = {...this.props.bookToEditClone};
        this.editingBookDetails = <div><h2>Editing</h2><BookDetails book={this.cachedBookToEdit}/></div>;
        this.cachedBookExists = Object.keys(this.cachedBookToEdit).length !== 0;
        this.isCreating = this.props.isCreating;
    }
    onCancel() {
        this.props.handleForm(false, this.props.isCreating);
    }
    render() {
        const {handleSave, handleForm} = this.props;
        return (
            <Formik
            initialValues={
                {
                    title: this.cachedBookExists? this.cachedBookToEdit.title : '',
                    author: this.cachedBookExists? this.cachedBookToEdit.author : '',
                    numPages: this.cachedBookExists? this.cachedBookToEdit.numPages : '',
                    yearPub: this.cachedBookExists? this.cachedBookToEdit.yearPub : '',
                    bookColor: this.cachedBookExists? this.cachedBookToEdit.bookColor : "#FBF2E3"
                }
                }
            onSubmit = {(values) => {
                //send values back to App
                handleSave(values.title, values.author, values.numPages, values.yearPub, values.bookColor);
                handleForm(false, this.isCreating);
            }}
            validate = {values => {
                const errors = {}
                const titleMessage = validateBook.validateTitle(values.title);
                const authorMessage = validateBook.validateAuthor(values.author);
                const numPagesMessage = validateBook.validateNumPages(values.numPages);
                const yearPubMessage = validateBook.validateYearPub(values.yearPub);
                if (titleMessage) errors.title = titleMessage;
                if (authorMessage) errors.author = authorMessage;
                if (numPagesMessage) errors.numPages = numPagesMessage;
                if (yearPubMessage) errors.yearPub = yearPubMessage;
                return errors
            }}
            >
                {
                    ({handleBlur, errors,
                      values ,handleSubmit, handleChange,touched}) => (
                        <form className='formA'>
                            <div className='formTitle'>
                                {this.isCreating? <h2>Creating New Book</h2> : this.editingBookDetails}
                            </div>
                            <FormLabelAndFields {...{handleChange, values, handleBlur, touched}}
                            titleError={errors.title} authorError={errors.author}
                            numPagesError={errors.numPages} yearPubError={errors.yearPub}
                            />
                            <SaveCancel cancel={this.onCancel} handleSubmit={handleSubmit}/>
                        </form>
                    )
                }
            </Formik>
        )
    }
}