import React, { Component } from 'react';
import RowButtonsCell from '../components/common/RowButtonsCell'
import ComponentDropdownList from '../components/common/ComponentDropdownList'
import ComplexityDropdownList from '../components/common/ComplexityDropdownList'
import Constants from '../constants'
const url = Constants.serviceUrl + '/estimatingfactors/';
import EstFactorAddModal from './EstFactorAddModal'
import { ModalManager } from 'react-dynamic-modal'


class EstFactorRow extends Component {
    constructor(props) {
        super(props);
        this.state = { estFactorId: this.props.row._id, estFactor: this.props.row, editMode: false, editedRow: this.props.row };
    }
    onRowDataEdited(key, value) {
        let _editedRow = this.state.editedRow;
        _editedRow[key] = value;
        this.setState({ editedRow: _editedRow });
    }

    onSaveChange() {
        let _this = this;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_this.state.editedRow)
        }).then(function () {
            console.log("estimating factor updated");
            _this.setState({ editMode: false });
        }).catch(function (err) {
            console.log(err);
        });
    }
    onCopy() {
        ModalManager.open(
            <EstFactorAddModal url={url} categoryId={this.state.categoryId} isCopied={true} copiedObj={this.props.row} />);
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
                            }</td>);
                        else if (objKey === "component") {
                            return (<td key={index}>{!this.state.editMode ? row[objKey] :
                                <ComponentDropdownList defaultValue={row[objKey]} categoryId={row._category._id} onChange={(value) => this.onRowDataEdited("component", value)} />}
                            </td>
                            )
                        }
                        else if (objKey === "complexity") {
                            return (<td key={index}>{!this.state.editMode ? row[objKey] :
                                <ComplexityDropdownList defaultValue={row[objKey]} onChange={(value) => this.onRowDataEdited("complexity", value)} />}
                            </td>
                            )
                        }
                        else if (objKey === "newOrModified") {
                            return (<td key={index}>{!this.state.editMode ? row[objKey] :
                                <select className="form-control" onChange={(e) => this.onRowDataEdited("newOrModified", e.target.value)} value={this.state.editedRow.newOrModified}>
                                    <option value="*">*</option>
                                    <option value="New" >New</option>
                                    <option value="Modified" >Modified</option>
                                </select>}
                            </td>
                            )
                        }
                        else if (objKey === "value") {
                            return (<td key={index}>{
                                !this.state.editMode ? row[objKey]
                                    : <input className="form-control" type="textfield" value={this.state.editedRow.value} onChange={(e) => this.onRowDataEdited("value", e.target.value)}></input>
                            }</td>);
                        }
                        else
                            return (<td key={index}>{
                                row[objKey]
                            }</td>);
                    })
                }

                <td> {
                    this.state.editMode &&
                    <button className="btn btn-white btn-sm" onClick={() => this.onSaveChange()}>
                        <i className="fa fa-save" ></i>Save</button>
                }</td>
                <td>
                    <button className="btn btn-white btn-sm" onClick={() => this.onCopy()}><i className="fa fa-copy" ></i>Copy</button>
                </td>
                <td>
                    {
                        !this.state.editMode ?
                            <button style={{ float: 'left' }} className="btn btn-white btn-sm" onClick={() => this.setState({ editMode: true })}>
                                <i className="fa fa-edit" ></i>Edit</button>
                            : <button className="btn btn-white btn-sm" onClick={() => this.setState({ editMode: false })}>Cancel</button>}
                </td>


                {!this.props.disableButtons &&
                    <RowButtonsCell id={row._id} url={this.props.url} screenName={this.props.screenName} />}
            </tr>
        );
    }
}

export default EstFactorRow;