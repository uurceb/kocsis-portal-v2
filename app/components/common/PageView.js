import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'



const increaseAction = { type: 'INCREASE_PC' }
class PageView extends Component {
    componentDidMount() {
        this.props.onPageVisit();
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wrapper wrapper-content animated fadeIn">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
PageView.propTypes = {
    visitedPageCount: PropTypes.number.isRequired,
    onPageVisit: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        onPageVisit: () => dispatch(increaseAction)
    }
}
function mapStateToProps(state) {
    return {
        visitedPageCount: state.pageCount
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageView);