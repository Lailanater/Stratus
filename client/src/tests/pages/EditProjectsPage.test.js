import React from 'react';
import renderer from 'react-test-renderer';
import EditProjectsPage from '../../pages/EditProjectsPage';
import store from '../../redux/store';
import { Provider } from 'react-redux';

it('renders without crashing', () => {
  const component = renderer.create(
    <Provider store={store}>
      <EditProjectsPage />
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
