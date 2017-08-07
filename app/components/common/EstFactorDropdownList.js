import React, { Component } from 'react';
import Constants from '../../constants'
const url = Constants.serviceUrl + 'estimatingfactors';

class EstFactorDropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = { estimationfactors: [], defaultValue: '*' };
    }
    loadDataFromServer(categoryId) {
        let _this = this;

        var _url = (categoryId == '0' || !categoryId) ? url : url + '/getEstFactorsByCatId/' + categoryId;
        fetch(_url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                _this.setState({ estimationfactors: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    componentWillReceiveProps(nextProp) {
        if (this.props.categoryId != nextProp.categoryId) {
            this.loadDataFromServer(nextProp.categoryId);
        }
    }
    onDataChange(value) {
        this.props.onChange(value);
    }
    render() {
        const { defaultValue } = this.state;
        return (
            <select className="form-control" onChange={(e) => this.onDataChange(e.target.value)}>
                <option>{defaultValue}</option>
                {
                    this.state.estimationfactors.map((estimationfactor, index) =>
                        <option value={estimationfactor._id} key={index}>
                            {estimationfactor.newOrModified + ' ' + estimationfactor.complexity + ' ' + estimationfactor.component}
                        </option>)
                }
            </select>
        );
    }
}

export default EstFactorDropdownList;