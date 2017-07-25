import React, { Component } from 'react';

import AddNewButton from '../components/common/AddNewButton'

import Constants from '../constants'

const url = Constants.serviceUrl + 'complexities';

class ComplexityParamBox extends Component {
    constructor(props) {
        super(props);
        this.state = { newComp: '', complexities: [] };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
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
    onDataChange(value) {
        this.setState({ newComp: value });
    }
    addComplexity() {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                compName: this.state.newComp
            })
        }).then(() => {
            this.setState({ newComp: '' });
        }).catch((e) => {
            console.log(e);
        });;
    }
    componentDidMount() {

        this.loadDataFromServer();
        this.loadInterval = setInterval(this.loadDataFromServer, 2000);
    }
    componentWillUnmount() {
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
    }
    render() {
        return (
            <div className="ibox-content">
                <h2>Complexities </h2>
                <small>simple, complex etc..</small>
                <ul className="todo-list m-t">
                    {
                        this.state.complexities.map((complexity, index) => <li key={index}>
                            <span className="m-l-xs">{complexity.compName}</span>
                        </li>)
                    }
                </ul>
                <div>
                    <input className="form-control" type="textfield" id="newComplexity" value={this.state.newComp} onChange={(e) => this.onDataChange(e.target.value)} />
                    <span className="pull-right" style={{ marginTop: '4px' }}>
                        <AddNewButton label="Add" onClick={() => this.addComplexity()} />
                    </span>
                </div>
            </div>
        );
    }
}

export default ComplexityParamBox;