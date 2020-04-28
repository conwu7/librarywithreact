import React from "react";

class SaveCancel extends React.Component {
    render() {
        const {cancel, handleSubmit} = this.props;
        return (
            <div>
                <div>
                    <button type={'button'} id='cancelBtn' onClick={cancel}
                    >Cancel</button>
                </div>
                <div>
                    <button type="submit" id='saveBtn' onClick={handleSubmit}
                    >Save</button>
                </div>
            </div>
        )
    }
}

export default SaveCancel;
