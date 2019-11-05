import React, { useState } from 'react';
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
import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";

const CreateGrammarPage = (props) => {

    const [activeStep, setActiveStep] = useState(0);
    const [needsDTMF, setNeedsDTMF] = useState(false);
    const [needsVoice, setNeedsVoice] = useState(false);

    const marks = [
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

    function getStepContent(activeStep) {
        switch (activeStep) {
            case 0: {
                return getGrammarName();
            }
            case 1: {
                return selectDtmfOptions();
            }
            case 2: {
                return selectGrammarType();
            }
            default:
                return getGrammarName();
        }
    }

    function getGrammarName() {
        return (
            <TextField
                label="Menu Name"
                helperText="Enter the name of the menu you are creating grammar(s) for"
                margin="normal"
                variant="outlined"
            />
        );
    }

    function selectDtmfOptions() {
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
                    marks={marks}
                />
            </div>
        );
    }

    function goBack() {
        setActiveStep(activeStep - 1);
    }

    function goNext() {
        setActiveStep(activeStep + 1);
    }

    function createGrammar() {
        props.enqueueSnackbar("Grammar was successfully created!", {variant: "success", autoHideDuration: 2000});
    }

    function handleChange(event) {
        if (event.currentTarget.value === "dtmf") {
            setNeedsDTMF(!needsDTMF);
        } else {
            setNeedsVoice(!needsVoice);
        }
    }

    function selectGrammarType() {
        return (
            <FormControl component="fieldset">
                <Typography>Which Type(s) of Grammars Do You Need?</Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={needsDTMF} onChange={handleChange} value="dtmf"/>}
                        label="DTMF"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={needsVoice} onChange={handleChange} value="voice"/>}
                        label="Voice"
                    />
                </FormGroup>
            </FormControl>
        );
    }

    return (
        <div>
            <Stepper activeStep={activeStep}>
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
                {getStepContent(activeStep)}
                <br/>
                <Button variant="contained" onClick={goBack} disabled={activeStep === 0}>
                    Previous
                </Button>
                {activeStep === 2 ?
                    <Link to="/">
                        <Button variant="contained" color="primary" onClick={createGrammar}>
                            Finish
                        </Button>
                    </Link>
                    :
                    <Button variant="contained" color="secondary" onClick={goNext}>
                        Next
                    </Button>
                }
            </Paper>
        </div>
    );
};

export default withSnackbar(CreateGrammarPage);