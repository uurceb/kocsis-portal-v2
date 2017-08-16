import React, { Component } from 'react';
import PageView from '../components/common/PageView'
import EstFactorAddModal from './EstFactorAddModal'
import DataTable from "../components/common/DataTable"
import Constants from '../constants'
import AddNewButton from '../components/common/AddNewButton'
import { ModalManager } from 'react-dynamic-modal'
import CategoryDropdownList from '../components/common/CategoryDropdownList'
import EstFactorsList from './EstFactorsList'

const colProps = [
    { colHeader: 'Category', colWidth: '25%' },
    { colHeader: 'Component', colWidth: '20%' },
    { colHeader: 'Complexity', colWidth: '15%' },
    { colHeader: 'New/Modified', colWidth: '10%' },
    { colHeader: 'Value', colWidth: '10%' }]

const objectKeys = [{ key: '_category', childKey: 'categoryName' }, 'component', 'complexity', 'newOrModified', 'value'];
const url = Constants.serviceUrl + 'estimatingfactors';

class EstimatingFactorsView extends Component {
    constructor(props) {
        super(props);
        this.state = { categoryId: '*', data: [], itemCount: 15, pageNo: 1, pageCount: 0 };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.openViewModal = this.openViewModal.bind(this);
    }
    loadDataFromServer(categoryId = this.state.categoryId, pageNo) {
        let _this = this;
        let _url = '';

        _url = url + '/getEstFactorsByPageNo/' + categoryId + '&' + pageNo + '&' + this.state.itemCount;
        fetch(_url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ data: responseJson.data, pageCount: responseJson.pageCount });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    openViewModal() {
        ModalManager.open(
            <EstFactorAddModal url={url} categoryId={this.state.categoryId}/>);
    }
    componentDidMount() {
        this.loadDataFromServer(this.state.categoryId, 1);
        this.loadInterval = setInterval(() => this.loadDataFromServer(this.setState.categoryId, this.state.pageNo), 2000);
    }
    componentWillUnmount() {
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
    }

    onCategoryChange(categoryId) {
        this.loadDataFromServer(categoryId, 1);
        this.setState({ categoryId: categoryId });
        this.setState({ pageNo: 1 });
    }
    onPageChange(value) {
        this.loadDataFromServer(this.state.categoryId, value);
        this.setState({ pageNo: value });
    }
    render() {
        var options = [];
        for (var i = 1; i <= this.state.pageCount; i++) {
            options.push(<option key={i}>{i}</option>);
        }
        return (
            <PageView title="Estimating Factors">
                <div className="ibox">
                    <div className="ibox-title">
                        <div className="ibox-tools">
                            <div className="row">
                                <div className="col-md-2 col-sm-12 col-xs-12">
                                    <label className="pull-left">Category</label>
                                    <CategoryDropdownList onChange={(value) => this.onCategoryChange(value)} />
                                    <select onChange={(e) => this.onPageChange(e.target.value)} value={this.state.pageNo}>
                                        {options}
                                    </select>
                                </div>
                                <div className="col-md-10 col-sm-12 col-xs-12">
                                    <AddNewButton onClick={() => this.openViewModal()} label="Add New Estimating Factor" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="ibox-content">
                        <EstFactorsList data={this.state.data} url={url} colProps={colProps} objKeys={objectKeys} />
                    </div>
                </div>
            </PageView>
        );
    }
}

export default EstimatingFactorsView;