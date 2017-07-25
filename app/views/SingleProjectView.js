import React, { Component } from 'react';
import Constants from '../constants'
import DataTable from "../components/common/DataTable"
import PageView from '../components/common/PageView'

const url = Constants.serviceUrl;

class SingleProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = { _id: '596cb58f4600ac0b68feff99', projectData: {}, projectPhase: {}, estFactors: [], inventoryItems: [], sum: 0 }
        this.loadDataFromServer.bind(this);
        this.loadPhaseData.bind(this);
        this.loadEstFactorData.bind(this);
    }

    loadDataFromServer() {
        let _this = this;
        fetch(url + '/projects/' + _this.state._id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ projectData: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    loadPhaseData() {
        let _this = this;
        fetch(url + '/phases/getPhaseByProjectId/' + _this.state._id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ projectPhase: responseJson[0] });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    loadEstFactorData() {
        let _this = this;
        fetch(url + '/estimatingfactors/getEstFactorsByProjectId/' + _this.state._id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ estFactors: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    loadInventoryData() {
        let _this = this;
        var tempSum = 0;
        fetch(url + '/inventoryitems/getInventoryItemsByProjectId/' + _this.state._id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ inventoryItems: responseJson });
                _this.state.inventoryItems.map((inventoryItem) => tempSum = tempSum + inventoryItem._estfactor.value);
                _this.setState({ sum: tempSum });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    componentDidMount() {
        this.loadDataFromServer();
        //this.loadInterval = setInterval(this.loadDataFromServer, 2000);
    }
    render() {
        const { projectData, projectPhase, estFactors, inventoryItems } = this.state;
        var inventorySum = 0;
        const efColProps = [
            { colHeader: 'Component', colWidth: '25%' },
            { colHeader: 'Complexity', colWidth: '25%' },
            { colHeader: 'New/Modified', colWidth: '20%' },
            { colHeader: 'Value', colWidth: '10%' }]
        const efObjectKeys = ['component', 'complexity', 'newOrModified', 'value'];
        const inColProps = [
            { colHeader: 'Component', colWidth: '10%' },
            { colHeader: 'Short Description', colWidth: '25%' },
            { colHeader: 'Complexity', colWidth: '10%' },
            { colHeader: 'New/Modified', colWidth: '10%' },
            { colHeader: 'Remarks', colWidth: '25%' },
            { colHeader: 'In/Out of Scope', colWidth: '10%' },
            { colHeader: 'Value', colWidth: '10%' }];
        const inObjectKeys = [
            { key: '_estfactor', childKey: 'component' },
            'shortDescription',
            { key: '_estfactor', childKey: 'complexity' },
            { key: '_estfactor', childKey: 'newOrModified' },
            'remarks',
            'inOutScope',
            , { key: '_estfactor', childKey: 'value' }];



        return (
            <PageView title={this.state.projectData.projectName}>
                <div className="" role="tabpanel" data-example-id="togglable-tabs">
                    <ul id="myTab" className="nav nav-tabs bar_tabs responsive" role="tablist">
                        <li role="presentation" className="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">General Info</a>
                        </li>
                        <li role="presentation" className=""><a href="#tab_content2" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false" onClick={() => this.loadPhaseData()}>Project Phase</a>
                        </li>
                        <li role="presentation" className=""><a href="#tab_content3" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false" onClick={() => this.loadEstFactorData()}>Estimation Factors</a>
                        </li>
                        <li role="presentation" className=""><a href="#tab_content4" role="tab" id="profile-tab3" data-toggle="tab" aria-expanded="false" onClick={() => this.loadInventoryData()}>Inventory</a>
                        </li>
                    </ul>
                    <div id="myTabContent" className="tab-content">
                        <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                            
                            <div className="project_detail" style={{ margin: '25px' }}>
                                <p className="title">Customer</p>
                                <p>{projectData.customer}</p>
                                <p className="title">Description</p>
                                <p>{projectData.description}</p>
                            </div>
                        </div>
                        <div role="tabpanel" className="tab-pane fade" id="tab_content2" aria-labelledby="profile-tab">
                            <ul className="stats-overview">
                                <li>
                                    <span className="name"> Analysis % </span>
                                    <span className="value text-success"> {projectPhase.analysis} </span>
                                </li>
                                <li>
                                    <span className="name"> Design % </span>
                                    <span className="value text-success"> {projectPhase.design} </span>
                                </li>
                                <li className="hidden-phone">
                                    <span className="name"> Development % </span>
                                    <span className="value text-success"> {projectPhase.dev} </span>
                                </li>
                                <li>
                                    <span className="name"> Unit Test % </span>
                                    <span className="value text-success"> {projectPhase.unitTest} </span>
                                </li>
                                <li>
                                    <span className="name"> Int Test % </span>
                                    <span className="value text-success"> {projectPhase.intTest} </span>
                                </li>
                                <li className="hidden-phone">
                                    <span className="name"> UAT % </span>
                                    <span className="value text-success"> {projectPhase.uat} </span>
                                </li>
                            </ul>
                            <ul className="stats-overview">
                                <li>
                                    <span className="name"> Project Management % </span>
                                    <span className="value text-success"> {projectPhase.pManagement} </span>
                                </li>
                                <li>
                                    <span className="name"> Solution Architecture % </span>
                                    <span className="value text-success"> {projectPhase.solArch} </span>
                                </li>
                                <li className="hidden-phone">
                                    <span className="name"> Code Merge & Regression % </span>
                                    <span className="value text-success"> {projectPhase.codeMergeReg} </span>
                                </li>
                            </ul>
                        </div>
                        <div role="tabpanel" className="tab-pane fade" id="tab_content3" aria-labelledby="profile-tab">
                            <div style={{ marginLeft: '25px', marginRight: '25px' }}>
                                <DataTable data={estFactors} objKeys={efObjectKeys} colProps={efColProps} disableButtons={true} />
                            </div>
                        </div>
                        <div role="tabpanel" className="tab-pane fade" id="tab_content4" aria-labelledby="profile-tab">
                            <div className="row" style={{ marginLeft: '25px', marginRight: '25px' }}>
                                <DataTable data={inventoryItems} objKeys={inObjectKeys} colProps={inColProps} disableButtons={true} />
                                <div className="row">
                                    <div className="col-md-10 col-sm-12 col-xs-12 form-group"></div>
                                    <div className="col-md-2 col-sm-12 col-xs-12 form-group">
                                        <label htmlFor="totalValue">Total Value</label>
                                        <input type="textfield" className="form-control" id="totalValue" value={this.state.sum} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageView>
        );
    }
}

export default SingleProjectView;