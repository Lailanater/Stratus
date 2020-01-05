import React, { useEffect, useState } from 'react';
import { withSnackbar } from 'notistack';
import StepForm from '../components/StepForm';
import OptionPicker from '../components/OptionPicker';
import MenuNameInput from '../components/MenuNameInput';
import NeedsRepeatOptionInput from '../components/NeedsRepeatOptionInput';
import OptionTypeView from '../components/OptionTypeView';
import DefaultRouteTypeInput from '../components/DefaultRouteTypeInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDefaultRouteTo,
  setDtmfOptions,
  setMenuName,
  setNeedsRepeat
} from '../redux/actions/actionCreators';
import API from '../routes/API';
import FileExistsDialog from '../components/FileExistsDialog';

const CreateMenuPage = props => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [shouldOverwrite, setShouldOverwrite] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [canRedirect, setCanRedirect] = useState(false);
  const menuName = useSelector(state => state.menuName);
  const needsRepeat = useSelector(state => state.needsRepeat);
  const projectPath = useSelector(state => state.currentProject.path);
  const dtmfOptions = useSelector(state => state.dtmfOptions);
  const defaultRouteTo = useSelector(state => state.defaultRouteTo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstRender) {
      if (menuName !== '') {
        dispatch(setMenuName(''));
      }
      if (needsRepeat === true) {
        dispatch(setNeedsRepeat(false));
      }
      if (dtmfOptions !== []) {
        dispatch(setDtmfOptions([]));
      }
      if (defaultRouteTo !== 'menu') {
        dispatch(setDefaultRouteTo('menu'));
      }
      setIsFirstRender(false);
    }
  }, [
    menuName,
    needsRepeat,
    dtmfOptions,
    defaultRouteTo,
    dispatch,
    isFirstRender
  ]);

  let steps = [];
  addStep(
    'Enter The Name of The Menu to Make Grammar(s) for',
    <MenuNameInput />
  );
  addStep('Select DTMF Options', <OptionPicker maxOptions={9} />);
  addStep('Repeat?', <NeedsRepeatOptionInput />);
  addStep('Set DTMF Option Types', <OptionTypeView />);
  addStep('Set Default Route Option Type', <DefaultRouteTypeInput />);

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
    API.createMenu(
      menuName,
      defaultRouteTo,
      projectPath,
      dtmfOptions,
      needsRepeat,
      shouldOverwrite
    )
      .then(menuRes => {
        console.log(menuRes.data);
        if (menuRes.data.FileCreated) {
          API.createGrammar(
            menuName,
            'dtmf',
            projectPath,
            needsRepeat,
            dtmfOptions
          )
            .then(grammarRes => {
              if (grammarRes.data) {
                props.enqueueSnackbar(
                  'Menu & grammar were successfully created!',
                  {
                    variant: 'success',
                    autoHideDuration: 2000
                  }
                );
              } else {
                props.enqueueSnackbar(
                  'There was a problem creating the grammar.',
                  {
                    variant: 'warning',
                    autoHideDuration: 2000
                  }
                );
              }
            })
            .catch(err => {
              props.enqueueSnackbar(
                'An error occurred when creating the grammar.',
                {
                  variant: 'error',
                  autoHideDuration: 2000
                }
              );
              console.log(err);
            });
          setCanRedirect(true);
        } else if (menuRes.data.FileExists && !menuRes.data.ShouldOverwrite) {
          setShowDialog(true);
        } else {
          props.enqueueSnackbar('There was a problem creating the menu.', {
            variant: 'warning',
            autoHideDuration: 2000
          });
          setCanRedirect(true);
        }
      })
      .catch(err => {
        props.enqueueSnackbar('An error occurred when creating the menu.', {
          variant: 'error',
          autoHideDuration: 2000
        });
        console.log(err);
        setCanRedirect(true);
      });
  }

  function yesOnClick() {
    setShouldOverwrite(true);
    setShowDialog(false);
    props.enqueueSnackbar(
      'To continue with overwriting the menu click Finish again.',
      {
        variant: 'info',
        autoHideDuration: 3000
      }
    );
  }

  function noOnClick() {
    setShouldOverwrite(false);
    setShowDialog(false);
  }

  return (
    <div>
      <FileExistsDialog
        fileName={menuName}
        open={showDialog}
        yesOnClick={yesOnClick}
        noOnClick={noOnClick}
      />
      <StepForm steps={steps} onSubmit={createMenu} canRedirect={canRedirect} />
    </div>
  );
};

export default withSnackbar(CreateMenuPage);
