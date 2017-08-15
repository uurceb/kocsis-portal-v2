import React, { Component } from 'react';
import PageView from '../components/common/PageView'
import DataTable from '../components/common/DataTable'
import StatusDropdownList from '../components/common/StatusDropdownList'
import Constants from '../constants'
const url = Constants.serviceUrl;
import InventoryItemsList from './InventoryItemsList'
import CommentBox from '../components/common/CommentBox'
import ProjectPhaseTab from './ProjectPhaseTab'
import { ModalManager } from 'react-dynamic-modal';
import DeleteConfirmModal from '../components/common/DeleteConfirmModal'
import { Link, browserHistory } from 'react-router';

class ProjectDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = { _id: props.params.projectId, projectData: null, projectPhase: null, estFactors: [], inventoryItems: [], comments: [], sum: 0, updatedProject: {}, formData: { changeStatus: false, newComment: '' } }
        this.loadDataFromServer.bind(this);
        this.loadPhaseData.bind(this);
        this.loadEstFactorData.bind(this);
        this.loadCommentsData.bind(this);
        this.onSaveChange.bind(this);
        this.onAddComment.bind(this);
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
                this.loadCommentsData();
                this.setState({ updatedProject: Object.assign({}, this.state.projectData) });
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
            })
            .catch((error) => {
                console.error(error);
            });
    }
    loadCommentsData() {
        let _this = this;
        fetch(url + '/comments/getCommentsByObjectId/' + _this.state._id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ comments: responseJson });
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
        fetch(url + '/projects/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(_this.state.updatedProject)
        }).then(function () {
            console.log("project updated");
            _this.setState({ updatedProject: {}, formData: { changeStatus: false } });
            _this.loadDataFromServer();
        }).catch(function (err) {
            console.log(err);
        });
    }
    onAddComment() {
        fetch(url + '/comments/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _object: this.state._id,
                _user: '598b1df01d9df12e38931338',
                text: this.state.formData.newComment
            })
        }).then(() => {
            this.loadCommentsData();
            this.setState({ formData: { newComment: '' } });
        }).catch((e) => {
            console.log(e);
        });;
    }
    delete() {
        fetch(url + '/projects/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: this.state._id,
            })
        }).then(function () {
            //this.context.history.push("/#/projects");
            browserHistory.push("/#/projects")
        }).catch(function () {
            console.log("errore");
        });;
    }
    onDelete() {
        ModalManager.open(
            <DeleteConfirmModal onConfirm={() => this.delete()} />);
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
            <PageView title={projectData && projectData.projectName}>
                <div className="ibox">
                    <div className="ibox-content">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="m-b-md">
                                    <a  className="btn btn-white btn-xs pull-right" onClick={() => this.onDelete()}>Delete project</a>
                                    <h2>{projectData && projectData.projectName}</h2>
                                </div>
                                <dl className="dl-horizontal">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-12 col-xs-12" style={{ float: 'left' }}>
                                            <dt>Status:</dt> {projectData && !formData.changeStatus ?
                                                <dd><span className="label label-primary">{projectData._status ? projectData._status.statusName : 'No status'}</span><small style={{ marginLeft: '5px' }}><a onClick={() => this.onDataChange('changeStatus', true)}>change</a></small></dd>
                                                : <dd ><StatusDropdownList onChange={(value) => this.onProjectDataChange('_status', value)} /><button onClick={() => this.onSaveChange('changeStatus', false)}>save</button><button onClick={() => this.onDataChange('changeStatus', false)}>cancel</button></dd>}</div>

                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-5">
                                <dl className="dl-horizontal">

                                    <dt>Created by:</dt> <dd>Uğur Cebeci</dd>
                                    <dt>Description:</dt> <dd> {projectData && projectData.description}</dd>
                                    <dt>Client:</dt> <dd><a href="#" className="text-navy"> {projectData && projectData.customer}</a> </dd>
                                    <dt>Category:</dt> <dd> {projectData && projectData._category ? projectData._category.categoryName : 'No category'} </dd>
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
                                                {
                                                    projectPhase ? <ProjectPhaseTab projectPhase={projectPhase} /> : 'Not any project phase defined'
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
                                                </div> : 'No Data to Show!'
                                                }
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '30px' }}>
                            <CommentBox objectId={this.state._id} />
                        </div>
                    </div>
                </div></PageView >
        );
    }
}

export default ProjectDetailView;