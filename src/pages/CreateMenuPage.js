import React from 'react';
import { withSnackbar } from "notistack";
import StepForm from "../components/StepForm";
import OptionPicker from "../components/OptionPicker";
import MenuNameInput from "../components/MenuNameInput";
import NeedsRepeatOptionInput from "../components/NeedsRepeatOptionInput";
import OptionTypeInput from "../components/OptionTypeInput";
import DefaultRouteTypeInput from "../components/DefaultRouteTypeInput";

const CreateMenuPage = (props) => {

    let steps = [];
    addStep("Enter The Name of The Menu to Make Grammar(s) for", <MenuNameInput />);
    addStep("Select DTMF Options", <OptionPicker maxOptions={9} />);
    addStep("Repeat?", <NeedsRepeatOptionInput />);
    addStep("Set DTMF Option Types", <OptionTypeInput />);
    addStep("Set Default Route Option Type", <DefaultRouteTypeInput />);

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
        <StepForm steps={steps} onSubmit={createMenu} />
    );
};

export default withSnackbar(CreateMenuPage);