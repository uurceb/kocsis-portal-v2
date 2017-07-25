import React, { Component } from 'react';
import Constants from '../../constants'
const url = Constants.serviceUrl + 'complexities';


class ComplexityDropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = { complexities: []};
    }
    loadDataFromServer() {
        let _this = this;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ complexities: responseJson });
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
                    this.state.complexities.map((complexity, index) => <option value={complexity.compName} key={index}>{complexity.compName}</option>)
                }
            </select>
        );
    }
}

export default ComplexityDropdownList;