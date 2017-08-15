import React, { Component } from 'react';
import EstFactorsRow from './EstFactorRow'

const DataRows = (props) => (
    <tbody>{props.data.map((row, index) => {
        return (
            <EstFactorsRow key={row._id} row={row} objKeys={props.objKeys} url={props.url}/>
        );
    })}</tbody>
);
const EstFactorsList = (props) => (
    props.data.length > 0 ?
        <table className="table table-striped">
            {
                props.isColored && <colgroup>
                    {
                        props.colProps.map((colProp, index) => colProp.isColored && <col key={index} span={colProp.span} className={colProp.color}></col>)
                    }
                </colgroup>
            }
            <thead>
                <tr>{
                    props.colProps.map((colProp, index) => <th key={index} style={{ width: colProp.colWidth }}>{colProp.colHeader}</th>)
                }
                    {!props.disableButtons &&
                        <th style={{ width: "10%" }}>#Edit</th>}
                </tr>
            </thead>
            <DataRows data={props.data} url={props.url} objKeys={props.objKeys} screenName={props.screenName} disableButtons={props.disableButtons} />
        </table> : <p>No Data  to Show!</p>
);

export default EstFactorsList;