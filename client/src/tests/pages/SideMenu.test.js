import React from 'react';
import renderer from 'react-test-renderer';
import SideMenu from '../../pages/SideMenu';
import store from '../../redux/store';
import { Provider } from 'react-redux';

it('renders without crashing', () => {
  const component = renderer.create(
    <Provider store={store}>
      <SideMenu />
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
