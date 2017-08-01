import React, { Component } from 'react';

import { Link } from 'react-router';
import InventoryRow from '../components/common/InventoryRow'

class InventoryItemsList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="project-list">
                <table className="table table-striped">
                    <thead>
                        <tr>{
                            this.props.colProps.map((colProp, index) =>
                                <th key={index} style={{ width: colProp.colWidth }}>
                                    {colProp.colHeader}
                                </th>)
                        }
                            <th >Analysis</th>
                            <th >Design</th>
                            <th >Dev</th>
                            <th >Unit Test</th>
                            <th >INT</th>
                            <th >UAT</th>
                            <th >Project Management</th>
                            <th >Solution Architecture</th>
                            <th >Code Merge & Reggression</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map((row, index) =>
                                <InventoryRow rowdata={row} index={index} key={index} phaseData={this.props.phaseData} />
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default InventoryItemsList;