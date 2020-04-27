import React from 'react';
import Formik from 'formik';
import FormLabelAndFields from '../form/FormLabelAndFields';
import FormErrors from '../form/FormErrors';
import SaveCancel from '../form/SaveCancel';

class FormMulti extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Formik>
                <form>
                    <FormLabelAndFields/>
                    <FormErrors/>
                    <SaveCancel/>
                </form>
            </Formik>
        )
    }
}