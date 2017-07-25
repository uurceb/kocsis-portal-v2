import React, { Component } from 'react';


const AddNewButton = (props) => (
    <a className="btn btn-primary btn-xs" onClick={() => props.onClick()}>
        <i className="fa fa-plus"></i> {props.label}
    </a>
)

export default AddNewButton;