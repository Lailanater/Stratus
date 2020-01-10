import React from 'react';
import renderer from 'react-test-renderer';
import AddProjectPage from '../../pages/AddProjectPage';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Wrappers from '../../components/Wrappers';

it('renders without crashing', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Wrappers>
        <AddProjectPage />
      </Wrappers>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
