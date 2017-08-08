import React, { Component } from 'react';
import Constants from '../../constants'
const url = Constants.serviceUrl + 'projectstatus';


class StatusDropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = { status: [] };
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
                _this.setState({ status: responseJson });
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
                    this.state.status.map((state, index) => <option value={state._id} key={index}>{state.statusName}</option>)
                }
            </select>
        );
    }
}

export default StatusDropdownList;