import React, { Component } from 'react';
import PageView from '../components/common/PageView'
import Constants from '../constants'
import AddNewButton from '../components/common/AddNewButton'
import DataTable from "../components/common/DataTable"
import PhaseAddModal from './PhaseAddModal'
import { ModalManager } from 'react-dynamic-modal'

const colProps = [
    { colHeader: 'Project Name', colWidth: '10%', isColored: true, span: '1' },
    { colHeader: 'Analysis %', colWidth: '6%', isColored: true, color: 'bg-success', span: '6' },
    { colHeader: 'Design %', colWidth: '6%' },
    { colHeader: 'Dev %', colWidth: '6%' },
    { colHeader: 'Unit Test %', colWidth: '6%' },
    { colHeader: 'INT %', colWidth: '6%' },
    { colHeader: 'UAT %', colWidth: '6%' },
    { colHeader: 'Project Management %', colWidth: '10%', isColored: true, color: 'bg-danger', span: '1' },
    { colHeader: 'Sol. Arch. %', colWidth: '10%', isColored: true, color: 'bg-info', span: '1' },
    { colHeader: 'Code M. & Regr. %', colWidth: '10%', isColored: true, color: 'bg-warning', span: '1' }];

const objectKeys = [{ key: '_project', childKey: 'projectName' }, 'analysis', 'design', 'dev', 'unitTest', 'intTest', 'uat', 'pManagement', 'solArch', 'codeMergeReg'];
const url = Constants.serviceUrl + 'phases';


class PhasesView extends Component {
    constructor(props) {
        super(props);
        this.state = { phases: [] };
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
                _this.setState({ phases: responseJson });
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
            <PhaseAddModal url={url} onRequestClose={() => true} />);
    }
    render() {
        return (
            <PageView title="Phases">
                <div className="ibox">
                    <div className="ibox-title">
                        <div className="ibox-tools">
                            <AddNewButton onClick={() => this.openViewModal()} label="Define New Phase to a Project" />
                        </div></div>
                    <div className="ibox-content">
                        <DataTable data={this.state.phases} url={url} colProps={colProps} objKeys={objectKeys} isColored={false} />
                    </div></div>
            </PageView>
        );
    }
}

export default PhasesView;