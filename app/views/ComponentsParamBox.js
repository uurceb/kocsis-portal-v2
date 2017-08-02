import React, { Component } from 'react';

import AddNewButton from '../components/common/AddNewButton'
import CategoryDropdownList from '../components/common/CategoryDropdownList'



import Constants from '../constants'

const url = Constants.serviceUrl + 'components';

class ComponentsParamBox extends Component {
    constructor(props) {
        super(props);
        this.state = { addDisable: false, category: '0', newComp: '', components: [] };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
    }
    loadDataFromServer() {
        let _this = this;
        fetch(_this.state.category == '0' ? url : url + '/getCompByCatId/' + _this.state.category, {
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
    onDataChange(value) {
        this.setState({ newComp: value });
    }
    addComponent() {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                compName: this.state.newComp,
                _category: this.state.category
            })
        }).then(() => {
            this.setState({ newComp: '' });
        }).catch((e) => {
            console.log(e);
        });;
    }
    changeCategory(cat) {
        
        this.setState({ category: cat, addDisable:cat==0?false:true});
        this.loadDataFromServer();
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
                <h2>Components </h2>
                <small>screen, service etc..</small>
                <CategoryDropdownList url={Constants.serviceUrl} onChange={(value) => this.changeCategory(value)} />
                <ul className="todo-list m-t">
                    {
                        this.state.components.map((component, index) => <li key={index}>
                            <span className="m-l-xs"> {component.compName} </span>
                        </li>)
                    }
                </ul>
                {
                    this.state.addDisable &&
                    <div>
                        <input className="form-control" type="textfield" id="newComponent" value={this.state.newComp} onChange={(e) => this.onDataChange(e.target.value)} />
                        <span className="pull-right" style={{ marginTop: '4px' }}>
                            <AddNewButton label="Add" onClick={() => this.addComponent()} />
                        </span>
                    </div>
                }

            </div>
        );
    }
}

export default ComponentsParamBox;