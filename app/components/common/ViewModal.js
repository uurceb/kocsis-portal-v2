import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

class ViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = { data: {} }
    }
    render() {

        const { onRequestClose } = this.props;
        return (
            <Modal onRequestClose={true}
                effect={Effect.ScaleUp}>
                <div className="modal-content" >
                    <div className="modal-header">
                        <button type="button" className="close" aria-label="Close" onClick={ModalManager.close}><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
                    </div>
                    <div className="modal-body">
                        {
                            this.props.children
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={ModalManager.close} >Close</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default ViewModal;