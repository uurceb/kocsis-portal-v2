import React, { Component } from 'react';

import AddNewButton from '../components/common/AddNewButton'

import Constants from '../constants'

const url = Constants.serviceUrl + 'categories';

class ComplexityParamBox extends Component {
    constructor(props) {
        super(props);
        this.state = { newCat: '', projectCategories: [] };
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
                _this.setState({ projectCategories: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    onDataChange(value) {
        this.setState({ newCat: value });
    }
    addCategory() {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoryName: this.state.newCat
            })
        }).then(() => {
            this.setState({ newCat: '' });
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
                <h2>Project Categories </h2>
                <small>webapp, service etc..</small>
                <ul className="todo-list m-t">
                    {
                        this.state.projectCategories.map((category, index) => <li key={index}>
                            <span className="m-l-xs">{category.categoryName}</span>
                        </li>)
                    }
                </ul>
                <div>
                    <input className="form-control" type="textfield" id="newCategory" value={this.state.newCat} onChange={(e) => this.onDataChange(e.target.value)} />
                    <span className="pull-right" style={{ marginTop: '4px' }}>
                        <AddNewButton label="Add" onClick={() => this.addCategory()} />
                    </span>
                </div>
            </div>
        );
    }
}

export default ComplexityParamBox;