import React, { Component } from 'react';
import Constants from '../../constants'
const url = Constants.serviceUrl + 'estimatingfactors';
var _url=url;

class EstFactorDropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = { estimationfactors: [] };
    }
    loadDataFromServer() {
        let _this = this;
        
        if (_this.props.projectId != null)
            _url = url + '/getEstFactorsByProjectId/' + _this.props.projectId;
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
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.loadDataFromServer();
    }
    onDataChange(value) {
        this.props.onChange(value);
    }
    render() {
        return (
            <select className="form-control" onChange={(e) => this.onDataChange(e.target.value)}>
                <option value={0}>*</option>
                {
                    this.state.estimationfactors.map((estimationfactor, index) =>
                        <option value={estimationfactor._id} key={index}>
                            {estimationfactor.newOrModified + ' ' + estimationfactor.complexity + ' ' + estimationfactor.component}
                        </option>)
                }
            </select>
        );
    }
}

export default EstFactorDropdownList;