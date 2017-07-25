import React, { Component } from 'react';

import { Link } from 'react-router';

class ProjectsList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="project-list">
                <table className="table table-hover">
                    <thead>
                        <tr>{
                            this.props.colProps.map((colProp, index) =>
                                <th key={index} style={{ width: colProp.colWidth }}>
                                    {colProp.colHeader}
                                </th>)
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map((row, index) =>
                                <tr key={index}>
                                    <td className="project-status">
                                        <span className="label label-primary">Active</span>
                                    </td>
                                    <td className="project-title">
                                        <Link to={"/project/" + row._id}>{row.projectName}</Link>
                                    </td>
                                    <td >{row.customer}</td>
                                    <td className="project-completion">
                                        <small>Completion with: 48%</small>
                                        <div className="progress progress-mini">
                                            <div style={{ width: "48%" }} className="progress-bar"></div>
                                        </div>
                                    </td>
                                    <td className="project-people">
                                        <a href=""><img alt="image" className="img-circle" src="img/a3.jpg" /></a>
                                        <a href=""><img alt="image" className="img-circle" src="img/a1.jpg" /></a>
                                        <a href=""><img alt="image" className="img-circle" src="img/a2.jpg" /></a>
                                        <a href=""><img alt="image" className="img-circle" src="img/a4.jpg" /></a>
                                        <a href=""><img alt="image" className="img-circle" src="img/a5.jpg" /></a>
                                    </td>
                                    <td className="project-actions">
                                        <a href="#" className="btn btn-white btn-sm"><i className="fa fa-folder"></i> View </a>
                                        <a href="#" className="btn btn-white btn-sm"><i className="fa fa-pencil"></i> Edit </a>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProjectsList;