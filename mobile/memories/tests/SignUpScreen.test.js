import React from 'react';
import renderer from 'react-test-renderer';
import { CurrentUserContextProvider } from '../common/context/contexts';
import SignUpScreen from '../common/screens/SignUpScreen';


describe('<SignUpScreen/>', () => {
  test('has 1 child', () => {
    const tree = renderer.create(<CurrentUserContextProvider><SignUpScreen/></CurrentUserContextProvider>).toJSON();
    expect(tree.children.length).toBe(1);
  });

  test('renders correctly', () => {
    const tree = renderer.create(<CurrentUserContextProvider><SignUpScreen/></CurrentUserContextProvider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});