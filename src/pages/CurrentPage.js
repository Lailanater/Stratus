import {Component} from 'react';
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        currentPage: state.currentPage
    };
};

class CurrentPage extends Component {
    render() {
        return (
            this.props.currentPage
        );
    }
}

export default connect(mapStateToProps)(CurrentPage);