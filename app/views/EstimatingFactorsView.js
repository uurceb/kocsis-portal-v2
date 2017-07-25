import React, { Component } from 'react';
import Page from '../components/common/PageView'
import EstFactorAddModal from './EstFactorAddModal'
import DataTable from "../components/common/DataTable"
import Constants from '../constants'
import AddNewButton from '../components/common/AddNewButton'
import {ModalManager} from 'react-dynamic-modal'


const colProps = [
    { colHeader: 'Project Name', colWidth: '25%' },
    { colHeader: 'Component', colWidth: '20%' },
    { colHeader: 'Complexity', colWidth: '15%' },
    { colHeader: 'New/Modified', colWidth: '15%' },
    { colHeader: 'Value', colWidth: '5%' }]

const objectKeys = [{key:'_project',childKey:'projectName'}, 'component', 'complexity', 'newOrModified','value'];
const url = Constants.serviceUrl + 'estimatingfactors';

class EstimatingFactorsView extends Component {
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
    openViewModal(){
            ModalManager.open(
                <EstFactorAddModal  url={url} onRequestClose={() => true}/>);
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
            <Page title="Estimating Factors">
                <div className="col-md-6">
                    <span className="pull-left">
                        <AddNewButton onClick={()=>this.openViewModal()} label="Add New Estimating Factor"/>
                    </span>
                </div>
                <DataTable data={this.state.data} url={url} colProps={colProps} objKeys={objectKeys} />
            </Page>
        );
    }
}

export default EstimatingFactorsView;