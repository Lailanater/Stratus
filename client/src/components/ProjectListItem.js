import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { TableCell } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeProject } from '../redux/actions/actionCreators';
import { useDispatch } from 'react-redux';

const ProjectListItem = props => {
  const [deleteColor, setDeleteColor] = useState('inherit');
  const dispatch = useDispatch();

  function deleteProject() {
    const projectToRemove = {
      name: props.project.name,
      path: props.project.path
    };

    dispatch(removeProject(projectToRemove));
  }

  return (
    <div>
      <Paper className="listItem" elevation={5}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell align="right">Project Path</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">{props.project.name}</TableCell>
              <TableCell align="right">{props.project.path}</TableCell>
              <TableCell align="right">
                <DeleteIcon
                  color={deleteColor}
                  onMouseOver={() => setDeleteColor('error')}
                  onMouseLeave={() => setDeleteColor('inherit')}
                  onClick={deleteProject}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default ProjectListItem;
