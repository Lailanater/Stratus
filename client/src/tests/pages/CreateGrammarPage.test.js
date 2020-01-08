import React from 'react';
import renderer from 'react-test-renderer';
import CreateGrammarPage from '../../pages/CreateGrammarPage';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import Wrapper from '../../components/Wrapper';

it('renders without crashing', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Wrapper>
        <CreateGrammarPage />
      </Wrapper>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
