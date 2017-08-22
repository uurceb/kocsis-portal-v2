import React, { Component } from 'react';
import RowButtonsCell from '../components/common/RowButtonsCell'
import ComponentDropdownList from '../components/common/ComponentDropdownList'
import ComplexityDropdownList from '../components/common/ComplexityDropdownList'
import Constants from '../constants'
const url = Constants.serviceUrl + '/inventoryitems/';
import InventoryItemAddModal from './InventoryItemAddModal'
import { ModalManager } from 'react-dynamic-modal'


class InventoryItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = { inventoryItemId: this.props.row._id, inventoryItem: this.props.row, editedRow: this.props.row };
    }
    onRowDataEdited(key, value) {
        let _editedRow = this.state.editedRow;
        _editedRow[key] = value;
        this.setState({ editedRow: _editedRow });
    }
    onCopy() {
        ModalManager.open(
            <InventoryItemAddModal url={url} categoryId={this.state.categoryId} isCopied={true} copiedObj={this.props.row} />);
    }
    onEdit() {
        ModalManager.open(
            <InventoryItemAddModal url={url} categoryId={this.state.categoryId} isEdited={true} copiedObj={this.props.row} />);
    }
    render() {
        const { objKeys, row } = this.props;
        return (
            <tr >
                {
                    objKeys.map((objKey, index) => {
                        if (typeof objKey === 'object')
                            return (<td key={index}>{
                                row[objKey['key']] ? row[objKey['key']][objKey['childKey']] : 'unknown'
                            }</td>)
                        else
                            return (<td key={index}>{
                                row[objKey]
                            }</td>);
                    })
                }
                <td>
                    <button style={{ float: 'left' }} className="btn btn-white btn-sm" onClick={() => this.onEdit()}>
                        <i className="fa fa-edit" ></i>Edit</button>
                </td>
                <td>
                    <button className="btn btn-white btn-sm" onClick={() => this.onCopy()}><i className="fa fa-copy" ></i>Copy</button>
                </td>
                {!this.props.disableButtons &&
                    <RowButtonsCell id={row._id} url={this.props.url} screenName={this.props.screenName} />}
            </tr>
        );
    }
}

export default InventoryItemRow;