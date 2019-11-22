import React, { useState } from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import { withSnackbar } from "notistack";
import StepForm from "../components/StepForm";
import OptionPicker from "../components/OptionPicker";
import API from "../routes/API";
import {useSelector} from "react-redux";

const CreateGrammarPage = (props) => {

    const menuName = useSelector(state => state.menuName);
    const needsRepeat = useSelector(state => state.needsRepeat);
    const projectPath = useSelector(state => state.currentProject.projectPath);
    const dtmfOptions = useSelector(state => state.dtmfOptions);
    const [needsDTMF, setNeedsDTMF] = useState(false);
    const [needsVoice, setNeedsVoice] = useState(false);

    const grammarName = (
        <TextField
            label="Menu Name"
            helperText="Enter the name of the menu you are creating grammar(s) for"
            margin="normal"
            variant="outlined"
        />
    );

    const selectGrammarType = (
        <FormControl component="fieldset">
            <Typography>Which Type(s) of Grammars Do You Need?</Typography>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={needsDTMF} onChange={handleChange} value="dtmf" />}
                    label="DTMF"
                />
                <FormControlLabel
                    control={<Checkbox checked={needsVoice} onChange={handleChange} value="voice" />}
                    label="Voice"
                />
            </FormGroup>
        </FormControl>
    );

    let steps = [];
    addStep("Enter The Name of The Menu to Make Grammar(s) for", grammarName);
    addStep("Select DTMF Options", <OptionPicker maxOptions={9} />);
    addStep("Select Type of Grammar(s)", selectGrammarType);

    function createGrammar() {
        API.createGrammar(menuName, "dtmf", projectPath, needsRepeat, dtmfOptions);
        props.enqueueSnackbar("Grammar was successfully created!", {variant: "success", autoHideDuration: 2000});
    }

    function handleChange(event) {
        if (event.currentTarget.value === "dtmf") {
            setNeedsDTMF(!needsDTMF);
        } else {
            setNeedsVoice(!needsVoice);
        }
    }

    function addStep(label, component) {
        steps = steps.concat(createStep(label, component));
    }

    function createStep(label, component) {
        return {
            label,
            component
        };
    }

    return (
        <StepForm steps={steps} onSubmit={createGrammar} />
    );
};

export default withSnackbar(CreateGrammarPage);