import React, {Component} from 'react';
import {Button, Paper, Radio, Step, StepLabel, Stepper, Typography} from "@material-ui/core";
import {withSnackbar} from "notistack";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

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

                <InputLabel>
                    How many DTMF option will you need?
                </InputLabel>
                <Select labelWidth="500px">
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                </Select>
            </div>
        );
    }


    step3() {
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