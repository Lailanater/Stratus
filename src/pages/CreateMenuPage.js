import React, { useEffect, useState } from 'react';
import { withSnackbar } from "notistack";
import StepForm from "../components/StepForm";
import OptionPicker from "../components/OptionPicker";
import MenuNameInput from "../components/MenuNameInput";
import NeedsRepeatOptionInput from "../components/NeedsRepeatOptionInput";
import OptionTypeInput from "../components/OptionTypeInput";
import DefaultRouteTypeInput from "../components/DefaultRouteTypeInput";
import { useDispatch, useSelector } from "react-redux";
import {
    setDefaultRouteTo,
    setDtmfOptions,
    setMenuName,
    setNeedsRepeat,
    setNumOfOptions
} from "../redux/actions/actionCreators";

const CreateMenuPage = (props) => {

    const [isFirstRender, setIsFirstRender] = useState(true);
    const menuName = useSelector(state => state.menuName);
    const numOfOptions = useSelector(state => state.numOfOptions);
    const needsRepeat = useSelector(state => state.needsRepeat);
    const dtmfOptions = useSelector(state => state.dtmfOptions);
    const defaultRouteTo = useSelector(state => state.defaultRouteTo);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isFirstRender) {
            if (menuName !== "") {
                dispatch(setMenuName(""));
            }
            if (numOfOptions !== 0) {
                dispatch(setNumOfOptions(0));
            }
            if (needsRepeat === true) {
                dispatch(setNeedsRepeat(false));
            }
            if (dtmfOptions !== []) {
                dispatch(setDtmfOptions([]));
            }
            if (defaultRouteTo !== "menu") {
                dispatch(setDefaultRouteTo("menu"));
            }
            setIsFirstRender(false);
        }
    }, [menuName, numOfOptions, needsRepeat, dtmfOptions, defaultRouteTo, dispatch, isFirstRender]);


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