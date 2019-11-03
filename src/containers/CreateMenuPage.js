import React, {Component} from 'react';
import {Button, Paper, Step, StepLabel, Stepper} from "@material-ui/core";
import {withSnackbar} from "notistack";
import TextField from "@material-ui/core/TextField";

class CreateMenuPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0
        };

        this.goBack = this.goBack.bind(this);
        this.goNext = this.goNext.bind(this);
        this.createMenu = this.createMenu.bind(this);
    }


    getStepContent(activeStep) {
        switch (activeStep) {
            case 0: {
                return this.step1();
            }
            case 1: {
                return this.step2();
            }
            case 2: {
                return this.step3();
            }
            case 3: {
                return this.step4();
            }
            case 4: {
                return this.step5();
            }
            default:
                return this.step1();
        }
    }

    step1() {
        return (
            <TextField
                label="Menu Name"
                margin="normal"
                variant="outlined"
            />
        );
    }

    step2() {
        return (
            <div>
                This is step 2
            </div>
        );
    }


    step3() {
        return (
            <div>
                This is step 3
            </div>
        );
    }

    step4() {
        return (
            <div>
                This is step 4
            </div>
        );
    }


    step5() {
        return (
            <div>
                This is step 5
            </div>
        );
    }

    goBack() {
        this.setState({
            activeStep: this.state.activeStep - 1
        });
    }

    goNext() {
        this.setState({
            activeStep: this.state.activeStep + 1
        }, () => {
            console.log(this.state);
        });
    }

    createMenu() {
        this.props.enqueueSnackbar("Menu was successfully created!", {variant: "success", autoHideDuration: 2000});
    }

    render() {
        return (
            <div>
                <Stepper activeStep={this.state.activeStep}>
                    <Step>
                        <StepLabel>Give The Menu a Name</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Select DTMF Options</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Repeat?</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Set DTMF Option Types</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Set Default Route Option Type</StepLabel>
                    </Step>
                </Stepper>
                <Paper>
                    {this.getStepContent(this.state.activeStep)}
                    <br/>
                    <Button variant="contained" onClick={this.goBack} disabled={this.state.activeStep === 0}>
                        Previous
                    </Button>
                    {this.state.activeStep === 4 ?
                        <Button variant="contained" color="primary" onClick={this.createMenu}>
                            Finish
                        </Button>
                        :
                        <Button variant="contained" color="secondary" onClick={this.goNext}>
                            Next
                        </Button>
                    }
                </Paper>
            </div>
        );
    }
}

export default withSnackbar(CreateMenuPage);