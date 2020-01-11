import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from '../../pages/HomePage';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Wrapper from '../../components/Wrapper';

it('renders without crashing', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Wrapper>
        <HomePage />
      </Wrapper>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
