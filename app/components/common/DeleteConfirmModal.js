import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

class DeleteConfirmModal extends Component {

    render() {
        var defaultStyles = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999999,
                overflow: 'hidden',
                perspective: 1300,
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
            },

            content: {
                position: 'relative',
                margin: '15% auto',
                width: '30%',
                border: '0px',
                background: '#fff',
                overflow: 'auto',
                borderRadius: '4px',
                outline: 'none',
                boxShadow: '0 5px 10px rgba(0, 0, 0, .3)'
            }
        };
        return (
            <Modal onRequestClose={true}
                effect={Effect.ScaleUp} style={defaultStyles}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" aria-label="Close" onClick={ModalManager.close}><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                        <p>Do you want to delete this item permanently?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={ModalManager.close}>Cancel</button>
                        <button type="submit" className="btn btn-danger" onClick={() => { this.props.onConfirm(); ModalManager.close(); }}>Confirm</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default DeleteConfirmModal;