import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ProjectList from '../components/ProjectList';
import { Redirect } from 'react-router';
import '../css/pages/EditProjectsPage.css';

const EditProjectsPage = () => {
  const [canRedirect, setCanRedirect] = useState(false);

  if (canRedirect) {
    return <Redirect to="/addProject" />;
  }

  return (
    <div className="centerText">
      <Button
        id="editProjectsPageButton"
        style={{ backgroundColor: '#4caf50' }}
        onClick={() => setCanRedirect(true)}
      >
        Add Project
      </Button>
      <ProjectList />
    </div>
  );
};

export default EditProjectsPage;
