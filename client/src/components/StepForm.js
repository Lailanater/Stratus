import React, { useState } from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

const StepForm = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [canRedirect, setCanRedirect] = useState(false);

    const firstStep = 0;
    const lastStep = props.steps.length - 1;
    const currentStepComponent = props.steps[activeStep].component;

    function goBack() {
        setActiveStep(activeStep - 1);
    }

    function goNext() {
        setActiveStep(activeStep + 1);
    }

    let nextStepButton = getNextStepButton();

    function sendFinishedForm() {
        props.onSubmit();
        setCanRedirect(true);
    }

    function getNextStepButton() {
        if (activeStep === lastStep) {
            return (
                <Button variant="contained" color="primary" onClick={sendFinishedForm}>
                    Finish
                </Button>
            );
        } else {
            return (
                <Button variant="contained" color="secondary" onClick={goNext}>
                    Next
                </Button>
            );
        }
    }

    if (canRedirect) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Stepper activeStep={activeStep}>
                {props.steps.map((step) =>
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Paper>
                {currentStepComponent}
                <br />
                <Button variant="contained" onClick={goBack} disabled={activeStep === firstStep}>
                    Previous
                </Button>
                {nextStepButton}
            </Paper>
        </div>
    );
};

export default StepForm;