import React from 'react';
import renderer from 'react-test-renderer';
import AddProjectPage from '../../pages/AddProjectPage';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Wrapper from '../../components/Wrapper';

it('renders without crashing', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Wrapper>
        <AddProjectPage />
      </Wrapper>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
