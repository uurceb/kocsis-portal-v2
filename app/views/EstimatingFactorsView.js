import React, { Component } from 'react';
import PageView from '../components/common/PageView'
import EstFactorAddModal from './EstFactorAddModal'
import DataTable from "../components/common/DataTable"
import Constants from '../constants'
import AddNewButton from '../components/common/AddNewButton'
import { ModalManager } from 'react-dynamic-modal'
import CategoryDropdownList from '../components/common/CategoryDropdownList'


const colProps = [
    { colHeader: 'Category', colWidth: '25%' },
    { colHeader: 'Component', colWidth: '20%' },
    { colHeader: 'Complexity', colWidth: '15%' },
    { colHeader: 'New/Modified', colWidth: '15%' },
    { colHeader: 'Value', colWidth: '5%' }]

const objectKeys = [{ key: '_category', childKey: 'categoryName' }, 'component', 'complexity', 'newOrModified', 'value'];
const url = Constants.serviceUrl + 'estimatingfactors';

class EstimatingFactorsView extends Component {
    constructor(props) {
        super(props);
        this.state = { categoryId: '', data: [] };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
    }
    loadDataFromServer() {
        let _this = this;
        let _url = '';
        if (this.state.categoryId && this.state.categoryId != '' && this.state.categoryId != '*')
            _url = url + '/getEstFactorsByCatId/' + this.state.categoryId;
        else
            _url = url;
        fetch(_url, {
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
            <EstFactorAddModal url={url} onRequestClose={() => true} />);
    }
    componentDidMount() {
        this.loadDataFromServer();
        this.loadInterval = setInterval(this.loadDataFromServer, 2000);
    }
    componentWillUnmount() {
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
    }

    onCategoryChange(categoryId) {
        this.setState({ categoryId: categoryId });
    }
    render() {
        return (
            <PageView title="Estimating Factors">
                <div className="ibox">
                    <div className="ibox-title">
                        <div className="ibox-tools">
                            <div className="row">
                                <div className="col-md-2 col-sm-12 col-xs-12">
                                    <label className="pull-left">Category</label>
                                    <CategoryDropdownList onChange={(value) => this.onCategoryChange(value)} />
                                </div>
                                <div className="col-md-10 col-sm-12 col-xs-12">
                                    <AddNewButton onClick={() => this.openViewModal()} label="Add New Estimating Factor" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="ibox-content">
                        <DataTable data={this.state.data} url={url} colProps={colProps} objKeys={objectKeys} />
                    </div>
                </div>
            </PageView>
        );
    }
}

export default EstimatingFactorsView;