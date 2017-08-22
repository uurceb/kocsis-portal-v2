import React, { Component } from 'react';
import ComponentDropdownList from './ComponentDropdownList'
import ComplexityDropdownList from './ComplexityDropdownList'
import Constants from '../../constants'
const url = Constants.serviceUrl + 'estimatingfactors';

class EstFactorSelectWizard extends Component {
    constructor(props) {
        super(props);
        this.state = { estimationfactors: [], formData: { component: '', complexity: '', newOrModified: '' }, value: 'not found' }
    }
    onDataChange(key, value) {
        let _formData = this.state.formData;
        _formData[key] = value;
        this.setState({ formData: _formData });
        var estfactor = this.state.estimationfactors
            .find((estimationfactor) => {
                return estimationfactor.complexity === _formData.complexity
                    && estimationfactor.component === _formData.component
                    && estimationfactor.newOrModified === _formData.newOrModified
            });
        this.setState({ value: estfactor ? estfactor.value : 'not found' });
        this.props.onChange(estfactor ? estfactor._id : '*');
    }
    loadDataFromServer(categoryId) {
        let _this = this;

        var _url = (categoryId == '0' || !categoryId) ? url : url + '/getEstFactorsByCatId/' + categoryId;
        fetch(_url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ estimationfactors: responseJson });
                if (_this.props.defaultValue != '' && _this.props.defaultValue != '*') {
                    var estfactor = this.state.estimationfactors
                        .find((estimationfactor) => {
                            return estimationfactor._id === _this.props.defaultValue
                        });
                    this.setState({
                        formData: {
                            component: estfactor.component,
                            complexity: estfactor.complexity,
                            newOrModified: estfactor.newOrModified
                        }, value: estfactor.value
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    componentDidMount() {
        this.loadDataFromServer(this.props.categoryId);
    }
    render() {
        const { component, complexity, newOrModified } = this.state.formData;
        const { value } = this.state;
        return (
            <div className="row" >
                <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                    <label htmlFor="projectName">Component  </label>
                    <ComponentDropdownList categoryId={this.props.categoryId} defaultValue={component} onChange={(value) => this.onDataChange("component", value)} />
                </div>
                <div className="col-md-3 col-sm-12 col-xs-12 form-group">
                    <label htmlFor="projectName">Complexity  </label>
                    <ComplexityDropdownList defaultValue={complexity} onChange={(value) => this.onDataChange("complexity", value)} />
                </div>
                <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                    <label htmlFor="newOrModified">New/Modified</label>
                    <select className="form-control" onChange={(e) => this.onDataChange("newOrModified", e.target.value)} value={newOrModified}>
                        <option value="*" >*</option>
                        <option value="New" >New</option>
                        <option value="Modified" >Modified</option>
                    </select>
                </div>
                <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                    <label htmlFor="value">Value</label>
                    <input className="form-control" type="textfield" id="value" value={this.state.value} />
                </div>

                <div className="col-md-1 col-sm-12 col-xs-12 form-group" ><label htmlFor="value">valid?</label>{this.state.value === 'not found' ? <i id="validIcon" className="fa fa-ban"></i> : <i id="validIcon" className="fa fa-check" ></i>}</div>


            </div>
        );
    }
}

export default EstFactorSelectWizard;