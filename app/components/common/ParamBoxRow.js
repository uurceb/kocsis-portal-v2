import React, { Component } from 'react';
import { ModalManager } from 'react-dynamic-modal';
import DeleteConfirmModal from './DeleteConfirmModal'

class ParamBoxRow extends Component {
    constructor(props) {
        super(props);
    }
    delete() {
        fetch(this.props.url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: this.props.paramId,
            })
        }).then(function () {
            console.log("oke delete");
        }).catch(function () {
            console.log("errore");
        });;
    }
    onDelete() {
        ModalManager.open(
            <DeleteConfirmModal onConfirm={() => this.delete()} />);
    }
    render() {
        return (
            <span className="m-l-xs">{this.props.children}<span className="pull-right"><a style={{color:'gray'}} onClick={() => this.onDelete()}><i className="fa fa-times"></i></a></span></span>
        );
    }
}

export default ParamBoxRow;