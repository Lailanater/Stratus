import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-top: 10px;
`;

const StepForm = props => {
  const [activeStep, setActiveStep] = useState(0);

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
  }

  function getNextStepButton() {
    if (activeStep === lastStep) {
      return (
        <Button
          style={{ marginLeft: '5px' }}
          variant="contained"
          color="primary"
          onClick={sendFinishedForm}
        >
          Finish
        </Button>
      );
    } else {
      return (
        <Button
          style={{ marginLeft: '5px' }}
          variant="contained"
          color="secondary"
          onClick={goNext}
        >
          Next
        </Button>
      );
    }
  }

  if (props.canRedirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {props.steps.map(step => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="container">
        <Button
          variant="contained"
          onClick={goBack}
          disabled={activeStep === firstStep}
        >
          Previous
        </Button>
        {nextStepButton}
        <br />
        <StyledDiv>{currentStepComponent}</StyledDiv>
      </div>
    </div>
  );
};

export default StepForm;
