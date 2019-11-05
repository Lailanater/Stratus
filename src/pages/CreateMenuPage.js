import React from 'react';
import { Radio, Typography } from "@material-ui/core";
import { withSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import StepForm from "../components/StepForm";
import OptionPicker from "../components/OptionPicker";

const CreateMenuPage = (props) => {

    const menuName = (
        <TextField
            label="Menu Name"
            margin="normal"
            variant="outlined"
            required={true}
        />
    );

    const needsRepeatOption = (
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

    const setDtmfOptions = (
        <div>
            This is step 4
        </div>
    );

    const setDefaultRouteOptionType = (
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

    let steps = [];
    addStep("Enter The Name of The Menu to Make Grammar(s) for", menuName);
    addStep("Select DTMF Options", <OptionPicker maxOptions={9}/>);
    addStep("Repeat?", needsRepeatOption);
    addStep("Set DTMF Option Types", setDtmfOptions);
    addStep("Set Default Route Option Type", setDefaultRouteOptionType);

    function addStep(label, component) {
        steps = steps.concat(createStep(label, component));
    }

    function createStep(label, component) {
        return {
            label,
            component
        };
    }

    function createMenu() {
        props.enqueueSnackbar("Menu was successfully created!", {variant: "success", autoHideDuration: 2000});
    }

    return (
        <StepForm steps={steps} onSubmit={createMenu}/>
    );
};

export default withSnackbar(CreateMenuPage);