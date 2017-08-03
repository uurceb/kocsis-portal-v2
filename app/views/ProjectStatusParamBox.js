import React, { Component } from 'react';

import AddNewButton from '../components/common/AddNewButton'
import ParamBoxRow from '../components/common/ParamBoxRow'
import Constants from '../constants'

const url = Constants.serviceUrl + 'projectstatus';

class ProjectStatusParamBox extends Component {
    constructor(props) {
        super(props);
        this.state = { newStatus: '', projectStatus: [] };
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
                _this.setState({ projectStatus: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    onDataChange(value) {
        this.setState({ newStatus: value });
    }
    addStatus() {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                statusName: this.state.newStatus
            })
        }).then(() => {
            this.setState({ newStatus: '' });
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
                <h2>Project Status </h2>
                <small>webapp, service etc..</small>
                <ul className="todo-list m-t">
                    {
                        this.state.projectStatus.map((status, index) => <li key={index}>
                            <ParamBoxRow paramId={status._id} url={url}>{status.statusName}</ParamBoxRow>

                        </li>)
                    }
                    <li><div className="row"><input className="form-control" type="textfield" id="newStatus" value={this.state.newStatus} onChange={(e) => this.onDataChange(e.target.value)} /></div></li>
                </ul>
                <div>
                    
                    <span className="pull-right" style={{ marginTop: '4px' }}>
                        <AddNewButton label="Add" onClick={() => this.addStatus()} />
                    </span>
                </div>
            </div>
        );
    }
}

export default ProjectStatusParamBox;