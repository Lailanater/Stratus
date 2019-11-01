import React, {Component} from 'react';
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {connect} from "react-redux";
import {setCurrentProject} from "../redux/actions/actionCreators";

const mapStateToProps = state => {
    return {
        currentProject: state.currentProject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentProject: (nextProject) => {
            dispatch(setCurrentProject(nextProject));
        }
    };
};

class CurrentProjectDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProject: this.props.currentProject
        };

        this.setCurrentProject = this.setCurrentProject.bind(this);
    }

    setCurrentProject(event) {
        const nextProject = event.target.value;
        this.setState({
            currentProject: nextProject
        });
        this.props.setCurrentProject(nextProject);
    }

    render() {
        return (
            <div>
                <h2>Current project</h2>
                <InputLabel>Current Project</InputLabel>
                <Select value={this.state.currentProject} onChange={this.setCurrentProject}>
                    <MenuItem value={"ScrumF_TestApplication"}>ScrumF_TestApplication</MenuItem>
                    <MenuItem value={"ALR_Inforce"}>ALR_Inforce</MenuItem>
                </Select>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentProjectDropdown);