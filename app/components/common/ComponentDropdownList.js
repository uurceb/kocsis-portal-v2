import React, { Component } from 'react';
import Constants from '../../constants'
const url = Constants.serviceUrl + 'components';


class ComponentDropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = { components: [] };
    }
    loadDataFromServer() {
        let _this = this;
        fetch(!_this.props.key ? url : url + '/getCompByCatId/' + _this.props.key, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ components: responseJson });
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
                    this.state.components.map((component, index) => <option value={component.compName} key={index}>{component.compName}</option>)
                }
            </select>
        );
    }
}

export default ComponentDropdownList;