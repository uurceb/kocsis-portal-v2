import React, { Component } from 'react';
import Constants from '../../constants'
const url = Constants.serviceUrl + 'categories';


class CategoryDropdownList extends Component {
    constructor(props) {
        super(props);
        this.state = { categories: []};
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
                _this.setState({ categories: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.loadDataFromServer();
    }
    onDataChange(value) {
        this.props.onChange(value);
    }
    render() {
        return (
            <select className="form-control" onChange={(e) => this.onDataChange(e.target.value)}>
                <option value={0}>*</option>
                {
                    this.state.categories.map((category, index) => <option value={category._id} key={index}>{category.categoryName}</option>)
                }
            </select>
        );
    }
}

export default CategoryDropdownList;