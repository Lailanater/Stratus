import React from 'react';
import renderer from 'react-test-renderer';
import CreateMenuPage from '../../pages/CreateMenuPage';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import Wrappers from '../../components/Wrappers';

it('renders without crashing', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Wrappers>
        <CreateMenuPage />
      </Wrappers>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
