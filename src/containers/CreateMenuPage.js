import React, {Component} from 'react';
import {Button, Paper, Radio, Step, StepLabel, Stepper, Typography} from "@material-ui/core";
import {withSnackbar} from "notistack";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Slider from "@material-ui/core/Slider";

class CreateMenuPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0
        };

        this.marks = [
            {
                value: 0,
                label: '0',
            },
            {
                value: 1,
                label: '1',
            },
            {
                value: 2,
                label: '2',
            },
            {
                value: 3,
                label: '3',
            },
            {
                value: 4,
                label: '4',
            },
            {
                value: 5,
                label: '5',
            },
            {
                value: 6,
                label: '6',
            },
            {
                value: 7,
                label: '7',
            },
            {
                value: 8,
                label: '8',
            },
            {
                value: 9,
                label: '9',
            },
        ];

        this.goBack = this.goBack.bind(this);
        this.goNext = this.goNext.bind(this);
        this.createMenu = this.createMenu.bind(this);
    }


    getStepContent(activeStep) {
        switch (activeStep) {
            case 0: {
                return this.getMenuName();
            }
            case 1: {
                return this.selectDtmfOptions();
            }
            case 2: {
                return this.needsRepeatOption();
            }
            case 3: {
                return this.setDtmfOptions();
            }
            case 4: {
                return this.setDefaultRouteOptionType();
            }
            default:
                return this.getMenuName();
        }
    }

    getMenuName() {
        return (
            <TextField
                label="Menu Name"
                margin="normal"
                variant="outlined"
                required={true}
            />
        );
    }

    selectDtmfOptions() {
        return (
            <div>
                <Typography id="discrete-slider-custom" gutterBottom>
                    How many options are you going to need?
                </Typography>
                <Slider
                    defaultValue={0}
                    step={1}
                    valueLabelDisplay="auto"
                    max={9}
                    marks={this.marks}
                />
            </div>
        );
    }


    needsRepeatOption() {
        return (
            <div>
                <Typography>
                    Will you need a repeat option?
                </Typography>
                <RadioGroup>
                    <FormControlLabel
                        value="yes"
                        control={<Radio color="secondary"/>}
                        label="Yes"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="no"
                        control={<Radio color="secondary"/>}
                        label="No"
                        labelPlacement="start"
                    />
                </RadioGroup>
            </div>
        );
    }

    setDtmfOptions() {
        return (
            <div>
                This is step 4
            </div>
        );
    }

    setDefaultRouteOptionType() {
        return (
            <div>
                <Typography>
                    When you default route on this menu where should you go?
                </Typography>
                <RadioGroup>
                    <FormControlLabel
                        value="calltype"
                        control={<Radio color="secondary"/>}
                        label="Calltype"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="menu"
                        control={<Radio color="secondary"/>}
                        label="Menu"
                        labelPlacement="start"
                    />
                </RadioGroup>
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