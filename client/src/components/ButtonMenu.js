import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Redirect } from 'react-router-dom';

const ButtonMenu = props => {
  const [nextPage, setNextPage] = useState('');
  const [canRedirect, setCanRedirect] = useState(false);
  const currentProject = useSelector(state => state.currentProject);
  const { enqueueSnackbar } = useSnackbar();

  function createMenu() {
    if (currentProject === '') {
      setCanRedirect(false);
      enqueueSnackbar('You must select a project first', {
        variant: 'error',
        autoHideDuration: 2000
      });
    } else {
      setCanRedirect(true);
    }

    setNextPage('/createMenu');
  }

  function createGrammar() {
    if (currentProject === '') {
      setCanRedirect(false);
      enqueueSnackbar('You must select a project first', {
        variant: 'error',
        autoHideDuration: 2000
      });
    } else {
      setCanRedirect(true);
    }

    setNextPage('/createGrammar');
  }

  if (canRedirect) {
    return <Redirect to={nextPage} />;
  }

  return (
    <div>
      <Button
        variant="contained"
        style={{ color: 'white', backgroundColor: '#192a56' }}
        size="large"
        onClick={createMenu}
      >
        Create Menu
      </Button>
      <Button
        variant="contained"
        style={{
          color: 'white',
          backgroundColor: '#40739e',
          marginLeft: '5px'
        }}
        size="large"
        onClick={createGrammar}
      >
        Create Grammar
      </Button>
    </div>
  );
};

export default ButtonMenu;
