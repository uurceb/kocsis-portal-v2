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
                                        <span className="label label-primary">{row._status?row._status.statusName:'No status'}</span>
                                    </td>
                                    <td className="project-title">
                                        <Link to={"/project/" + row._id}>{row.projectName}</Link>
                                    </td>
                                    <td >{row._category?row._category.categoryName:'No category'}</td>
                                    <td >{row.customer}</td>
                                    <td>{row.description}</td>
                                    <td className="project-completion">
                                        <small>Completion with: 48%</small>
                                        <div className="progress progress-mini">
                                            <div style={{ width: "48%" }} className="progress-bar"></div>
                                        </div>
                                    </td>
                                    <td className="project-actions">
                                        <Link to={"/project/" + row._id} className="btn btn-white btn-sm"><i className="fa fa-folder"></i>View</Link>
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