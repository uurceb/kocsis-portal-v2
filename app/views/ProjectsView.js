import React, { Component } from 'react';
import PageView from '../components/common/PageView'
import DataTable from '../components/common/DataTable'
import AddNewButton from '../components/common/AddNewButton'
import Constants from '../constants'
import { ModalManager } from 'react-dynamic-modal'
import ProjectAddModal from './ProjectAddModal'
import ProjectsList from './ProjectsList'

const colProps = [
    { colHeader: 'Project Status', colWidth: '10%' },
    { colHeader: 'Project Name', colWidth: '20%' },
    { colHeader: 'Customer', colWidth: '15%' },
    { colHeader: 'Description', colWidth: '25%' },
    { colHeader: 'Progress', colWidth: '15%' },
    { colHeader: '', colWidth: '20%' }];

const objectKeys = ['projectName', 'customer', 'description'];
const url = Constants.serviceUrl + 'projects';

class ProjectsView extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
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
                _this.setState({ data: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.loadDataFromServer();
        this.loadInterval = setInterval(this.loadDataFromServer, 2000);
    }
    componentWillUnmount() {
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
    }
    openViewModal() {
        ModalManager.open(
            <ProjectAddModal url={url} onRequestClose={() => true} />);
    }
    render() {
        return (
            <PageView title="Projects">
                <div className="ibox">
                    <div className="ibox-title">
                        <div className="ibox-tools">
                            <AddNewButton onClick={() => this.openViewModal()} label="Add New Project" />
                        </div>
                    </div>
                    <div className="ibox-content">
                        <ProjectsList data={this.state.data} colProps={colProps} />
                    </div>
                </div>
            </PageView>
        )
    }

}

export default ProjectsView