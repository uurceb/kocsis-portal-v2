import React, { Component } from 'react';
import FormModal from '../components/common/FormModal'
import ProjectDropdownList from '../components/common/ProjectDropdownList'
import EstFactorDropdownList from '../components/common/EstFactorDropdownList'

import { ModalManager } from 'react-dynamic-modal';

class InventoryItemAddModal extends Component {
    constructor(props) {
        super(props);
        this.state = { formData: { project: {}, estfactorId: '', shortDescription: '', remarks: '', inOutScope: '' } }
    }
    onDataChange(key, value) {
        let _formData = this.state.formData;
        _formData[key] = value;
        this.setState({ formData: _formData });
    }
    onSubmit() {
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
        });;
    }
    render() {
        const { formData } = this.state;
        return (
            <FormModal id={this.props.modalId} title="Add Inventory Item" onSubmit={() => this.onSubmit()} >
                <div className="row">
                    <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="projectName">Project</label>
                        <ProjectDropdownList onChange={(value) => this.onDataChange("project", value)} />
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="estimationFactor">Estimation Factor  </label>
                        <EstFactorDropdownList categoryId={formData.project._category ? formData.project._category._id : null} onChange={(value) => this.onDataChange("estfactorId", value)} />
                    </div>
                    <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="inOutScope">In/Out of Scope</label>
                        <select className="form-control" id="inOutScope" onChange={(e) => this.onDataChange("inOutScope", e.target.value)}>
                            <option value={0}>*</option>
                            <option value="In" >In</option>
                            <option value="Out" >Out</option>
                        </select>
                    </div>
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