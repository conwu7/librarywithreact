import React from 'react';
import {Formik} from 'formik';
import FormLabelAndFields from '../form/FormLabelAndFields';
import FormErrors from '../form/FormErrors';
import SaveCancel from '../form/SaveCancel';

class FormMulti extends React.Component {
    constructor(props) {
        super(props);
        this.onCancel = this.onCancel.bind(this);
    }
    onCancel() {
        this.props.handleForm(false, false);
    }
    render() {
        if (!this.props.isFormNeeded) return null;
        const bookToEdit = this.props.bookToEdit;
        return (
            <Formik
            initialValues={ (this.props.isCreating) ?
                {
                    title: '', author: '', numPages: '', yearPub: '', bookColor: '#FBF2E3'
                }
                : {
                    title: bookToEdit.title, author: bookToEdit.author, numPages: bookToEdit.numPages,
                    yearPub: bookToEdit.yearPub, bookColor: bookToEdit.bookColor
                }
                }
            onSubmit = {(values, { setSubmitting }) => {
                //send values back to App
                this.props.handleSave(values.title, values.author, values.numPages, values.yearPub, values.bookColor);
                this.props.handleForm(false, false);
                setSubmitting(false);
            }}
            validate = {values => {
                return 2+2;
            }}
            >
                {
                    ({handleBlur, isSubmitting, errors,
                      values ,handleSubmit, handleChange}) => (
                        <form className='formContainer'>
                        <FormLabelAndFields {...{handleChange, values}}/>
                        <FormErrors errors={errors}/>
                        <SaveCancel cancel={this.onCancel} handleSubmit={handleSubmit}/>
                        </form>
                    )
                }
            </Formik>
        )
    }
}

export default FormMulti;