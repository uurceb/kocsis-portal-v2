import React, { Component } from 'react';
import PageView from '../components/common/PageView'
import Constants from '../constants'
import DataTable from "../components/common/DataTable"
const url = Constants.serviceUrl;
import InventoryItemsList from './InventoryItemsList'
class ProjectDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = { _id: props.params.projectId, projectData: {}, projectPhase: {}, estFactors: [], inventoryItems: [], sum: 0 }
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
        this.loadPhaseData();
        this.loadEstFactorData();
        this.loadInventoryData();
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
            <PageView title={projectData.projectName}>
                <div className="ibox">
                    <div className="ibox-content">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="m-b-md">
                                    <a href="#" className="btn btn-white btn-xs pull-right">Edit project</a>
                                    <h2>{projectData.projectName}</h2>
                                </div>
                                <dl className="dl-horizontal">
                                    <dt>Status:</dt> <dd><span className="label label-primary">Active</span></dd>
                                </dl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-5">
                                <dl className="dl-horizontal">

                                    <dt>Created by:</dt> <dd>Uğur Cebeci</dd>
                                    <dt>Comments:</dt> <dd>  162</dd>
                                    <dt>Client:</dt> <dd><a href="#" className="text-navy"> {projectData.customer}</a> </dd>
                                    <dt>Version:</dt> <dd> 	v1.4.2 </dd>
                                </dl>
                            </div>
                            <div className="col-lg-7" id="cluster_info">
                                <dl className="dl-horizontal" >

                                    <dt>Last Updated:</dt> <dd>16.08.2014 12:15:57</dd>
                                    <dt>Created:</dt> <dd> 	10.07.2014 23:36:57 </dd>
                                    <dt>Participants:</dt>
                                    <dd className="project-people">
                                        <a href=""><img alt="image" className="img-circle" src="img/a3.jpg" /></a>
                                        <a href=""><img alt="image" className="img-circle" src="img/a1.jpg" /></a>
                                        <a href=""><img alt="image" className="img-circle" src="img/a2.jpg" /></a>
                                        <a href=""><img alt="image" className="img-circle" src="img/a4.jpg" /></a>
                                        <a href=""><img alt="image" className="img-circle" src="img/a5.jpg" /></a>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <dl className="dl-horizontal">
                                    <dt>Completed:</dt>
                                    <dd>
                                        <div className="progress progress-striped active m-b-sm">
                                            <div style={{ width: "60%" }} className="progress-bar"></div>
                                        </div>
                                        <small>Project completed in <strong>60%</strong>. Remaining close the project, sign a contract and invoice.</small>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="row m-t-sm">
                            <div className="col-lg-12">
                                <div className="panel blank-panel">
                                    <div className="panel-heading">
                                        <div className="panel-options">
                                            <ul className="nav nav-tabs">
                                                <li className="active"><a href="#tab-1" data-toggle="tab">Users messages</a></li>
                                                <li className=""><a href="#tab-2" data-toggle="tab" >Phase Details</a></li>
                                                <li className=""><a href="#tab-3" data-toggle="tab" >Estimating Factors</a></li>
                                                <li className=""><a href="#tab-4" data-toggle="tab" >Inventory</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="panel-body">

                                        <div className="tab-content">
                                            <div className="tab-pane active" id="tab-1">
                                                <div className="feed-activity-list">
                                                    <div className="feed-element">
                                                        <a href="#" className="pull-left">
                                                            <img alt="image" className="img-circle" src="img/a2.jpg" />
                                                        </a>
                                                        <div className="media-body ">
                                                            <small className="pull-right">2h ago</small>
                                                            <strong>Mark Johnson</strong> posted message on <strong>Monica Smith</strong> site. <br />
                                                            <small className="text-muted">Today 2:10 pm - 12.06.2014</small>
                                                            <div className="well">
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                                    Over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                                </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="tab-pane" id="tab-2">

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
                                            <div className="tab-pane" id="tab-3">

                                                <DataTable data={estFactors} objKeys={efObjectKeys} colProps={efColProps} disableButtons={true} />

                                            </div>
                                            <div className="tab-pane" id="tab-4">
                                                <InventoryItemsList data={inventoryItems} colProps={inColProps} phaseData={projectPhase}/>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div></PageView>
        );
    }
}

export default ProjectDetailView;