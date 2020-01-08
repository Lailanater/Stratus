import React from 'react';
import renderer from 'react-test-renderer';
import CreateMenuPage from '../../pages/CreateMenuPage';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import Wrapper from '../../components/Wrapper';

it('renders without crashing', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Wrapper>
        <CreateMenuPage />
      </Wrapper>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
