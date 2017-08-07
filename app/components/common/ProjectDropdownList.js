import React, { Component } from 'react';
import Constants from '../../constants'
const url = Constants.serviceUrl + 'projects';


class ProjectDropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = { projects: [], defaultValue: '*' };
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
                _this.setState({ projects: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.loadDataFromServer();
    }
    onDataChange(value) {
        var _project = this.state.projects.filter(x => x._id === value)[0];
        if (!_project)
            _project = {};

        this.props.onChange(_project);
    }
    render() {
        const { defaultValue } = this.state;
        return (
            <select className="form-control" onChange={(e) => this.onDataChange(e.target.value)} >
                <option >{defaultValue}</option>
                {
                    this.state.projects.map((project, index) => <option value={project._id} key={index}>{project.projectName}</option>)
                }
            </select>
        );
    }
}

export default ProjectDropdownList;