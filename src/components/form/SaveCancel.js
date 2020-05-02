import React from "react";

export default class SaveCancel extends React.Component {
    render() {
        const {cancel, handleSubmit} = this.props;
        return (
            <div className='newBookContainer saveCancelContainer'>
                <div style={{display: 'inline-block'}}>
                    <button type={'button'} id='cancelBtn' className='cancelBtn' onClick={cancel}
                    >Cancel</button>
                </div>
                <div style={{display: 'inline-block'}}>
                    <button type="submit" id='saveBtn' className='saveBtn' onClick={handleSubmit}
                    >Save</button>
                </div>
            </div>
        )
    }
}
