import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from '../../pages/HomePage';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Wrappers from '../../components/Wrappers';

it('renders without crashing', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Wrappers>
        <HomePage />
      </Wrappers>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
