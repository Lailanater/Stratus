import React from 'react';
import renderer from 'react-test-renderer';
import SettingsPage from '../../pages/SettingsPage';
import { Provider } from 'react-redux';
import store from '../../redux/store';

it('renders without crashing', () => {
  const component = renderer.create(
    <Provider store={store}>
      <SettingsPage />
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
