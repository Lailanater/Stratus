import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import ProjectListItem from './ProjectListItem';

const ProjectList = () => {
  const projects = useSelector(state => state.projects);
  let contents = [];

  if (projects.length < 1) {
    contents = (
      <Typography variant="h4">
        You have no projects yet. Try adding one!
      </Typography>
    );
  } else {
    projects.map(project => {
      return contents.push(
        <ProjectListItem key={project.name} project={project} />
      );
    });
  }

  return <div id="fileExistsDialogButtonContainer">{contents}</div>;
};

export default ProjectList;
