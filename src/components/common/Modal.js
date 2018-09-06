import React from 'react';

class Modal extends React.Component {
    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
        );
    }
}

export default Modal;
