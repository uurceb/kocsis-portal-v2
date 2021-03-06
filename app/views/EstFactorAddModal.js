import React, { Component } from 'react';
import FormModal from '../components/common/FormModal'
import CategoryDropdownList from '../components/common/CategoryDropdownList'
import ComponentDropdownList from '../components/common/ComponentDropdownList'
import ComplexityDropdownList from '../components/common/ComplexityDropdownList'

import { ModalManager } from 'react-dynamic-modal';

class EstFactorAddModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            formData: { categoryId: this.props.isCopied ? this.props.copiedObj._category._id : props.categoryId, 
                component: this.props.isCopied ? this.props.copiedObj.component : '', 
                complexity: this.props.isCopied ? this.props.copiedObj.complexity : '', 
                newOrModified: this.props.isCopied ? this.props.copiedObj.newOrModified : '', 
                value: this.props.isCopied ? this.props.copiedObj.value : '' } 
            }
    }
    onDataChange(key, value) {
        let _formData = this.state.formData;
        _formData[key] = value;
        this.setState({ formData: _formData });
    }
    onSubmit() {
        console.log('proje id' + this.state.formData.projectId);
        fetch(this.props.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _category: this.state.formData.categoryId,
                component: this.state.formData.component,
                complexity: this.state.formData.complexity,
                newOrModified: this.state.formData.newOrModified,
                value: this.state.formData.value
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
            <FormModal id={this.props.modalId} title={this.props.isCopied ? "Copy Estimating Factor" : "Add Estimating Factor"} onSubmit={() => this.onSubmit()} >
                <div className="row">
                    <div className="col-md-3 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="projectName">Category</label>
                        <CategoryDropdownList defaultValue={formData.categoryId} onChange={(value) => this.onDataChange("categoryId", value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="projectName">Component  </label>
                        <ComponentDropdownList categoryId={formData.categoryId} defaultValue={formData.component} onChange={(value) => this.onDataChange("component", value)} />
                    </div>
                    <div className="col-md-3 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="projectName">Complexity  </label>
                        <ComplexityDropdownList defaultValue={formData.complexity} onChange={(value) => this.onDataChange("complexity", value)} />
                    </div>
                    <div className="col-md-3 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="newOrModified">New/Modified</label>
                        <select className="form-control" value={this.state.formData.newOrModified} onChange={(e) => this.onDataChange("newOrModified", e.target.value)}>
                            <option value="*" >*</option>
                            <option value="New" >New</option>
                            <option value="Modified" >Modified</option>
                        </select>
                    </div>
                    <div className="col-md-3 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="value">Value</label>
                        <input className="form-control" type="textfield" value={formData.value} id="value" onChange={(e) => this.onDataChange("value", e.target.value)} />
                    </div>
                </div>
            </FormModal>
        );
    }
}

export default EstFactorAddModal;