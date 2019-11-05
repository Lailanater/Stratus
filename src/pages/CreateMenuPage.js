import React, { useState } from 'react';
import { Button, Paper, Radio, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { withSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Slider from "@material-ui/core/Slider";
import { Link } from "react-router-dom";

const CreateMenuPage = (props) => {

    const [activeStep, setActiveStep] = useState(0);

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
                return getMenuName();
            }
            case 1: {
                return selectDtmfOptions();
            }
            case 2: {
                return needsRepeatOption();
            }
            case 3: {
                return setDtmfOptions();
            }
            case 4: {
                return setDefaultRouteOptionType();
            }
            default:
                return getMenuName();
        }
    }

    function getMenuName() {
        return (
            <TextField
                label="Menu Name"
                margin="normal"
                variant="outlined"
                required={true}
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


    function needsRepeatOption() {
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

    function setDtmfOptions() {
        return (
            <div>
                This is step 4
            </div>
        );
    }

    function setDefaultRouteOptionType() {
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

    function goBack() {
        setActiveStep(activeStep - 1);
    }

    function goNext() {
        setActiveStep(activeStep + 1);
    }

    function createMenu() {
        props.enqueueSnackbar("Menu was successfully created!", {variant: "success", autoHideDuration: 2000});
    }

    return (
        <div>
            <Stepper activeStep={activeStep}>
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
                {getStepContent(activeStep)}
                <br/>
                <Button variant="contained" onClick={goBack} disabled={activeStep === 0}>
                    Previous
                </Button>
                {activeStep === 4 ?
                    <Link to="/">
                        <Button variant="contained" color="primary" onClick={createMenu}>
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

export default withSnackbar(CreateMenuPage);