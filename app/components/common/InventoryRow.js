import React, { Component } from 'react';

class InventoryRow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { rowdata, index, phaseData } = this.props
        return (
            <tr key={index}>
                <td >{rowdata._estfactor.component}</td>
                <td >
                    {rowdata.shortDescription}
                </td>
                <td >{rowdata._estfactor.complexity}</td>
                <td>{rowdata._estfactor.newOrModified}</td>
                <td >{rowdata.remarks}</td>
                <td>{rowdata.inOutScope}</td>
                <td >{rowdata._estfactor.value}</td>
                <td>{phaseData&&(phaseData.analysis * rowdata._estfactor.value /100)}</td>
                <td>{phaseData&&(phaseData.design * rowdata._estfactor.value /100)}</td>
                <td>{phaseData&&(phaseData.dev * rowdata._estfactor.value/100)}</td>
                <td>{phaseData&&(phaseData.unitTest * rowdata._estfactor.value/100)}</td>
                <td>{phaseData&&(phaseData.intTest * rowdata._estfactor.value/100)}</td>
                <td>{phaseData&&(phaseData.uat * rowdata._estfactor.value/100)}</td>
                <td>{phaseData&&(phaseData.pManagement * rowdata._estfactor.value/100)}</td>
                <td>{phaseData&&(phaseData.solArch * rowdata._estfactor.value/100)}</td>
                <td>{phaseData&&(phaseData.codeMergeReg * rowdata._estfactor.value/100)}</td>
            </tr>
        );
    }
}

export default InventoryRow;