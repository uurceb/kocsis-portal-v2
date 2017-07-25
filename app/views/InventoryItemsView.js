import React, { Component } from 'react';
import PageView from '../components/common/PageView'
import InventoryItemAddModal from './InventoryItemAddModal'
import DataTable from "../components/common/DataTable"
import Constants from '../constants'
import AddNewButton from '../components/common/AddNewButton'
import { ModalManager } from 'react-dynamic-modal'


const colProps = [
    { colHeader: 'Project Name', colWidth: '10%' },
    { colHeader: 'Component', colWidth: '10%' },
    { colHeader: 'Short Description', colWidth: '10%' },
    { colHeader: 'Complexity', colWidth: '10%' },
    { colHeader: 'New/Modified', colWidth: '10%' },
    { colHeader: 'Remarks', colWidth: '10%' },
    { colHeader: 'In/Out of Scope', colWidth: '10%' },
    { colHeader: 'Value', colWidth: '10%' }]

const objectKeys = [
    { key: '_project', childKey: 'projectName' },
    { key: '_estfactor', childKey: 'component' },
    'shortDescription',
    { key: '_estfactor', childKey: 'complexity' },
    { key: '_estfactor', childKey: 'newOrModified' }, 
    'remarks',
    'inOutScope',
    , { key: '_estfactor', childKey: 'value' }];
const url = Constants.serviceUrl + 'inventoryItems';

class InventoriesView extends Component {
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
    openViewModal() {
        ModalManager.open(
            <InventoryItemAddModal url={url} onRequestClose={() => true} />);
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
            <PageView title="Inventory Items">
                <div className="col-md-6">
                    <span className="pull-left">
                        <AddNewButton onClick={() => this.openViewModal()} label="Add New Inventory Item" />
                    </span>
                </div>
                <DataTable data={this.state.data} url={url} colProps={colProps} objKeys={objectKeys} />
            </PageView>
        );
    }
}

export default InventoriesView;