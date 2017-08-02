import React, { Component } from 'react';
import FormModal from '../components/common/FormModal'
import { ModalManager } from 'react-dynamic-modal';
import CategoryDropdownList from '../components/common/CategoryDropdownList'

class ProjectAddModal extends Component {
    constructor(props) {
        super(props);
        this.state = { formData: { projectName: '', categoryId: '', customer: '', description: '' } }
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
                _category: this.state.formData.categoryId,
                projectName: this.state.formData.projectName,
                customer: this.state.formData.customer,
                projectPhase: this.state.formData.projectPhase,
                description: this.state.formData.description
            })
        }).then(() => {
            ModalManager.close();
        }).catch((e) => {
            console.log(e);
        });;
    }
    render() {
        const { formData } = this.state;

        return (
            <FormModal title="Add Project" onSubmit={() => this.onSubmit()} >
                <div className="row">
                    <div className="col-md-3 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="categoryId">Category</label>
                        <CategoryDropdownList onChange={(value) => this.onDataChange("categoryId", value)} />
                    </div>
                    <div className="col-md-5 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="projectName">Project Name</label>
                        <input className="form-control" type="textfield" value={formData.projectName} id="projectName" onChange={(e) => this.onDataChange("projectName", e.target.value)} />
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                        <label htmlFor="customer">Customer</label>
                        <input className="form-control" type="textfield" id="customer" value={formData.customer} onChange={(e) => this.onDataChange("customer", e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" rows="3" value={formData.description} onChange={(e) => this.onDataChange("description", e.target.value)}></textarea>
                </div>
            </FormModal>
        );
    }
}

export default ProjectAddModal;