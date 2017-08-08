import React, { Component } from 'react';
import PageView from '../components/common/PageView'
import Constants from '../constants'
import DataTable from '../components/common/DataTable'
import StatusDropdownList from '../components/common/StatusDropdownList'
const url = Constants.serviceUrl;
import InventoryItemsList from './InventoryItemsList'

class ProjectDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = { _id: props.params.projectId, projectData: {}, projectPhase: {}, estFactors: [], inventoryItems: [], sum: 0, updatedProject: {}, formData: { changeStatus: false } }
        this.loadDataFromServer.bind(this);
        this.loadPhaseData.bind(this);
        this.loadEstFactorData.bind(this);
        this.onSaveChange.bind(this);
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
                this.loadPhaseData();
                this.loadEstFactorData();
                this.loadInventoryData();
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
        const { projectData } = _this.state;
        fetch(url + '/estimatingfactors/getEstFactorsByCatId/' + projectData._category._id, {
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
                this.setState({ updatedProject: Object.assign({}, this.state.projectData) });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    componentDidMount() {
        this.loadDataFromServer();
        //this.loadInterval = setInterval(this.loadDataFromServer, 2000);
    }
    onProjectDataChange(key, value) {
        let _updatedProject = this.state.updatedProject;
        _updatedProject[key] = value;
        this.setState({ updatedProject: _updatedProject });
    }
    onDataChange(key, value) {
        let _formData = this.state.formData;
        _formData[key] = value;
        this.setState({ formData: _formData });
    }
    onSaveChange() {
        let _this = this;
        fetch(url+ '/projects/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_this.state.updatedProject)
        }).then(function () {
            console.log("project updated");
            _this.setState({ updatedProject: {},formData:{changeStatus:false} });
            _this.loadDataFromServer();
        }).catch(function (err) {
            console.log(err);
        });
    }
    render() {
        const { projectData, projectPhase, estFactors, inventoryItems, sum } = this.state;
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

        const { formData } = this.state;
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
                                    <div className="row">
                                        <div className="col-md-4 col-sm-12 col-xs-12">
                                            <dt>Status:</dt> {!formData.changeStatus ?
                                                <dd><span className="label label-primary">{projectData._status ? projectData._status.statusName : 'No status'}</span><small style={{marginLeft:'5px'}}><a onClick={() => this.onDataChange('changeStatus', true)}>change</a></small></dd>
                                                : <dd ><StatusDropdownList onChange={(value) => this.onProjectDataChange('_status', value)} /><button onClick={() => this.onSaveChange('changeStatus', false)}>save</button><button onClick={() => this.onDataChange('changeStatus', false)}>cancel</button></dd>}</div>

                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-5">
                                <dl className="dl-horizontal">

                                    <dt>Created by:</dt> <dd>Uğur Cebeci</dd>
                                    <dt>Description:</dt> <dd> {projectData.description}</dd>
                                    <dt>Client:</dt> <dd><a href="#" className="text-navy"> {projectData.customer}</a> </dd>
                                    <dt>Category:</dt> <dd> {projectData._category ? projectData._category.categoryName : 'No category'} </dd>
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

                        <div className="row m-t-sm">
                            <div className="col-lg-12">
                                <div className="panel blank-panel">
                                    <div className="panel-heading">
                                        <div className="panel-options">
                                            <ul className="nav nav-tabs">
                                                <li className="active"><a href="#tab-2" data-toggle="tab" >Phase Details</a></li>
                                                <li className=""><a href="#tab-3" data-toggle="tab" >Estimating Factors</a></li>
                                                <li className=""><a href="#tab-4" data-toggle="tab" >Inventory</a></li>
                                                <li className=""><a href="#tab-5" data-toggle="tab" >Summary</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="panel-body">

                                        <div className="tab-content">
                                            <div className="tab-pane fade active in" id="tab-2">
                                                {projectPhase ? <div>
                                                    <ul className="todo-list m-t">
                                                        <li style={{ float: 'left', width: projectPhase.analysis + '%' }}>
                                                            <span className="name"> Analysis</span><br />
                                                            <span className="value text-success"> {projectPhase.analysis + '%'} </span>
                                                        </li>
                                                        <li style={{ float: 'left', width: projectPhase.design + '%' }}>
                                                            <span className="name"> Design</span><br />
                                                            <span className="value text-success"> {projectPhase.design + '%'} </span>
                                                        </li>
                                                        <li style={{ float: 'left', width: projectPhase.dev + '%' }}>
                                                            <span className="name"> Development</span><br />
                                                            <span className="value text-success"> {projectPhase.dev + '%'} </span>
                                                        </li>
                                                        <li style={{ float: 'left', width: projectPhase.unitTest + '%' }}>
                                                            <span className="name"> Unit Test</span><br />
                                                            <span className="value text-success"> {projectPhase.unitTest + '%'} </span>
                                                        </li>
                                                        <li style={{ float: 'left', width: projectPhase.intTest + '%' }}>
                                                            <span className="name"> Int Test</span><br />
                                                            <span className="value text-success"> {projectPhase.intTest + '%'} </span>
                                                        </li>
                                                        <li >
                                                            <span className="name" style={{ width: projectPhase.uat + '%' }}> UAT</span><br />
                                                            <span className="value text-success"> {projectPhase.uat + '%'} </span>
                                                        </li>
                                                    </ul>
                                                    <ul className="todo-list m-t">
                                                        <li style={{ float: 'left', width: '34%' }}>
                                                            <span className="name" > Project Management</span>
                                                            <span className="value text-success"> {projectPhase.pManagement + '%'} </span>
                                                        </li>
                                                        <li style={{ float: 'left', width: '33%' }}>
                                                            <span className="name" > Solution Architecture</span>
                                                            <span className="value text-success"> {projectPhase.solArch + '%'} </span>
                                                        </li>
                                                        <li style={{ float: 'left', width: '33%' }}>
                                                            <span className="name" > Code Merge & Regression</span>
                                                            <span className="value text-success"> {projectPhase.codeMergeReg + '%'} </span>
                                                        </li>
                                                    </ul></div> : 'Not any project phase defined'
                                                }
                                            </div>
                                            <div className="tab-pane fade" id="tab-3">
                                                <DataTable data={estFactors} objKeys={efObjectKeys} colProps={efColProps} disableButtons={true} />
                                            </div>
                                            <div className="tab-pane fade" id="tab-4">
                                                {
                                                    inventoryItems.length > 0 ?
                                                        <InventoryItemsList sum={sum} data={inventoryItems} colProps={inColProps} phaseData={projectPhase} /> :
                                                        'No Data to Show!'
                                                }
                                            </div>
                                            <div className="tab-pane fade" id="tab-5">
                                                {projectPhase ? <div>
                                                    <ul className="todo-list m-t">
                                                        <li style={{ float: 'left', width: projectPhase.analysis + '%' }}>
                                                            <span className="name"> Analysis</span><br />
                                                            <span className="value text-success"> {projectPhase.analysis + '%'} </span><br />
                                                            <span className="value text-danger"> {projectPhase.analysis * sum / 100}</span>
                                                        </li>
                                                        <li style={{ float: 'left', width: projectPhase.design + '%' }}>
                                                            <span className="name"> Design</span><br />
                                                            <span className="value text-success"> {projectPhase.design + '%'} </span><br />
                                                            <span className="value text-danger"> {projectPhase.design * sum / 100}</span>
                                                        </li>
                                                        <li style={{ float: 'left', width: projectPhase.dev + '%' }}>
                                                            <span className="name"> Development</span><br />
                                                            <span className="value text-success"> {projectPhase.dev + '%'} </span><br />
                                                            <span className="value text-danger"> {projectPhase.dev * sum / 100}</span>
                                                        </li>
                                                        <li style={{ float: 'left', width: projectPhase.unitTest + '%' }}>
                                                            <span className="name"> Unit Test</span><br />
                                                            <span className="value text-success"> {projectPhase.unitTest + '%'} </span><br />
                                                            <span className="value text-danger"> {projectPhase.unitTest * sum / 100}</span>
                                                        </li>
                                                        <li style={{ float: 'left', width: projectPhase.intTest + '%' }}>
                                                            <span className="name"> Int Test</span><br />
                                                            <span className="value text-success"> {projectPhase.intTest + '%'} </span><br />
                                                            <span className="value text-danger"> {projectPhase.intTest * sum / 100}</span>
                                                        </li>
                                                        <li >
                                                            <span className="name" style={{ width: projectPhase.uat + '%' }}> UAT</span><br />
                                                            <span className="value text-success"> {projectPhase.intTest + '%'} </span><br />
                                                            <span className="value text-danger"> {projectPhase.intTest * sum / 100}</span>
                                                        </li>
                                                    </ul>
                                                    <ul className="todo-list m-t">
                                                        <li style={{ float: 'left', width: '100%', textAlign: 'right' }}>
                                                            <span className="name" >Sub Total: </span>
                                                            <span className="value text-success"> {projectPhase.analysis + projectPhase.design + projectPhase.dev + projectPhase.unitTest + projectPhase.intTest + projectPhase.uat + '%'} </span>
                                                            <span className="value text-danger"> {(projectPhase.analysis + projectPhase.design + projectPhase.dev + projectPhase.unitTest + projectPhase.intTest + projectPhase.uat) * sum / 100}</span>
                                                        </li>
                                                    </ul>
                                                    <ul className="todo-list m-t">
                                                        <li style={{ float: 'left', width: '34%' }}>
                                                            <span className="name" > Project Management</span>
                                                            <span className="value text-success"> {projectPhase.pManagement + '%'} </span>
                                                            <span className="value text-danger"> {projectPhase.pManagement * sum / 100}</span>
                                                        </li>
                                                        <li style={{ float: 'left', width: '33%' }}>
                                                            <span className="name" > Solution Architecture</span>
                                                            <span className="value text-success"> {projectPhase.solArch + '%'} </span>
                                                            <span className="value text-danger"> {projectPhase.solArch * sum / 100}</span>
                                                        </li>
                                                        <li style={{ float: 'left', width: '33%' }}>
                                                            <span className="name" > Code Merge & Regression</span>
                                                            <span className="value text-success"> {projectPhase.codeMergeReg + '%'} </span>
                                                            <span className="value text-danger"> {projectPhase.codeMergeReg * sum / 100}</span>
                                                        </li>
                                                    </ul>
                                                    <ul className="todo-list m-t">
                                                        <li style={{ float: 'left', width: '100%', textAlign: 'right' }}>
                                                            <span className="name" >Sub Total: </span>
                                                            <span className="value text-success"> {projectPhase.pManagement + projectPhase.solArch + projectPhase.codeMergeReg + '%'} </span>
                                                            <span className="value text-danger"> {(projectPhase.pManagement + projectPhase.solArch + projectPhase.codeMergeReg) * sum / 100}</span>
                                                        </li>
                                                    </ul>
                                                    <ul className="todo-list m-t">
                                                        <li style={{ float: 'left', width: '100%', textAlign: 'right' }}>
                                                            <span className="name" >Total: </span>
                                                            <span className="value text-danger"> {(projectPhase.pManagement + projectPhase.solArch + projectPhase.codeMergeReg) * sum / 100 + sum} </span>ManDay
                                                        </li>
                                                    </ul>
                                                </div> : 'Not Data to Show!'
                                                }
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '30px' }}>
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
                    </div>
                </div></PageView >
        );
    }
}

export default ProjectDetailView;