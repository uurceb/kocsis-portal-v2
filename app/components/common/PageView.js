import React, { Component } from 'react';

class ProjectsView extends Component {

    render() {
        return (
        <div>
            <div className="row wrapper border-bottom white-bg page-heading">
                <div className="col-sm-4">
                    <h2>Project list</h2>
                    <ol className="breadcrumb">
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li className="active">
                            <strong>Project list</strong>
                        </li>
                    </ol>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="wrapper wrapper-content animated fadeInRight">
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
        )
    }

}

export default ProjectsView