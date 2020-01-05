import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ProjectList from '../components/ProjectList';
import { Redirect } from 'react-router';

const EditProjectsPage = () => {
  const [canRedirect, setCanRedirect] = useState(false);

  if (canRedirect) {
    return <Redirect to="/addProject" />;
  }

  return (
    <div className="centerText">
      <Button
        style={{
          backgroundColor: '#4caf50',
          marginTop: '20px',
          marginBottom: '25px'
        }}
        onClick={() => setCanRedirect(true)}
      >
        Add Project
      </Button>
      <ProjectList />
    </div>
  );
};

export default EditProjectsPage;
