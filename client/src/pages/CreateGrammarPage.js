import React, { useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import { withSnackbar } from "notistack";
import StepForm from "../components/StepForm";
import OptionPicker from "../components/OptionPicker";
import API from "../routes/API";
import { useDispatch, useSelector } from "react-redux";
import MenuNameInput from "../components/MenuNameInput";
import NeedsRepeatOptionInput from "../components/NeedsRepeatOptionInput";
import { setDtmfOptions, setMenuName, setNeedsRepeat } from "../redux/actions/actionCreators";
import FileExistsDialog from "../components/FileExistsDialog";

const CreateGrammarPage = (props) => {

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [shouldOverwrite, setShouldOverwrite] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [canRedirect, setCanRedirect] = useState(false);
    const menuName = useSelector(state => state.menuName);
    const needsRepeat = useSelector(state => state.needsRepeat);
    const projectPath = useSelector(state => state.currentProject.path);
    const dtmfOptions = useSelector(state => state.dtmfOptions);
    const dispatch = useDispatch();
    const [needsDTMF, setNeedsDTMF] = useState(false);
    const [needsVoice, setNeedsVoice] = useState(false);

    useEffect(() => {
        if (isFirstRender) {
            if (menuName !== "") {
                dispatch(setMenuName(""));
            }
            if (needsRepeat === true) {
                dispatch(setNeedsRepeat(false));
            }
            if (dtmfOptions !== []) {
                dispatch(setDtmfOptions([]));
            }
            setIsFirstRender(false);
        }
    }, [menuName, needsRepeat, dtmfOptions, dispatch, isFirstRender]);

    const grammarName = (
        <MenuNameInput helperText="Enter the name of the menu you are creating grammar(s) for" />
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
    addStep("Repeat?", <NeedsRepeatOptionInput />);
    addStep("Select Type of Grammar(s)", selectGrammarType);

    function createGrammar() {
        if (needsVoice) {
            API.createGrammar(menuName, "voice", projectPath, needsRepeat, dtmfOptions, shouldOverwrite)
                .then((grammarRes) => {
                    if (grammarRes.data.FileCreated) {
                        props.enqueueSnackbar("Voice grammar was successfully created!", {
                            variant: "success",
                            autoHideDuration: 2000
                        });
                        setCanRedirect(true);
                    } else if (grammarRes.data.FileExists && !grammarRes.data.ShouldOverwrite) {
                        setShowDialog(true);
                    } else {
                        props.enqueueSnackbar("There was a problem creating the voice grammar.", {
                            variant: "warning",
                            autoHideDuration: 2000
                        });
                        setCanRedirect(true);
                    }
                }).catch((err) => {
                props.enqueueSnackbar("An error occurred when creating the voice grammar.", {
                    variant: "error",
                    autoHideDuration: 2000
                });
                console.log(err);
                setCanRedirect(true);
            });
        }
        if (needsDTMF) {
            API.createGrammar(menuName, "dtmf", projectPath, needsRepeat, dtmfOptions, shouldOverwrite)
                .then((grammarRes) => {
                    if (grammarRes.data.FileCreated) {
                        props.enqueueSnackbar("DTMF grammar was successfully created!", {
                            variant: "success",
                            autoHideDuration: 2000
                        });
                        setCanRedirect(true);
                    } else if (grammarRes.data.FileExists && !grammarRes.data.ShouldOverwrite) {
                        setShowDialog(true);
                    } else {
                        props.enqueueSnackbar("There was a problem creating the dtmf grammar.", {
                            variant: "warning",
                            autoHideDuration: 2000
                        });
                        setCanRedirect(true);
                    }
                }).catch((err) => {
                props.enqueueSnackbar("An error occurred when creating the dtmf grammar.", {
                    variant: "error",
                    autoHideDuration: 2000
                });
                console.log(err);
                setCanRedirect(true);
            });
        }
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

    function yesOnClick() {
        setShouldOverwrite(true);
        setShowDialog(false);
    }

    function noOnClick() {
        setShouldOverwrite(false);
        setShowDialog(false);
    }

    return (
        <div>
            <FileExistsDialog fileName={menuName} open={showDialog} yesOnClick={yesOnClick} noOnClick={noOnClick} />
            <StepForm steps={steps} onSubmit={createGrammar} canRedirect={canRedirect} />
        </div>
    );
};

export default withSnackbar(CreateGrammarPage);