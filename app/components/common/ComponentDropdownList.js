import React, { Component } from 'react';
import Constants from '../../constants'
const url = Constants.serviceUrl + 'components';


class ComponentDropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = { category: props.categoryId, components: [], selectedValue: this.props.defaultValue };
    }
    loadDataFromServer(categoryId) {
        let _this = this;
        fetch((categoryId == '0' || !categoryId) ? url : url + '/getCompByCatId/' + categoryId, {
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
        this.loadDataFromServer(this.props.categoryId);
    }
    componentWillReceiveProps(nextProp) {
        if (this.props.categoryId != nextProp.categoryId)
            this.loadDataFromServer(nextProp.categoryId);
    }
    onDataChange(value) {
        this.props.onChange(value);
        this.setState({ selectedValue: value });
    }
    render() {
        return (
            <select className="form-control" onChange={(e) => this.onDataChange(e.target.value)} value={this.state.selectedValue}>
                <option value="*">*</option>
                {
                    this.state.components.map((component, index) => <option value={component.compName} key={index}>{component.compName}</option>)
                }
            </select>
        );
    }
}

export default ComponentDropdownList;