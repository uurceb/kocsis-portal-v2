import React, { Component } from 'react';
import ViewModal from './ViewModal'
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import ProjectViewModal from '../../views/ProjectViewModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import { Link } from 'react-router';

class RowButtonsCell extends Component {
    constructor(props) {
        super(props);
        this.state = { itemData: [] }
    }
    delete() {
        fetch(this.props.url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: this.props.id,
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
    openViewModal() {
        if (this.props.screenName == "ProjectsView")
            ModalManager.open(
                <ProjectViewModal id={this.props.id} />);
    }
    render() {
        return (<td>
            {
                (this.props.screenName == "ProjectsView") &&
                <Link to={"/project/" + this.props.id}><a className="btn btn-xs" ><i className="fa fa-folder">View</i></a></Link>
            }

            {
                false && <a href="#" className="btn btn-xs"><i className="fa fa-pencil"></i> Edit </a>
            }
            <a className="btn btn-xs" onClick={() => this.onDelete()}><i className="fa fa-trash-o" ></i> Delete </a>
        </td>
        );
    }
}

export default RowButtonsCell;