import {
  ADD_PROJECT,
  REMOVE_PROJECT,
  SET_CURRENT_PROJECT,
  SET_DEFAULT_ROUTE_TO,
  SET_DTMF_OPTIONS,
  SET_IS_FINISH_BUTTON_DISABLED,
  SET_IS_NEXT_BUTTON_DISABLED,
  SET_MENU_NAME,
  SET_NEEDS_DTMF,
  SET_NEEDS_REPEAT,
  SET_NEEDS_VOICE,
  TOGGLE_APP_MENU,
  TOGGLE_THEME
} from '../constants/actionTypes';

export function toggleAppMenu() {
  return {
    type: TOGGLE_APP_MENU
  };
}

export function toggleTheme() {
  return {
    type: TOGGLE_THEME
  };
}

export function setCurrentProject(nextProject) {
  return {
    type: SET_CURRENT_PROJECT,
    nextProject
  };
}

export function addProject(projectName, projectPath) {
  return {
    type: ADD_PROJECT,
    newProject: {
      name: projectName,
      path: projectPath
    }
  };
}

export function setMenuName(menuName) {
  return {
    type: SET_MENU_NAME,
    menuName
  };
}

export function setNeedsRepeat(needsRepeat) {
  return {
    type: SET_NEEDS_REPEAT,
    needsRepeat
  };
}

export function setDtmfOptions(dtmfOptions) {
  return {
    type: SET_DTMF_OPTIONS,
    dtmfOptions
  };
}

export function setDefaultRouteTo(defaultRouteTo) {
  return {
    type: SET_DEFAULT_ROUTE_TO,
    defaultRouteTo
  };
}

export function removeProject(projectToRemove) {
  return {
    type: REMOVE_PROJECT,
    projectToRemove
  };
}

export function setIsNextButtonDisabled(isNextButtonDisabled) {
  return {
    type: SET_IS_NEXT_BUTTON_DISABLED,
    isNextButtonDisabled
  };
}

export function setIsFinishButtonDisabled(isFinishButtonDisabled) {
  return {
    type: SET_IS_FINISH_BUTTON_DISABLED,
    isFinishButtonDisabled
  };
}

export function setNeedsDtmf(needsDtmf) {
  return {
    type: SET_NEEDS_DTMF,
    needsDtmf
  };
}

export function setNeedsVoice(needsVoice) {
  return {
    type: SET_NEEDS_VOICE,
    needsVoice
  };
}
