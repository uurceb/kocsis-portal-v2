import React, { Component } from 'react';
import FormModal from '../components/common/FormModal'
import ProjectDropdownList from '../components/common/ProjectDropdownList'
import EstFactorDropdownList from '../components/common/EstFactorDropdownList'
import EstFactorSelectWizard from '../components/common/EstFactorSelectWizard'


import { ModalManager } from 'react-dynamic-modal';

class InventoryItemAddModal extends Component {
    constructor(props) {
        super(props);
        const { isCopied, isEdited, copiedObj } = this.props;
        this.state = {
            formData:
            {
                project: (isCopied || isEdited) ? copiedObj._project : {},
                estfactorId: (isCopied || isEdited) ? copiedObj._estfactor._id : '',
                shortDescription: (isCopied || isEdited) ? copiedObj.shortDescription : '',
                remarks: (isCopied || isEdited) ? copiedObj.remarks : '',
                inOutScope: (isCopied || isEdited) ? copiedObj.inOutScope : 'In'
            }
        }
    }
    onDataChange(key, value) {
        let _formData = this.state.formData;
        _formData[key] = value;
        this.setState({ formData: _formData });
    }
    onSubmit() {
        if (this.props.isEdited)
            fetch(this.props.url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id:this.props.copiedObj._id,
                    _project: this.state.formData.project._id,
                    _estfactor: this.state.formData.estfactorId,
                    shortDescription: this.state.formData.shortDescription,
                    remarks: this.state.formData.remarks,
                    inOutScope: this.state.formData.inOutScope
                })
            }).then(function () {
                ModalManager.close();
            }).catch(function () {
                console.log("errore");
            });
        else
            fetch(this.props.url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _project: this.state.formData.project._id,
                    _estfactor: this.state.formData.estfactorId,
                    shortDescription: this.state.formData.shortDescription,
                    remarks: this.state.formData.remarks,
                    inOutScope: this.state.formData.inOutScope
                })
            }).then(function () {
                ModalManager.close();
            }).catch(function () {
                console.log("errore");
            });
    }
    render() {
        const { formData } = this.state;
        return (
            <FormModal id={this.props.modalId} title={(this.props.isCopied ? "Copy " : this.props.isEdited ? "Edit " : "Add ") + "Inventory Item"} onSubmit={() => this.onSubmit()} >
                <div className="row">
                    <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="projectName">Project</label>
                        <ProjectDropdownList defaultValue={formData.project} onChange={(value) => this.onDataChange("project", value)} />
                    </div>
                    <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="inOutScope">In/Out of Scope</label>
                        <select className="form-control" id="inOutScope" onChange={(e) => this.onDataChange("inOutScope", e.target.value)} value={formData.inOutScopes}>
                            <option value="In" >In</option>
                            <option value="Out" >Out</option>
                        </select>
                    </div></div>
                <div className="row" style={{ paddingLeft: '15px' }}>
                    {formData.project._id && formData.project._id != '' && formData.project._id != '*' ? <div className="col-md-10 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="estimationFactor">Estimation Factor </label>
                        <EstFactorSelectWizard categoryId={formData.project._category ? formData.project._category._id : null} onChange={(value) => this.onDataChange("estfactorId", value)} defaultValue={formData.estfactorId} />
                    </div> : <p>choose project</p>}
                </div>

                <div className="row">
                    <div className="col-md-10 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="shortDescription">Short Description</label>
                        <textarea className="form-control" id="shortDescription" rows="3" value={formData.shortDescription} onChange={(e) => this.onDataChange("shortDescription", e.target.value)}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="remarks">Remarks</label>
                        <textarea className="form-control" id="remarks" rows="3" value={formData.remarks} onChange={(e) => this.onDataChange("remarks", e.target.value)}></textarea>
                    </div>
                </div>
            </FormModal>
        );
    }
}

export default InventoryItemAddModal;