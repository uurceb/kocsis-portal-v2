import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

class FormModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal onRequestClose={true}
                effect={Effect.ScaleUp}>
                <div className="ibox">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ModalManager.close}><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
                    </div>
                    <div className="ibox-content">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={ModalManager.close}>Close</button>
                        <button type="submit" className="btn btn-primary" onClick={() => {this.props.onSubmit()}}>Save changes</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default FormModal;