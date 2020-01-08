import React from 'react';
import renderer from 'react-test-renderer';
import App from '../pages/App';

it('renders without crashing', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
