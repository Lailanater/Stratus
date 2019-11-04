import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import {withSnackbar} from "notistack";
import {Link} from "react-router-dom";

class CreateGrammarPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            needsDTMF: false,
            needsVoice: false
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

        this.getStepContent = this.getStepContent.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goNext = this.goNext.bind(this);
        this.createGrammar = this.createGrammar.bind(this);
        this.selectGrammarType = this.selectGrammarType.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    getStepContent(activeStep) {
        switch (activeStep) {
            case 0: {
                return this.getGrammarName();
            }
            case 1: {
                return this.selectDtmfOptions();
            }
            case 2: {
                return this.selectGrammarType();
            }
            default:
                return this.getGrammarName();
        }
    }

    getGrammarName() {
        return (
            <TextField
                label="Menu Name"
                helperText="Enter the name of the menu you are creating grammar(s) for"
                margin="normal"
                variant="outlined"
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

    createGrammar() {
        this.props.enqueueSnackbar("Grammar was successfully created!", {variant: "success", autoHideDuration: 2000});
    }

    handleChange(event) {
        if (event.currentTarget.value === "dtmf") {
            this.setState({
                needsDTMF: !this.state.needsDTMF
            });
        } else {
            this.setState({
                needsVoice: !this.state.needsVoice
            });
        }
    }

    selectGrammarType() {
        return (
            <FormControl component="fieldset">
                <Typography>Which Type(s) of Grammars Do You Need?</Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.needsDTMF} onChange={this.handleChange} value="dtmf"/>}
                        label="DTMF"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={this.state.needsVoice} onChange={this.handleChange} value="voice"/>}
                        label="Voice"
                    />
                </FormGroup>
            </FormControl>
        );
    }

    render() {
        return (
            <div>
                <Stepper activeStep={this.state.activeStep}>
                    <Step>
                        <StepLabel>Enter The Name of The Menu to Make Grammar(s) for</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Select DTMF Options</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Select Type of Grammar(s)</StepLabel>
                    </Step>
                </Stepper>
                <Paper>
                    {this.getStepContent(this.state.activeStep)}
                    <br/>
                    <Button variant="contained" onClick={this.goBack} disabled={this.state.activeStep === 0}>
                        Previous
                    </Button>
                    {this.state.activeStep === 2 ?
                        <Link to="/">
                            <Button variant="contained" color="primary" onClick={this.createGrammar}>
                                Finish
                            </Button>
                        </Link>
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

export default withSnackbar(CreateGrammarPage);