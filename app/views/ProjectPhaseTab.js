import React, { Component } from 'react';

const ProjectPhaseTab = (props) => {
    const {projectPhase} = props;
    return (<div>
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
        </ul></div>);

};


export default ProjectPhaseTab;