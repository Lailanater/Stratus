import React, { useEffect } from 'react';
import ButtonMenu from '../components/ButtonMenu';
import CurrentProjectDropdown from '../components/CurrentProjectDropdown';
import isElectron from 'is-electron';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../redux/actions/actionCreators';

const HomePage = props => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects);

  useEffect(() => {
    if (!isElectron()) {
      const projectNames = new Set(projects.map(p => p.name));

      axios
        .get('http://localhost:8080/api/projects')
        .then(res => {
          res.data.projects.forEach(project => {
            if (!projectNames.has(project.name)) {
              dispatch(addProject(project.name, project.path));
            }
          });
        })
        .catch(_ => {});
    }
  }, [dispatch, projects]);

  return (
    <div className="container">
      <CurrentProjectDropdown />
      <br />
      <ButtonMenu />
    </div>
  );
};

export default HomePage;
