import React, { Component } from 'react';
import FormModal from '../components/common/FormModal'
import ProjectDropdownList from '../components/common/ProjectDropdownList'
import { ModalManager } from 'react-dynamic-modal';

class PhaseAddModal extends Component {
    constructor(props) {
        super(props);
        this.state = { formData: { project: {}, analysis: '10', design: '15', dev: '45', unitTest: '15', intTest: '10', uat: '5', pManagement: '10', solArch: '0', codeMergeReg: '0' } }
        
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
                pManagement: this.state.formData.pManagement,
                analysis: this.state.formData.analysis,
                design: this.state.formData.design,
                dev: this.state.formData.dev,
                unitTest: this.state.formData.unitTest,
                intTest: this.state.formData.intTest,
                uat: this.state.formData.uat,
                solArch: this.state.formData.solArch,
                codeMergeReg: this.state.formData.codeMergeReg
            })
        }).then(function () {
            ModalManager.close();
        }).catch(function (err) {
            console.log(err);
        });;
    }
    render() {
        const { formData } = this.state;
        return (
            <FormModal id={this.props.modalId} title="Add Phase" onSubmit={() => this.onSubmit()} >
                <div className="row">
                    <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="projectName">Project</label>
                        <ProjectDropdownList onChange={(value) => this.onDataChange("project", value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="analysis">Analysis %</label>
                        <input className="form-control" type="textfield" id="analysis" onChange={(e) => this.onDataChange("analysis", e.target.value)} value={formData.analysis} />
                    </div>
                    <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="design">Design %</label>
                        <input className="form-control" type="textfield" id="design" onChange={(e) => this.onDataChange("design", e.target.value)} value={formData.design} />
                    </div>
                    <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="dev">Dev %</label>
                        <input className="form-control" type="textfield" id="dev" onChange={(e) => this.onDataChange("dev", e.target.value)} value={formData.dev} />
                    </div>
                    <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="unitTest">Unit Test %</label>
                        <input className="form-control" type="textfield" id="unitTest" onChange={(e) => this.onDataChange("unitTest", e.target.value)} value={formData.unitTest} />
                    </div>
                    <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="intTest">Int Test %</label>
                        <input className="form-control" type="textfield" id="intTest" onChange={(e) => this.onDataChange("intTest", e.target.value)} value={formData.intTest} />
                    </div>
                    <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="uat">UAT %</label>
                        <input className="form-control" type="textfield" id="uat" onChange={(e) => this.onDataChange("uat", e.target.value)} value={formData.uat} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="pManagement">Project Management %</label>
                        <input className="form-control" type="textfield" id="pManagement" onChange={(e) => this.onDataChange("pManagement", e.target.value)} value={formData.pManagement} />
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="solArch">Solution Architecture %</label>
                        <input className="form-control" type="textfield" id="solArch" onChange={(e) => this.onDataChange("solArch", e.target.value)} value={formData.solArch} />
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="codeMergeReg">Code Merge & Regression %</label>
                        <input className="form-control" type="textfield" id="codeMergeReg" onChange={(e) => this.onDataChange("codeMergeReg", e.target.value)} value={formData.codeMergeReg} />
                    </div>
                </div>
            </FormModal>
        );
    }
}

export default PhaseAddModal;